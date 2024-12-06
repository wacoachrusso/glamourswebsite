import { AppointmentData } from '../types/appointment';

export interface StylistStats {
  revenue: number;
  appointments: number;
  clients: Set<string>;
  rating: number;
}

export interface DashboardStats {
  totalRevenue: number;
  totalAppointments: number;
  totalClients: number;
  averageServiceTime: number;
  clientRetentionRate: number;
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
  stylistStats: {}
};

const convertToSet = (data: any): Set<string> => {
  if (Array.isArray(data)) {
    return new Set(data);
  }
  return new Set();
};

export const getStats = (): DashboardStats => {
  const stats = localStorage.getItem('dashboardStats');
  if (!stats) return INITIAL_STATS;
  
  const parsedStats = JSON.parse(stats);
  
  if (parsedStats.stylistStats) {
    Object.keys(parsedStats.stylistStats).forEach(stylist => {
      if (parsedStats.stylistStats[stylist].clients) {
        parsedStats.stylistStats[stylist].clients = convertToSet(
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

const calculateStats = (appointments: AppointmentData[]): DashboardStats => {
  const stats: DashboardStats = { ...INITIAL_STATS };
  const uniqueClients = new Set<string>();

  appointments.forEach((appointment) => {
    const price = parseFloat(appointment.service.price || '0');
    const duration = parseInt(appointment.service.duration || '0');

    stats.totalRevenue += price;
    stats.totalAppointments++;
    uniqueClients.add(appointment.clientEmail);
    stats.averageServiceTime += duration;

    if (appointment.selectedProfessional) {
      const stylist = appointment.selectedProfessional;
      if (!stats.stylistStats[stylist]) {
        stats.stylistStats[stylist] = {
          revenue: 0,
          appointments: 0,
          clients: new Set<string>(),
          rating: 4.8
        };
      }

      stats.stylistStats[stylist].revenue += price;
      stats.stylistStats[stylist].appointments++;
      stats.stylistStats[stylist].clients.add(appointment.clientEmail);
    }
  });

  stats.totalClients = uniqueClients.size;
  stats.averageServiceTime = stats.totalAppointments > 0 
    ? stats.averageServiceTime / stats.totalAppointments 
    : 0;
  stats.clientRetentionRate = stats.totalClients > 0 
    ? (stats.totalAppointments / stats.totalClients) * 100 
    : 0;

  return stats;
};

export const updateStatsFromBookings = (): DashboardStats => {
  const appointments: AppointmentData[] = JSON.parse(localStorage.getItem('appointments') || '[]');
  const stats = calculateStats(appointments);

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