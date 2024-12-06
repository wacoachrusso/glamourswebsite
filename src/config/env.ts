export const emailConfig = {
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'demo_key',
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'demo_service',
  clientConfirmationTemplateId: import.meta.env.VITE_EMAILJS_CLIENT_CONFIRMATION_TEMPLATE_ID || 'demo_template',
  stylistNotificationTemplateId: import.meta.env.VITE_EMAILJS_STYLIST_NOTIFICATION_TEMPLATE_ID || 'demo_template',
};