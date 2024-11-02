import React from 'react';
import { Link } from 'react-router-dom';

interface ServiceProps {
  name: string;
  price: string;
  description: string;
  image: string;
  alt: string;
}

const ServiceCard: React.FC<ServiceProps> = ({ name, price, description, image, alt }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
    <div className="relative h-[300px]">
      <img 
        src={image} 
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
        <div className="absolute bottom-4 left-4 text-white">
          <p className="text-lg font-semibold">{name}</p>
          <p className="text-sm">{price}</p>
        </div>
      </div>
    </div>
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{name}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-pink-600">{price}</span>
        <Link 
          to="/booking" 
          className="bg-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-pink-700 transition duration-300"
        >
          Book Now
        </Link>
      </div>
    </div>
  </div>
);

export default ServiceCard;