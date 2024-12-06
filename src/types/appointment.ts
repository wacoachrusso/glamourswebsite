export interface AppointmentData {
  id: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  service: {
    name: string;
    price?: string;
    duration?: string;
  };
  selectedProfessional: string;
  appointmentDate: string;
  appointmentTime: string;
  notes: string;
  status: string;
  createdAt: string;
}

export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface AppointmentFormData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  carrier: string;
  selectedService: string;
  selectedProfessional: string;
  appointmentDate: string;
  appointmentTime: string;
  notes: string;
}