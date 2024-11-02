import React from 'react';
import { Clock, MapPin, Phone } from 'lucide-react';

const InfoSection: React.FC = () => {
  return (
    <div className="mb-16 -mt-8">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-glamour-lg overflow-hidden border border-glamour-gold/10">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Hours */}
          <div className="p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-glamour-gold/10 hover:bg-glamour-light/50 transition-colors">
            <Clock className="w-10 h-10 text-glamour-gold mr-6 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-xl text-glamour-dark mb-2">Business Hours</h3>
              <p className="text-gray-600">Open Every Day</p>
              <p className="text-gray-800 font-medium text-lg">10:00 AM - 7:00 PM</p>
            </div>
          </div>

          {/* Location */}
          <div className="p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-glamour-gold/10 hover:bg-glamour-light/50 transition-colors">
            <MapPin className="w-10 h-10 text-glamour-gold mr-6 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-xl text-glamour-dark mb-2">Visit Us</h3>
              <p className="text-gray-600">275 Adams St</p>
              <p className="text-gray-800 font-medium text-lg">Newark, NJ 07105</p>
            </div>
          </div>

          {/* Contact */}
          <div className="p-8 flex items-center justify-center hover:bg-glamour-light/50 transition-colors">
            <Phone className="w-10 h-10 text-glamour-gold mr-6 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-xl text-glamour-dark mb-2">Contact Us</h3>
              <a 
                href="tel:9733445199" 
                className="text-gray-800 hover:text-glamour-gold transition-colors text-lg font-medium"
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