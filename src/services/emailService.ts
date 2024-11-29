import emailjs from '@emailjs/browser';
import { emailConfig } from '../config/env';
import { getSMSAddress } from './smsGateway';

interface EmailTemplateParams {
  to_name: string;
  to_email: string;
  service_name: string;
  stylist_name: string;
  stylist_email: string;
  appointment_date: string;
  appointment_time: string;
  phone_number: string;
  notes: string;
  salon_phone: string;
  salon_address: string;
  carrier?: string;
}

const createSMSMessage = (params: EmailTemplateParams): string => {
  // Create a concise SMS message within 160 characters
  return `Glamour's Salon Appt Confirmed:
${params.appointment_date} @ ${params.appointment_time}
Service: ${params.service_name}
Stylist: ${params.stylist_name}
Questions? Call ${params.salon_phone}`;
};

export const sendConfirmationAndStylistEmails = async (templateParams: EmailTemplateParams) => {
  try {
    // Validate required email parameters
    if (!templateParams.to_email?.trim()) {
      throw new Error('Client email address is required');
    }

    if (!templateParams.to_name?.trim()) {
      throw new Error('Client name is required');
    }

    if (!templateParams.stylist_email?.trim()) {
      throw new Error('Stylist email address is required');
    }

    // Initialize EmailJS
    emailjs.init(emailConfig.publicKey);

    // Common template parameters
    const commonParams = {
      from_name: "Glamour's Beauty Salon",
      service_name: templateParams.service_name,
      appointment_date: templateParams.appointment_date,
      appointment_time: templateParams.appointment_time,
      salon_address: templateParams.salon_address,
      salon_phone: templateParams.salon_phone,
      notes: templateParams.notes || 'No special notes',
      phone: templateParams.phone_number || 'Not provided'
    };

    // Client email parameters
    const clientParams = {
      ...commonParams,
      user_name: templateParams.to_name.trim(), // Client name
      user_email: templateParams.to_email.trim() // Client email
    };

    // Send client confirmation email
    const clientResponse = await emailjs.send(
      emailConfig.serviceId,
      emailConfig.clientConfirmationTemplateId,
      clientParams
    );

    if (clientResponse.status !== 200) {
      throw new Error(`Client EmailJS failed with status: ${clientResponse.status}`);
    }
    console.log('Client confirmation email sent successfully:', clientResponse);

    // Stylist email parameters
    const stylistParams = {
      ...commonParams,
      stylist_name: templateParams.stylist_name, // Stylist name
      user_name: templateParams.stylist_name, // Stylist name (used in template)
      user_email: templateParams.stylist_email.trim() // Stylist email
    };

    // Send stylist notification email
    const stylistResponse = await emailjs.send(
      emailConfig.serviceId,
      emailConfig.stylistNotificationTemplateId,
      stylistParams
    );

    if (stylistResponse.status !== 200) {
      throw new Error(`Stylist EmailJS failed with status: ${stylistResponse.status}`);
    }
    console.log('Stylist notification email sent successfully:', stylistResponse);

    // Send SMS confirmation if phone and carrier are provided
    if (templateParams.phone_number && templateParams.carrier) {
      const smsAddress = getSMSAddress(templateParams.phone_number, templateParams.carrier);
      
      if (smsAddress) {
        const smsParams = {
          ...clientParams,
          user_email: smsAddress,
          message: createSMSMessage(templateParams)
        };

        await emailjs.send(
          emailConfig.serviceId,
          emailConfig.clientConfirmationTemplateId,
          smsParams
        );
      }
    }

    return { clientResponse, stylistResponse };
  } catch (error: any) {
    console.error('Error sending emails:', error);
    throw new Error(error.message || 'Failed to send emails. Please try again.');
  }
};
