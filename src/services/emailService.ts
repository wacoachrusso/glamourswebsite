import emailjs from '@emailjs/browser';

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

// Initialize EmailJS with public key
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

export const sendConfirmationEmail = async (templateParams: EmailTemplateParams) => {
  try {
    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams
    );
    
    if (response.status !== 200) {
      throw new Error('Failed to send confirmation email');
    }
    
    return response;
  } catch (error) {
    console.error('Failed to send email via EmailJS:', error);
    throw new Error('Failed to send confirmation email. Please try again later.');
  }
};