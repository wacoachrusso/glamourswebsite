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
      from_name: "Glamour's Beauty Salon",
      user_name: templateParams.to_name.trim(),
      user_email: templateParams.to_email.trim(),
      service_name: templateParams.service_name,
      stylist_name: templateParams.stylist_name,
      appointment_date: templateParams.appointment_date,
      appointment_time: templateParams.appointment_time,
      salon_address: templateParams.salon_address,
      salon_phone: templateParams.salon_phone,
      notes: templateParams.notes || 'No special notes',
      phone: templateParams.phone_number || 'Not provided'
    };

    // Send email confirmation
    const emailResponse = await emailjs.send(
      emailConfig.serviceId,
      emailConfig.templateId,
      formattedParams
    );

    if (emailResponse.status !== 200) {
      throw new Error(`EmailJS failed with status: ${emailResponse.status}`);
    }

    // Send SMS confirmation if phone and carrier are provided
    if (templateParams.phone_number && templateParams.carrier) {
      const smsAddress = getSMSAddress(templateParams.phone_number, templateParams.carrier);
      
      if (smsAddress) {
        const smsParams = {
          ...formattedParams,
          user_email: smsAddress,
          message: createSMSMessage(templateParams),
          template_params: {
            message: createSMSMessage(templateParams)
          }
        };

        // Send SMS via email-to-SMS gateway
        await emailjs.send(
          emailConfig.serviceId,
          emailConfig.templateId,
          smsParams
        );
      }
    }

    return emailResponse;
  } catch (error: any) {
    console.error('Error sending confirmation:', error);
    throw new Error(error.message || 'Failed to send confirmation. Please try again.');
  }
};