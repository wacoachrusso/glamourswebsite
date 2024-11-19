import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Get Professionals
 * This function returns a list of professionals available at the salon.
 */
export const getProfessionals = async () => {
  try {
    // For demo purposes, return static professionals
    return [
      {
        id: 1,
        name: "Sarah Johnson",
        role: "Master Stylist",
        specialties: ["Color Specialist", "Precision Cuts", "Wedding Styles"],
        experience: 12,
      },
      {
        id: 2,
        name: "Michael Chen",
        role: "Senior Stylist",
        specialties: ["Asian Hair Specialist", "Creative Color", "Men's Styling"],
        experience: 8,
      },
      {
        id: 3,
        name: "Isabella Rodriguez",
        role: "Texture Specialist",
        specialties: ["Curly Hair", "Natural Hair", "Extensions"],
        experience: 10,
      },
    ];
  } catch (error: any) {
    throw error.response?.data || { error: 'Failed to load professionals' };
  }
};

/**
 * Book Appointment
 * This function books an appointment.
 */
export const bookAppointment = async (appointmentData: any) => {
  try {
    // For demo purposes, simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Store appointment in localStorage for demo
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const newAppointment = {
      id: Date.now(),
      ...appointmentData,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    appointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    // Simulate sending confirmation email
    console.log('Confirmation email sent to:', appointmentData.clientEmail);

    return newAppointment;
  } catch (error: any) {
    throw error.response?.data || { error: 'Failed to book appointment' };
  }
};

/**
 * Get Appointments
 * This function returns a list of appointments.
 */
export const getAppointments = async () => {
  try {
    // For demo purposes, get appointments from localStorage
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    return appointments;
  } catch (error: any) {
    throw error.response?.data || { error: 'Failed to load appointments' };
  }
};

/**
 * Get Services
 * This function returns a list of salon services.
 */
export const getServices = async () => {
  try {
    // For demo purposes, return static services
    return [
      {
        id: 1,
        name: "Women's Haircut & Style",
        description: "Professional haircut and styling service",
        price: 85.0,
        duration: 60,
      },
      {
        id: 2,
        name: "Men's Haircut & Style",
        description: "Professional men's haircut and styling",
        price: 45.0,
        duration: 45,
      },
      {
        id: 3,
        name: "Color & Highlights",
        description: "Full color or highlight service",
        price: 175.0,
        duration: 120,
      },
      {
        id: 4,
        name: "Balayage",
        description: "Hand-painted highlights for a natural look",
        price: 200.0,
        duration: 180,
      },
      {
        id: 5,
        name: "Brazilian Blowout",
        description: "Professional smoothing treatment",
        price: 300.0,
        duration: 180,
      },
    ];
  } catch (error: any) {
    throw error.response?.data || { error: 'Failed to load services' };
  }
};

/**
 * Update Appointment Status
 * This function updates the status of an appointment.
 */
export const updateAppointmentStatus = async (id: number, status: string) => {
  try {
    // For demo purposes, update appointment in localStorage
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const updatedAppointments = appointments.map((apt: any) =>
      apt.id === id ? { ...apt, status } : apt
    );
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    return { id, status };
  } catch (error: any) {
    throw error.response?.data || { error: 'Failed to update appointment status' };
  }
};

// Default export the `api` instance to use axios in other parts of your project
export default api;
