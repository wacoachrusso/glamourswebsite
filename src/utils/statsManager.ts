import { AppointmentData } from '../types/appointment';

export interface StylistStats {
  revenue: number;
  appointments: number;
  clients: Set<string>;
  rating: number;
  completedAppointments: number;
  canceledAppointments: number;
  pendingAppointments: number;
  averageServiceTime: number;
}

export interface DashboardStats {
  totalRevenue: number;
  totalAppointments: number;
  totalClients: number;
  averageServiceTime: number;
  clientRetentionRate: number;
  dailyStats: {
    [key: string]: {
      revenue: number;
      appointments: number;
    }
  };
  stylistStats: {
    [key: string]: StylistStats;
  }
}

const INITIAL_STATS: DashboardStats = {
  totalRevenue: 0,
  totalAppointments: 0,
  totalClients: 0,
  averageServiceTime: 0,
  clientRetentionRate: 0,
  dailyStats: {},
  stylistStats: {}
};

export const getStats = (): DashboardStats => {
  const stats = localStorage.getItem('dashboardStats');
  if (!stats) return INITIAL_STATS;
  
  const parsedStats = JSON.parse(stats);
  
  // Convert client arrays back to Sets for each stylist
  if (parsedStats.stylistStats) {
    Object.keys(parsedStats.stylistStats).forEach(stylist => {
      if (parsedStats.stylistStats[stylist].clients) {
        parsedStats.stylistStats[stylist].clients = new Set(
          parsedStats.stylistStats[stylist].clients
        );
      }
    });
  }
  
  return parsedStats;
};

export const resetStats = (): void => {
  localStorage.setItem('dashboardStats', JSON.stringify(INITIAL_STATS));
};

export const updateAppointmentStatus = (
  appointmentId: number,
  newStatus: string
): void => {
  const stats = getStats();
  const appointments: AppointmentData[] = JSON.parse(localStorage.getItem('appointments') || '[]');
  const appointment = appointments.find(a => a.id === appointmentId);

  if (!appointment || !appointment.selectedProfessional) return;

  const stylist = appointment.selectedProfessional;
  const price = parseFloat(appointment.service.price || '0');

  if (!stats.stylistStats[stylist]) {
    stats.stylistStats[stylist] = {
      revenue: 0,
      appointments: 0,
      clients: new Set<string>(),
      rating: 4.8,
      completedAppointments: 0,
      canceledAppointments: 0,
      pendingAppointments: 0,
      averageServiceTime: 0
    };
  }

  // Update status-specific counters
  if (newStatus === 'COMPLETED') {
    stats.stylistStats[stylist].completedAppointments++;
    stats.stylistStats[stylist].revenue += price;
  } else if (newStatus === 'CANCELLED') {
    stats.stylistStats[stylist].canceledAppointments++;
  } else if (newStatus === 'PENDING') {
    stats.stylistStats[stylist].pendingAppointments++;
  }

  // Save updated stats
  localStorage.setItem('dashboardStats', JSON.stringify({
    ...stats,
    stylistStats: Object.fromEntries(
      Object.entries(stats.stylistStats).map(([stylist, data]) => [
        stylist,
        {
          ...data,
          clients: Array.from(data.clients)
        }
      ])
    )
  }));
};

export const updateStatsFromBookings = (): DashboardStats => {
  const appointments: AppointmentData[] = JSON.parse(localStorage.getItem('appointments') || '[]');
  const stats: DashboardStats = { ...INITIAL_STATS };
  const uniqueClients = new Set<string>();
  const today = new Date().toISOString().split('T')[0];

  appointments.forEach((appointment) => {
    const price = parseFloat(appointment.service.price || '0');
    const duration = parseInt(appointment.service.duration || '0');

    stats.totalRevenue += price;
    stats.totalAppointments++;
    uniqueClients.add(appointment.clientEmail);
    stats.averageServiceTime += duration;

    // Update daily stats
    const appointmentDate = appointment.appointmentDate;
    if (!stats.dailyStats[appointmentDate]) {
      stats.dailyStats[appointmentDate] = {
        revenue: 0,
        appointments: 0
      };
    }
    stats.dailyStats[appointmentDate].revenue += price;
    stats.dailyStats[appointmentDate].appointments++;

    if (appointment.selectedProfessional) {
      const stylist = appointment.selectedProfessional;
      if (!stats.stylistStats[stylist]) {
        stats.stylistStats[stylist] = {
          revenue: 0,
          appointments: 0,
          clients: new Set<string>(),
          rating: 4.8,
          completedAppointments: 0,
          canceledAppointments: 0,
          pendingAppointments: 0,
          averageServiceTime: 0
        };
      }

      stats.stylistStats[stylist].revenue += price;
      stats.stylistStats[stylist].appointments++;
      stats.stylistStats[stylist].clients.add(appointment.clientEmail);
      stats.stylistStats[stylist].averageServiceTime += duration;

      // Update status-specific counters
      switch (appointment.status) {
        case 'COMPLETED':
          stats.stylistStats[stylist].completedAppointments++;
          break;
        case 'CANCELLED':
          stats.stylistStats[stylist].canceledAppointments++;
          break;
        case 'PENDING':
          stats.stylistStats[stylist].pendingAppointments++;
          break;
      }
    }
  });

  // Calculate averages and rates
  stats.totalClients = uniqueClients.size;
  stats.averageServiceTime = stats.totalAppointments > 0 
    ? stats.averageServiceTime / stats.totalAppointments 
    : 0;
  stats.clientRetentionRate = stats.totalClients > 0 
    ? (stats.totalAppointments / stats.totalClients) * 100 
    : 0;

  // Calculate averages for each stylist
  Object.keys(stats.stylistStats).forEach(stylist => {
    const stylistStats = stats.stylistStats[stylist];
    stylistStats.averageServiceTime = stylistStats.appointments > 0
      ? stylistStats.averageServiceTime / stylistStats.appointments
      : 0;
  });

  // Save to localStorage
  localStorage.setItem('dashboardStats', JSON.stringify({
    ...stats,
    stylistStats: Object.fromEntries(
      Object.entries(stats.stylistStats).map(([stylist, data]) => [
        stylist,
        {
          ...data,
          clients: Array.from(data.clients)
        }
      ])
    )
  }));

  return stats;
};