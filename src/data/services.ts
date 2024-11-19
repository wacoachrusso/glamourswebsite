export interface Service {
    id: string;
    name: string;
    duration: string;
    price: string;
    description: string;
  }
  
  export const services: Service[] = [
    {
      id: "womens-haircut",
      name: "Women's Haircut & Style",
      duration: "60",
      price: "85",
      description: "Professional cut and style tailored to your preferences, includes consultation and styling tips"
    },
    {
      id: "color-highlights",
      name: "Color & Highlights",
      duration: "120",
      price: "175",
      description: "Full color or highlight service with premium products, includes toner and treatment"
    },
    {
      id: "brazilian-blowout",
      name: "Brazilian Blowout",
      duration: "180",
      price: "300",
      description: "Professional smoothing treatment for frizz-free, manageable hair that lasts up to 12 weeks"
    },
    {
      id: "mens-haircut",
      name: "Men's Haircut & Style",
      duration: "45",
      price: "45",
      description: "Professional men's cut and style with attention to detail and personal preferences"
    },
    {
      id: "balayage",
      name: "Balayage",
      duration: "180",
      price: "200",
      description: "Hand-painted highlights creating a natural, sun-kissed look with seamless grow-out"
    },
    {
      id: "deep-conditioning",
      name: "Deep Conditioning Treatment",
      duration: "30",
      price: "35",
      description: "Intensive treatment to restore moisture, shine, and health to your hair"
    }
  ];