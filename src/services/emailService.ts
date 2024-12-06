import emailjs from '@emailjs/browser';
import { emailConfig, isEmailConfigValid } from '../config/env';

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

const prepareEmailTemplate = (params: EmailTemplateParams) => {
  return {
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
  };
};

export const sendConfirmationAndStylistEmails = async (templateParams: EmailTemplateParams) => {
  if (!isEmailConfigValid()) {
    console.error('EmailJS configuration is incomplete');
    throw new Error('Email service configuration is missing');
  }

  try {
    // Validate required parameters
    validateEmailParams(templateParams);

    // Initialize EmailJS with public key
    emailjs.init(emailConfig.publicKey);

    // Prepare email template with validated data
    const emailData = prepareEmailTemplate(templateParams);

    // Send client confirmation email
    const response = await emailjs.send(
      emailConfig.serviceId,
      emailConfig.templateId,
      emailData
    );

    if (response.status !== 200) {
      throw new Error(`Failed to send confirmation email: ${response.text}`);
    }

    // Store appointment in localStorage with original data
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    appointments.push({
      id: Date.now(),
      clientName: templateParams.to_name,
      clientEmail: templateParams.to_email,
      clientPhone: templateParams.phone_number,
      service: {
        name: templateParams.service_name
      },
      selectedProfessional: templateParams.stylist_name,
      appointmentDate: templateParams.appointment_date,
      appointmentTime: templateParams.appointment_time,
      notes: templateParams.notes,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('appointments', JSON.stringify(appointments));

    return { success: true };
  } catch (error: any) {
    console.error('Error sending emails:', error);
    throw error;
  }
};