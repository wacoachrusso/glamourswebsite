import { format } from 'date-fns';

export interface DashboardStats {
  totalRevenue: number;
  totalAppointments: number;
  totalClients: number;
  averageServiceTime: number;
  clientRetentionRate: number;
  stylistStats: {
    [key: string]: {
      revenue: number;
      appointments: number;
      clients: Set<string>;
      rating: number;
    }
  }
}

const INITIAL_STATS: DashboardStats = {
  totalRevenue: 0,
  totalAppointments: 0,
  totalClients: 0,
  averageServiceTime: 0,
  clientRetentionRate: 0,
  stylistStats: {}
};

export const getStats = (): DashboardStats => {
  const stats = localStorage.getItem('dashboardStats');
  return stats ? JSON.parse(stats, (key, value) => {
    if (key === 'clients') {
      return new Set(value);
    }
    return value;
  }) : INITIAL_STATS;
};

export const resetStats = () => {
  localStorage.setItem('dashboardStats', JSON.stringify(INITIAL_STATS));
};

export const updateStatsFromBookings = () => {
  const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
  const stats: DashboardStats = { ...INITIAL_STATS };
  const uniqueClients = new Set<string>();

  appointments.forEach((appointment: any) => {
    // Update global stats
    stats.totalRevenue += parseFloat(appointment.service.price || '0');
    stats.totalAppointments++;
    uniqueClients.add(appointment.clientEmail);
    stats.averageServiceTime += parseInt(appointment.service.duration || '0');

    // Update stylist stats
    if (appointment.selectedProfessional) {
      const stylist = appointment.selectedProfessional;
      if (!stats.stylistStats[stylist]) {
        stats.stylistStats[stylist] = {
          revenue: 0,
          appointments: 0,
          clients: new Set<string>(),
          rating: 4.8 // Default rating
        };
      }

      stats.stylistStats[stylist].revenue += parseFloat(appointment.service.price || '0');
      stats.stylistStats[stylist].appointments++;
      stats.stylistStats[stylist].clients.add(appointment.clientEmail);
    }
  });

  // Calculate averages
  stats.totalClients = uniqueClients.size;
  stats.averageServiceTime = stats.totalAppointments > 0 
    ? stats.averageServiceTime / stats.totalAppointments 
    : 0;
  stats.clientRetentionRate = stats.totalClients > 0 
    ? (stats.totalAppointments / stats.totalClients) * 100 
    : 0;

  // Convert Sets to arrays for storage
  const statsForStorage = {
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
  };

  localStorage.setItem('dashboardStats', JSON.stringify(statsForStorage));
  return stats;
};