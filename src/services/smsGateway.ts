interface CarrierGateway {
    sms: string;
    mms: string;
  }
  
  interface CarrierGateways {
    [key: string]: CarrierGateway;
  }
  
  export const CARRIER_GATEWAYS: CarrierGateways = {
    att: {
      sms: 'txt.att.net',
      mms: 'mms.att.net'
    },
    verizon: {
      sms: 'vtext.com',
      mms: 'vzwpix.com'
    },
    tmobile: {
      sms: 'tmomail.net',
      mms: 'tmomail.net'
    },
    sprint: {
      sms: 'messaging.sprintpcs.com',
      mms: 'pm.sprint.com'
    },
    uscellular: {
      sms: 'email.uscc.net',
      mms: 'mms.uscc.net'
    },
    metropcs: {
      sms: 'metropcs.sms.us',
      mms: 'mymetropcs.com'
    },
    boost: {
      sms: 'sms.myboostmobile.com',
      mms: 'myboostmobile.com'
    },
    cricket: {
      sms: 'sms.cricketwireless.net',
      mms: 'mms.cricketwireless.net'
    },
    virgin: {
      sms: 'vmobl.com',
      mms: 'vmpix.com'
    }
  };
  
  export const formatPhoneNumber = (phone: string): string => {
    return phone.replace(/\D/g, '');
  };
  
  export const getSMSAddress = (phone: string, carrier: string, useMMS: boolean = false): string | null => {
    const carrierGateway = CARRIER_GATEWAYS[carrier];
    if (!carrierGateway) return null;
  
    const cleanPhone = formatPhoneNumber(phone);
    if (cleanPhone.length !== 10) return null;
  
    const gateway = useMMS ? carrierGateway.mms : carrierGateway.sms;
    return `${cleanPhone}@${gateway}`;
  };