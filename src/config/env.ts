// EmailJS Configuration
export const emailConfig = {
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '2g5IRRgglD-GokQVj',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_ud1l1yi',
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_odh2gob'
};