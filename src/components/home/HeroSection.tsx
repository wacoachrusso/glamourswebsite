import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Star } from 'lucide-react';

const HeroSection: FC = () => {
  return (
    <div className="relative text-center mb-24">
      <div className="flex justify-center items-center mb-8">
        <div className="relative">
          <img 
            src="/images/logo.png"
            alt="Glamour's Beauty Salon" 
            className="h-32 w-auto animate-float"
          />
        </div>
      </div>

      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
        <span className="block text-glamour-gold pb-2">
          Welcome to
        </span>
        <span className="block text-glamour-gold pb-2 mt-2">
          Glamour's Beauty Salon
        </span>
      </h1>
      
      <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 animate-fade-in">
        Experience luxury beauty services in a warm, welcoming environment. Our expert stylists are dedicated to helping you look and feel your absolute best.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
        <Link
          to="/booking"
          className="px-8 py-3 bg-gradient-to-r from-glamour-gold to-pink-400 text-white rounded-full font-semibold hover:opacity-90 transform hover:-translate-y-1 transition-all duration-300 flex items-center shadow-lg"
        >
          <Scissors className="w-5 h-5 mr-2" />
          Book Appointment
        </Link>
        <Link
          to="/services"
          className="px-8 py-3 border-2 border-glamour-gold text-glamour-gold rounded-full font-semibold hover:bg-glamour-gold hover:text-white transform hover:-translate-y-1 transition-all duration-300 flex items-center"
        >
          <Star className="w-5 h-5 mr-2" />
          View Services
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;