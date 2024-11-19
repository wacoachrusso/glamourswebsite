import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_glamours';
const TEMPLATE_ID = 'template_booking';
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key

interface EmailParams {
  clientName: string;
  clientEmail: string;
  serviceName: string;
  date: string;
  time: string;
  notes?: string;
}

export const sendBookingConfirmation = async (params: EmailParams) => {
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        to_name: params.clientName,
        to_email: params.clientEmail,
        service_name: params.serviceName,
        appointment_date: params.date,
        appointment_time: params.time,
        notes: params.notes || 'No special notes',
        salon_phone: '(973) 344-5199',
        salon_address: '275 Adams St, Newark, NJ 07105'
      },
      PUBLIC_KEY
    );

    return response;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send confirmation email');
  }
};