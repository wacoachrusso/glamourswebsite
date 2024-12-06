export interface Service {
  id: string;
  name: string;
  duration: string;
  price: string;
  description: string;
  image: string;
}

export const services: Service[] = [
  {
    id: "womens-haircut",
    name: "Women's Haircut & Style",
    duration: "60",
    price: "85",
    description: "Transform your look with a precision haircut and professional styling tailored to your face shape and lifestyle",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "color-highlights",
    name: "Color & Highlights",
    duration: "120",
    price: "175",
    description: "Add dimension and vibrancy to your hair with our premium color services using top-quality products",
    image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "brazilian-blowout",
    name: "Brazilian Blowout",
    duration: "180",
    price: "300",
    description: "Achieve smooth, frizz-free hair that lasts for months with our professional smoothing treatment",
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "mens-haircut",
    name: "Men's Haircut & Style",
    duration: "45",
    price: "45",
    description: "Classic and modern cuts tailored to your style, including precise fades and beard grooming",
    image: "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "balayage",
    name: "Balayage",
    duration: "180",
    price: "200",
    description: "Create natural-looking, sun-kissed highlights with our expert hand-painting technique",
    image: "https://images.unsplash.com/photo-1617896848219-5ec29577cc26?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "deep-conditioning",
    name: "Deep Conditioning",
    duration: "30",
    price: "35",
    description: "Revitalize and nourish your hair with our intensive conditioning treatments",
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80"
  }
];