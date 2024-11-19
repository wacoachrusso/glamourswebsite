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

export const sendConfirmationEmail = async (templateParams: EmailTemplateParams) => {
  try {
    // Format the templateParams to match Record<string, string>
    const formattedParams: Record<string, string> = {
      to_name: templateParams.to_name,
      to_email: templateParams.to_email,
      service_name: templateParams.service_name,
      stylist_name: templateParams.stylist_name,
      appointment_date: templateParams.appointment_date,
      appointment_time: templateParams.appointment_time,
      phone_number: templateParams.phone_number,
      notes: templateParams.notes,
      salon_phone: templateParams.salon_phone,
      salon_address: templateParams.salon_address,
    };

    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formattedParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    if (response.status !== 200) {
      throw new Error('Failed to send email');
    }

    return response;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send confirmation email. Please try again.');
  }
};
