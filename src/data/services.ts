export interface Service {
  id: string;
  name: string;
  duration: string;
  price: string;
  description: string;
  image: string;
}

import { IMAGES } from '../config/images';

export const services: Service[] = [
  {
    id: "womens-haircut",
    name: "Women's Haircut & Style",
    duration: "60",
    price: "85",
    description: "Transform your look with a precision haircut and professional styling tailored to your face shape and lifestyle",
    image: IMAGES.services.hairCuts.women
  },
  {
    id: "color-highlights",
    name: "Color & Highlights",
    duration: "120",
    price: "175",
    description: "Add dimension and vibrancy to your hair with our premium color services using top-quality products",
    image: IMAGES.services.balayage.main
  },
  {
    id: "brazilian-blowout",
    name: "Brazilian Blowout",
    duration: "180",
    price: "300",
    description: "Achieve smooth, frizz-free hair that lasts for months with our professional smoothing treatment",
    image: IMAGES.services.keratina.main
  },
  {
    id: "mens-haircut",
    name: "Men's Haircut & Style",
    duration: "45",
    price: "45",
    description: "Classic and modern cuts tailored to your style, including precise fades and beard grooming",
    image: IMAGES.services.hairCuts.women2
  },
  {
    id: "balayage",
    name: "Balayage",
    duration: "180",
    price: "200",
    description: "Create natural-looking, sun-kissed highlights with our expert hand-painting technique",
    image: IMAGES.services.balayage.style2
  },
  {
    id: "deep-conditioning",
    name: "Deep Conditioning",
    duration: "30",
    price: "35",
    description: "Revitalize and nourish your hair with our intensive conditioning treatments",
    image: IMAGES.services.balayage.style3
  }
];