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
    description: "Expert cut and style tailored to your preferences"
  },
  {
    id: "color-highlights",
    name: "Color & Highlights",
    duration: "120",
    price: "175",
    description: "Full color or highlight service with premium products"
  },
  {
    id: "brazilian-blowout",
    name: "Brazilian Blowout",
    duration: "180",
    price: "300",
    description: "Professional smoothing treatment for frizz-free hair"
  },
  {
    id: "mens-haircut",
    name: "Men's Haircut & Style",
    duration: "45",
    price: "45",
    description: "Professional men's cut with attention to detail"
  },
  {
    id: "balayage",
    name: "Balayage",
    duration: "180",
    price: "200",
    description: "Hand-painted highlights for a natural, sun-kissed look"
  },
  {
    id: "deep-conditioning",
    name: "Deep Conditioning",
    duration: "30",
    price: "35",
    description: "Intensive treatment to restore moisture and shine"
  }
];