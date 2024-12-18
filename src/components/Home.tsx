import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HeroSection from './home/HeroSection';
import InfoSection from './home/InfoSection';
import WhyChooseUs from './home/WhyChooseUs';
import FeaturedStyles from './FeaturedStyles';
import { Star, Award, Users, Clock } from 'lucide-react';

const Home: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(location.state?.bookingSuccess || false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (showSuccess) {
      // Clear the success message after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccess(false);
        // Clear the router state
        navigate('.', { replace: true, state: {} });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showSuccess, navigate]);

  const stats = [
    { number: '1000+', label: 'Satisfied Clients', icon: Users },
    { number: '15+', label: 'Expert Stylists', icon: Star },
    { number: '10+', label: 'Years of Excellence', icon: Clock },
    { number: '50+', label: 'Beauty Awards', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-glamour-light via-white to-glamour-light/50">
      {showSuccess && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg mx-4 animate-fade-in">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Star className="h-5 w-5 text-green-600" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Booking Confirmed! Check your email for appointment details.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <HeroSection />
        
        <div id="main-content" className="relative -mt-20 pt-32">
          <InfoSection />
        </div>
        
        <div className="mt-32 mb-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-glamour-dark mb-6">
              <span className="bg-gradient-to-r from-glamour-gold via-pink-400 to-glamour-gold bg-clip-text text-transparent">
                Featured Styles
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular and trending hairstyles, created by our expert stylists
            </p>
          </div>
          <FeaturedStyles />
        </div>

        <WhyChooseUs />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-glamour-gold/10"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-glamour-gold to-pink-400 rounded-full flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-4xl font-bold bg-gradient-to-r from-glamour-gold to-pink-400 bg-clip-text text-transparent text-center mb-3">
                  {stat.number}
                </h3>
                <p className="text-gray-600 text-center text-lg">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;