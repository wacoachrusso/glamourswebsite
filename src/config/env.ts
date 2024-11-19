interface EmailJSConfig {
    publicKey: string;
    templateId: string;
    serviceId: string;
  }
  
  // Default development values
  const devConfig: EmailJSConfig = {
    publicKey: '2g5IRRgglD-GokQVj',
    templateId: 'template_iqi27i9',
    serviceId: 'service_odh2gob'
  };
  
  // Production values will be loaded from environment variables
  const prodConfig: EmailJSConfig = {
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || devConfig.publicKey,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || devConfig.templateId,
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || devConfig.serviceId
  };
  
  export const emailConfig = import.meta.env.PROD ? prodConfig : devConfig;