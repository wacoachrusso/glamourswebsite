import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Star } from 'lucide-react';

const HeroSection: FC = () => {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4">
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"
        style={{ backgroundPosition: '50% 30%' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-glamour-light/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Enlarged Logo Animation */}
        <div className="mb-12 transform animate-float">
          <img 
            src="/images/logo.png"
            alt="Glamour's Beauty Salon" 
            className="h-32 md:h-40 w-auto mx-auto drop-shadow-2xl filter brightness-110"
          />
        </div>

        {/* Main Title with Enhanced Gradient Animation */}
        <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white opacity-0 animate-[fadeInUp_1s_ease-out_0.5s_forwards]">
          <span className="block mb-3 font-light">Welcome to</span>
          <span className="block bg-gradient-to-r from-glamour-gold via-pink-300 to-glamour-gold bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_3s_infinite] drop-shadow-lg">
            Glamour's Beauty Salon
          </span>
        </h1>
        
        {/* Enhanced Subtitle with Fade Animation */}
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-14 opacity-0 animate-[fadeInUp_1s_ease-out_0.8s_forwards] leading-relaxed">
          Experience luxury
         beauty services in a warm, welcoming environment. 
          <span className="block mt-2 text-glamour-gold font-light">Where Beauty Meets Excellence</span>
        </p>

        {/* Enhanced CTA Buttons with Hover Effects */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0 animate-[fadeInUp_1s_ease-out_1s_forwards]">
          <Link
            to="/services"
            className="px-10 py-4 bg-white text-glamour-dark rounded-full font-semibold transform hover:-translate-y-1 transition-all duration-300 flex items-center group shadow-lg hover:shadow-xl relative overflow-hidden border-2 border-glamour-gold"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-glamour-gold to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center">
              <Scissors className="w-5 h-5 mr-3 text-glamour-gold group-hover:text-white transition-colors" />
              <span className="group-hover:text-white transition-colors">View Services</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Enhanced Animated Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-glamour-gold/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      </div>
    </div>
  );
};

export default HeroSection;