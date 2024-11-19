import emailjs from '@emailjs/browser';

// Interface for the email template parameters
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

// Environment variables (replace if using a different way to import them)
const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

// Function to send the confirmation email
export const sendConfirmationEmail = async (templateParams: EmailTemplateParams) => {
  try {
    // Format the template parameters
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

    // Log the parameters for debugging
    console.log('Sending email with parameters:', formattedParams);

    // Call EmailJS to send the email
    const response = await emailjs.send(
      emailConfig.serviceId,    // Service ID
      emailConfig.templateId,   // Template ID
      formattedParams,          // Template parameters
      emailConfig.publicKey     // Public API key
    );

    // Check the response
    if (response.status !== 200) {
      throw new Error(`EmailJS failed with status: ${response.status}`);
    }

    console.log('Email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Error during email send:', error);
    throw new Error('Failed to send confirmation email. Please try again.');
  }
};
