import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../config/images';

const Services: React.FC = () => {
  const services = [
    {
      name: 'Hair Styling & Design',
      description: 'From classic cuts to creative styles, our expert stylists create looks that enhance your natural beauty.',
      image: IMAGES.services.hairCuts.women,
      alt: 'Beautiful dark curls hairstyle'
    },
    {
      name: 'Expert Braiding',
      description: 'Precision braiding services including cornrows, box braids, and creative patterns.',
      image: IMAGES.services.braids.style2,
      alt: 'Precision cornrow braids'
    },
    {
      name: 'Nail Artistry',
      description: 'Professional nail care services including manicures, pedicures, and artistic designs.',
      image: IMAGES.services.nailServices.main,
      alt: 'French ombre nail design'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-glamour-dark mb-6">Our Premium Services</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover our comprehensive range of beauty services, delivered by experienced professionals using premium products.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64">
              <img 
                src={service.image} 
                alt={service.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-glamour-dark mb-2">{service.name}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link 
                to="/booking" 
                className="inline-block bg-glamour-gold text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-opacity-90 transition duration-300"
              >
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;