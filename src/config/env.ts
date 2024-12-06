const getEnvVar = (key: string, defaultValue: string = ''): string => {
  const value = import.meta.env[key];
  return value !== undefined ? value : defaultValue;
};

export const emailConfig = {
  publicKey: getEnvVar('VITE_EMAILJS_PUBLIC_KEY', 'demo_key'),
  serviceId: getEnvVar('VITE_EMAILJS_SERVICE_ID', 'demo_service'),
  clientConfirmationTemplateId: getEnvVar('VITE_EMAILJS_CLIENT_CONFIRMATION_TEMPLATE_ID', 'demo_template'),
  stylistNotificationTemplateId: getEnvVar('VITE_EMAILJS_STYLIST_NOTIFICATION_TEMPLATE_ID', 'demo_template'),
};