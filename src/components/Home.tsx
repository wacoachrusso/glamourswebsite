import React from 'react';
import HeroSection from './home/HeroSection';
import InfoSection from './home/InfoSection';
import WhyChooseUs from './home/WhyChooseUs';
import FeaturedStyles from './FeaturedStyles';

const Home: React.FC = () => {
  const stats = [
    { number: '1000+', label: 'Satisfied Clients' },
    { number: '15+', label: 'Expert Stylists' },
    { number: '10+', label: 'Years of Excellence' },
    { number: '50+', label: 'Beauty Awards' }
  ];

  return (
    <div className="bg-gradient-glamour min-h-screen">
      <div className="container mx-auto px-4">
        <HeroSection />
        <InfoSection />
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-glamour-dark mb-8">
            Featured Styles
          </h2>
          <FeaturedStyles />
        </div>

        <WhyChooseUs />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-duration-300">
              <h3 className="text-3xl font-bold text-glamour-gold mb-2">{stat.number}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;