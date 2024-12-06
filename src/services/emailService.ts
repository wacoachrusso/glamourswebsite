import emailjs from '@emailjs/browser';
import { emailConfig, isEmailConfigValid } from '../config/env';
import { AppointmentData } from '../types/appointment';

interface EmailTemplateParams {
  to_name: string;
  to_email: string;
  service_name: string;
  stylist_name: string;
  appointment_date: string;
  appointment_time: string;
  phone_number: string;
  notes: string;
  salon_phone: string;
  salon_address: string;
  carrier?: string;
}

const validateEmailParams = (params: EmailTemplateParams): void => {
  if (!params.to_email?.trim()) {
    throw new Error('Recipient email address is required');
  }
  if (!params.to_name?.trim()) {
    throw new Error('Recipient name is required');
  }
  if (!params.appointment_date || !params.appointment_time) {
    throw new Error('Appointment date and time are required');
  }
};

const prepareEmailTemplate = (params: EmailTemplateParams) => ({
  user_name: params.to_name.trim(),
  user_email: params.to_email.trim(),
  service: params.service_name,
  stylist: params.stylist_name || 'Next Available Stylist',
  date: params.appointment_date,
  time: params.appointment_time,
  phone: params.phone_number,
  special_notes: params.notes || 'No special notes',
  salon_phone: params.salon_phone,
  salon_address: params.salon_address,
  reply_to: 'info@glamoursbeauty.com'
});

const createAppointmentData = (params: EmailTemplateParams): AppointmentData => ({
  id: Date.now(),
  clientName: params.to_name,
  clientEmail: params.to_email,
  clientPhone: params.phone_number,
  service: {
    name: params.service_name
  },
  selectedProfessional: params.stylist_name,
  appointmentDate: params.appointment_date,
  appointmentTime: params.appointment_time,
  notes: params.notes,
  status: 'PENDING',
  createdAt: new Date().toISOString()
});

export const sendConfirmationAndStylistEmails = async (templateParams: EmailTemplateParams) => {
  if (!isEmailConfigValid()) {
    console.error('EmailJS configuration is incomplete');
    throw new Error('Email service configuration is missing');
  }

  try {
    validateEmailParams(templateParams);
    emailjs.init(emailConfig.publicKey);
    
    const emailData = prepareEmailTemplate(templateParams);
    const response = await emailjs.send(
      emailConfig.serviceId,
      emailConfig.templateId,
      emailData
    );

    if (response.status !== 200) {
      throw new Error(`Failed to send confirmation email: ${response.text}`);
    }

    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const newAppointment = createAppointmentData(templateParams);
    appointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    return { success: true };
  } catch (error: any) {
    console.error('Error sending emails:', error);
    throw error;
  }
};