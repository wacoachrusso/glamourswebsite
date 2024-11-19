import axios from 'axios';

// Klaviyo API integration
const KLAVIYO_API_KEY = import.meta.env.VITE_KLAVIYO_API_KEY;
const KLAVIYO_LIST_ID = import.meta.env.VITE_KLAVIYO_LIST_ID;

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

// Add Subscriber to Klaviyo
export const addSubscriberToKlaviyo = async (email: string) => {
  try {
    const klaviyoApiUrl = `https://a.klaviyo.com/api/v2/list/${KLAVIYO_LIST_ID}/members`;

    await axios.post(klaviyoApiUrl, {
      api_key: KLAVIYO_API_KEY,
      profiles: [{ email }],
    });

    console.log('Subscriber added successfully to Klaviyo.');
  } catch (error: any) {
    console.error('Klaviyo API Error:', error.message);
  }
};

// Booking Function Integration
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

    // Add client email to Klaviyo list
    if (appointmentData.clientEmail) {
      await addSubscriberToKlaviyo(appointmentData.clientEmail);
    }

    return newAppointment;
  } catch (error: any) {
    throw error.response?.data || { error: 'Failed to book appointment' };
  }
};

// Other existing functions such as:
// getProfessionals, getAppointments, getServices, updateAppointmentStatus
