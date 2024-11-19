import emailjs from '@emailjs/browser';
import { emailConfig } from '../config/env';

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
}

export const sendConfirmationEmail = async (templateParams: EmailTemplateParams) => {
  try {
    // Validate required email parameters
    if (!templateParams.to_email?.trim()) {
      throw new Error('Recipient email address is required');
    }

    if (!templateParams.to_name?.trim()) {
      throw new Error('Recipient name is required');
    }

    // Initialize EmailJS
    emailjs.init(emailConfig.publicKey);

    // Format the template parameters to match exactly with the template variables
    const formattedParams = {
      from_name: templateParams.to_name.trim(),
      user_name: templateParams.to_name.trim(),
      user_email: templateParams.to_email.trim(),
      service_name: templateParams.service_name,
      appointment_date: templateParams.appointment_date,
      appointment_time: templateParams.appointment_time,
      salon_address: templateParams.salon_address,
      salon_phone: templateParams.salon_phone,
      notes: templateParams.notes || 'No special notes',
      phone: templateParams.phone_number || 'Not provided'
    };

    // Send the email
    const response = await emailjs.send(
      emailConfig.serviceId,
      emailConfig.templateId,
      formattedParams
    );

    if (response.status !== 200) {
      throw new Error(`EmailJS failed with status: ${response.status}`);
    }

    return response;
  } catch (error: any) {
    console.error('Error sending confirmation email:', error);
    throw new Error(error.message || 'Failed to send confirmation email. Please try again.');
  }
};