import React from 'react';
import { Clock, MapPin, Phone } from 'lucide-react';

const InfoSection: React.FC = () => {
  const openGoogleMaps = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=275+Adams+St+Newark+NJ+07105', '_blank');
  };

  return (
    <div className="relative z-10">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-glamour-gold/10 transform hover:scale-[1.02] transition-transform duration-300">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Hours */}
          <div className="p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-glamour-gold/10 bg-gradient-to-br from-white to-glamour-light/30 hover:from-glamour-light/30 hover:to-white transition-colors duration-500">
            <Clock className="w-12 h-12 text-glamour-gold mr-6 flex-shrink-0 animate-pulse" />
            <div>
              <h3 className="font-semibold text-xl text-glamour-dark mb-2">Business Hours</h3>
              <p className="text-gray-600">Open Every Day</p>
              <p className="text-gray-800 font-medium text-lg bg-gradient-to-r from-glamour-gold to-pink-400 bg-clip-text text-transparent">
                10:00 AM - 7:00 PM
              </p>
            </div>
          </div>

          {/* Location */}
          <button 
            onClick={openGoogleMaps}
            className="p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-glamour-gold/10 bg-gradient-to-br from-white to-glamour-light/30 hover:from-glamour-light/30 hover:to-white transition-colors duration-500 w-full cursor-pointer group"
          >
            <MapPin className="w-12 h-12 text-glamour-gold mr-6 flex-shrink-0 animate-pulse group-hover:scale-110 transition-transform" />
            <div>
              <h3 className="font-semibold text-xl text-glamour-dark mb-2">Visit Us</h3>
              <p className="text-gray-600">275 Adams St</p>
              <p className="text-gray-800 font-medium text-lg bg-gradient-to-r from-glamour-gold to-pink-400 bg-clip-text text-transparent group-hover:scale-105 transform transition-transform">
                Newark, NJ 07105
              </p>
              <span className="text-sm text-glamour-gold mt-2 block opacity-0 group-hover:opacity-100 transition-opacity">
                Click to open in Google Maps
              </span>
            </div>
          </button>

          {/* Contact */}
          <div className="p-8 flex items-center justify-center bg-gradient-to-br from-white to-glamour-light/30 hover:from-glamour-light/30 hover:to-white transition-colors duration-500">
            <Phone className="w-12 h-12 text-glamour-gold mr-6 flex-shrink-0 animate-pulse" />
            <div>
              <h3 className="font-semibold text-xl text-glamour-dark mb-2">Contact Us</h3>
              <a 
                href="tel:9733445199" 
                className="text-gray-800 hover:text-glamour-gold transition-colors text-lg font-medium bg-gradient-to-r from-glamour-gold to-pink-400 bg-clip-text text-transparent hover:scale-105 transform inline-block"
              >
                (973) 344-5199
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;