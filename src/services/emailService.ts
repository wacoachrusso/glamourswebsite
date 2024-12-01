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
  try {
    // Initialize EmailJS
    emailjs.init(emailConfig.publicKey);

    console.log('Sending client confirmation email with parameters:', templateParams);

    // Send client confirmation email
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
      throw new Error(`Client EmailJS failed with status: ${clientResponse.status}`);
    }
    console.log('Client confirmation email sent successfully:', clientResponse);

    // Only send stylist notification if a stylist was selected and has an email
    const stylistEmail = templateParams.stylist_email || 'loufranktv@gmail.com';
    if (stylistEmail && templateParams.stylist_name !== 'Next Available Stylist') {
      try {
        console.log('Sending stylist notification email with parameters:', {
          stylist_email: stylistEmail,
          stylist_name: templateParams.stylist_name,
          client_name: templateParams.to_name,
          client_email: templateParams.to_email,
          client_phone: templateParams.phone_number,
          service_name: templateParams.service_name,
          appointment_date: templateParams.appointment_date,
          appointment_time: templateParams.appointment_time,
          notes: templateParams.notes,
          salon_phone: templateParams.salon_phone,
          salon_address: templateParams.salon_address
        });

        await emailjs.send(
          emailConfig.serviceId,
          emailConfig.stylistNotificationTemplateId,
          {
            to_email: stylistEmail,
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
        console.log('Stylist notification email sent successfully');
      } catch (error) {
        console.error('Failed to send stylist notification:', error);
        // Don't throw here as the main booking was successful
      }
    }

    // Send SMS confirmation if phone and carrier are provided
    if (templateParams.phone_number && templateParams.carrier) {
      const smsAddress = getSMSAddress(templateParams.phone_number, templateParams.carrier);

      if (smsAddress) {
        try {
          console.log('Sending SMS notification to:', smsAddress);
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
          console.error('Failed to send SMS notification:', error);
          // Don't throw here as the main booking was successful
        }
      }
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error sending emails:', error);
    throw new Error('Failed to send confirmation email. Please try again.');
  }
};
