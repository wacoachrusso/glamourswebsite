import emailjs from '@emailjs/browser';
import { emailConfig } from '../config/env';
import { getSMSAddress } from './smsGateway';

interface EmailTemplateParams {
  to_name: string;
  to_email: string;
  service_name: string;
  stylist_name: string;
  stylist_email?: string;
  appointment_date: string;
  appointment_time: string;
  phone_number: string;
  notes: string;
  salon_phone: string;
  salon_address: string;
  carrier?: string;
}

const createSMSMessage = (params: EmailTemplateParams): string => {
  const stylistInfo = params.stylist_name ? `\nStylist: ${params.stylist_name}` : '';
  return `Glamour's Salon Appt Confirmed:
${params.appointment_date} @ ${params.appointment_time}
Service: ${params.service_name}${stylistInfo}
Questions? Call ${params.salon_phone}`;
};

const isDevelopment = import.meta.env.DEV;

export const sendConfirmationAndStylistEmails = async (templateParams: EmailTemplateParams) => {
  // In development mode, simulate success without making actual API calls
  if (isDevelopment) {
    console.log('Development mode: Simulating email send success');
    console.log('Email parameters:', templateParams);
    return { success: true };
  }

  // Validate EmailJS configuration
  if (!emailConfig.publicKey || emailConfig.publicKey === 'demo_key' ||
      !emailConfig.serviceId || emailConfig.serviceId === 'demo_service' ||
      !emailConfig.clientConfirmationTemplateId || emailConfig.clientConfirmationTemplateId === 'demo_template') {
    console.warn('EmailJS configuration is incomplete. Emails will not be sent.');
    return { success: true };
  }

  try {
    // Initialize EmailJS
    emailjs.init(emailConfig.publicKey);

    // Send client confirmation email
    if (templateParams.to_email) {
      const clientResponse = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.clientConfirmationTemplateId,
        {
          to_name: templateParams.to_name,
          to_email: templateParams.to_email,
          service_name: templateParams.service_name,
          stylist_name: templateParams.stylist_name,
          appointment_date: templateParams.appointment_date,
          appointment_time: templateParams.appointment_time,
          salon_phone: templateParams.salon_phone,
          salon_address: templateParams.salon_address,
          notes: templateParams.notes
        }
      );

      if (clientResponse.status !== 200) {
        throw new Error(`Failed to send client confirmation email: ${clientResponse.text}`);
      }
    }

    // Send stylist notification if applicable
    if (templateParams.stylist_email && templateParams.stylist_name !== 'Next Available Stylist') {
      try {
        const stylistResponse = await emailjs.send(
          emailConfig.serviceId,
          emailConfig.stylistNotificationTemplateId,
          {
            to_email: templateParams.stylist_email,
            stylist_name: templateParams.stylist_name,
            client_name: templateParams.to_name,
            client_email: templateParams.to_email,
            client_phone: templateParams.phone_number,
            service_name: templateParams.service_name,
            appointment_date: templateParams.appointment_date,
            appointment_time: templateParams.appointment_time,
            notes: templateParams.notes || 'No special notes',
            salon_phone: templateParams.salon_phone,
            salon_address: templateParams.salon_address
          }
        );

        if (stylistResponse.status !== 200) {
          console.warn('Failed to send stylist notification:', stylistResponse.text);
        }
      } catch (error) {
        console.warn('Failed to send stylist notification:', error);
      }
    }

    // Send SMS confirmation if applicable
    if (templateParams.phone_number && templateParams.carrier) {
      const smsAddress = getSMSAddress(templateParams.phone_number, templateParams.carrier);
      if (smsAddress) {
        try {
          const smsResponse = await emailjs.send(
            emailConfig.serviceId,
            emailConfig.clientConfirmationTemplateId,
            {
              to_email: smsAddress,
              message: createSMSMessage(templateParams)
            }
          );

          if (smsResponse.status !== 200) {
            console.warn('Failed to send SMS notification:', smsResponse.text);
          }
        } catch (error) {
          console.warn('Failed to send SMS notification:', error);
        }
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Error in email service:', error);
    if (isDevelopment) {
      return { success: true }; // In development, still return success
    }
    throw error;
  }
};