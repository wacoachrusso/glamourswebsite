import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Star } from 'lucide-react';

const HeroSection: FC = () => {
  return (
    <div className="relative text-center -mt-16 mb-32">
      <div className="flex justify-center">
        <img 
          src="/images/logo.png"
          alt="Glamour's Beauty Salon" 
          className="h-16 w-auto animate-float"
        />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-2 animate-fade-in">
        <span className="block text-glamour-gold">Welcome to</span>
        <span className="block text-glamour-gold mt-1">Glamour's Beauty Salon</span>
      </h1>
      
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6 animate-fade-in">
        Experience luxury beauty services in a warm, welcoming environment. Our expert stylists are dedicated to helping you look and feel your absolute best.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in">
        <Link
          to="/booking"
          className="px-6 py-2 bg-gradient-to-r from-glamour-gold to-pink-400 text-white rounded-full font-semibold hover:opacity-90 transform hover:-translate-y-1 transition-all duration-300 flex items-center shadow-lg"
        >
          <Scissors className="w-4 h-4 mr-2" />
          Book Appointment
        </Link>
        <Link
          to="/services"
          className="px-6 py-2 border-2 border-glamour-gold text-glamour-gold rounded-full font-semibold hover:bg-glamour-gold hover:text-white transform hover:-translate-y-1 transition-all duration-300 flex items-center"
        >
          <Star className="w-4 h-4 mr-2" />
          View Services
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;