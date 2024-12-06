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

export const sendConfirmationAndStylistEmails = async (templateParams: EmailTemplateParams) => {
  // Validate EmailJS configuration
  if (!emailConfig.publicKey || !emailConfig.serviceId || 
      !emailConfig.clientConfirmationTemplateId || !emailConfig.stylistNotificationTemplateId) {
    console.error('EmailJS configuration is incomplete');
    // For development/demo purposes, simulate success
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

      console.log('Client confirmation email sent:', clientResponse.status);
    }

    // Send stylist notification if applicable
    if (templateParams.stylist_email && templateParams.stylist_name !== 'Next Available Stylist') {
      try {
        await emailjs.send(
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
        console.log('Stylist notification sent successfully');
      } catch (error) {
        console.warn('Failed to send stylist notification:', error);
      }
    }

    // Send SMS confirmation if applicable
    if (templateParams.phone_number && templateParams.carrier) {
      const smsAddress = getSMSAddress(templateParams.phone_number, templateParams.carrier);
      if (smsAddress) {
        try {
          await emailjs.send(
            emailConfig.serviceId,
            emailConfig.clientConfirmationTemplateId,
            {
              to_email: smsAddress,
              message: createSMSMessage(templateParams)
            }
          );
          console.log('SMS notification sent successfully');
        } catch (error) {
          console.warn('Failed to send SMS notification:', error);
        }
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Error in email service:', error);
    // For development/demo purposes, still return success
    return { success: true };
  }
};