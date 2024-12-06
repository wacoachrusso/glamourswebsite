const getEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  return value || '';
};

export const emailConfig = {
  publicKey: '2g5IRRgglD-GokQVj',
  serviceId: 'service_odh2gob',
  templateId: 'template_ud1l1yi'
};

export const isEmailConfigValid = (): boolean => {
  return !!(
    emailConfig.publicKey &&
    emailConfig.serviceId &&
    emailConfig.templateId
  );
};