import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Clock, Mail, Facebook, Instagram } from 'lucide-react';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-glamour-dark mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-glamour-gold mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-600">
                  275 Adams St<br />
                  Newark, NJ 07105
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-glamour-gold mr-2 flex-shrink-0" />
                <a 
                  href="tel:9733445199" 
                  className="text-gray-600 hover:text-glamour-gold transition-colors"
                >
                  (973) 344-5199
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-glamour-gold mr-2 flex-shrink-0" />
                <a 
                  href="mailto:info@glamoursbeauty.com"
                  className="text-gray-600 hover:text-glamour-gold transition-colors"
                >
                  info@glamoursbeauty.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-semibold text-glamour-dark mb-4">Business Hours</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Clock className="w-5 h-5 text-glamour-gold mr-2 flex-shrink-0" />
                <span className="text-gray-600">Open Every Day</span>
              </li>
              <li className="text-gray-600 ml-7">10:00 AM - 7:00 PM</li>
              <li className="text-gray-600 ml-7">Walk-ins Welcome</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-glamour-dark mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { path: '/services', label: 'Our Services' },
                { path: '/booking', label: 'Book Appointment' },
                { path: '/products', label: 'Products' },
                { path: '/team', label: 'Meet Our Team' },
                { path: '/about', label: 'About Us' },
                { path: '/employee-login', label: 'Staff Portal' }
              ].map((link) => (
                <li key={link.path}>
                  <button 
                    onClick={() => handleNavigation(link.path)}
                    className="text-gray-600 hover:text-glamour-gold transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-glamour-dark mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://www.facebook.com/profile.php?id=100085002544559" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-glamour-gold bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-colors"
              >
                <Facebook className="w-5 h-5 text-glamour-gold" />
              </a>
              <a 
                href="https://www.instagram.com/glamours.beauty.salon/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-glamour-gold bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-colors"
              >
                <Instagram className="w-5 h-5 text-glamour-gold" />
              </a>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-glamour-dark mb-2">Stay Updated</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-glamour-gold/50 focus:border-glamour-gold"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-glamour-gold text-white rounded-r-lg hover:bg-opacity-90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © {currentYear} Glamour's Beauty Salon. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <button 
                onClick={() => handleNavigation('/privacy')}
                className="text-gray-600 hover:text-glamour-gold text-sm transition-colors"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => handleNavigation('/terms')}
                className="text-gray-600 hover:text-glamour-gold text-sm transition-colors"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;