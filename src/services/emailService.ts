import emailjs from '@emailjs/browser';
import { emailConfig } from '../config/env';
import { getSMSAddress } from './smsGateway';

interface EmailTemplateParams {
  to_name: string;
  to_email: string;
  service_name: string;
  stylist_name: string;
  appointment_date: string;
  appointment_time: string;
  phone_number: string;
  carrier: string;
  notes: string;
  salon_phone: string;
  salon_address: string;
}

const createSMSMessage = (params: EmailTemplateParams): string => {
  return `Glamour's Salon Appt:
${params.appointment_date} @ ${params.appointment_time}
Service: ${params.service_name}
Stylist: ${params.stylist_name}
Questions? Call ${params.salon_phone}`;
};

export const sendConfirmationEmail = async (templateParams: EmailTemplateParams) => {
  try {
    // Initialize EmailJS
    emailjs.init(emailConfig.publicKey);

    // Send email confirmation
    const emailResponse = await emailjs.send(
      emailConfig.serviceId,
      emailConfig.templateId,
      {
        to_name: templateParams.to_name.trim(),
        to_email: templateParams.to_email.trim(),
        service_name: templateParams.service_name,
        appointment_date: templateParams.appointment_date,
        appointment_time: templateParams.appointment_time,
        salon_address: templateParams.salon_address,
        salon_phone: templateParams.salon_phone,
        notes: templateParams.notes || 'No special notes',
        phone: templateParams.phone_number || 'Not provided'
      }
    );

    if (emailResponse.status !== 200) {
      throw new Error(`Email failed with status: ${emailResponse.status}`);
    }

    // Send SMS if phone and carrier are provided
    if (templateParams.phone_number && templateParams.carrier) {
      const smsAddress = getSMSAddress(templateParams.phone_number, templateParams.carrier);
      
      if (smsAddress) {
        const smsMessage = createSMSMessage(templateParams);
        
        await emailjs.send(
          emailConfig.serviceId,
          emailConfig.templateId,
          {
            to_name: templateParams.to_name.trim(),
            to_email: smsAddress,
            message: smsMessage,
            service_name: templateParams.service_name,
            appointment_date: templateParams.appointment_date,
            appointment_time: templateParams.appointment_time,
            salon_phone: templateParams.salon_phone
          }
        );
      } else {
        throw new Error('Invalid carrier or phone number format');
      }
    }

    return emailResponse;
  } catch (error: any) {
    console.error('Error sending confirmation:', error);
    throw new Error(error.message || 'Failed to send confirmation. Please try again.');
  }
}