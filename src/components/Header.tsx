import { FC, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Clock, MapPin, Phone, Menu, X } from 'lucide-react';

const Header: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/services', label: 'Services' },
    { path: '/booking', label: 'Book Now' },
    { path: '/team', label: 'Our Team' },
    { path: '/products', label: 'Products' },
    { path: '/employee-login', label: 'Staff Portal' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Info Bar */}
      <div className="bg-glamour-dark text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm min-w-max mx-auto">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>Open everyday 10am - 7pm</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>275 Adams St, Newark NJ 07105</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                <a href="tel:9733445199" className="hover:text-glamour-gold transition-colors">
                  (973) 344-5199
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className={`transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-glamour py-2' 
          : 'bg-white py-4'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 relative z-10">
              <img 
                src="/logo.png"
                alt="Glamour's Beauty Salon" 
                className={`transition-all duration-500 ${
                  isScrolled ? 'h-24' : 'h-32'
                }`}
                style={{ objectFit: 'contain' }}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center">
              <div className="flex items-center space-x-12">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-2 py-2 text-base font-medium tracking-wide transition-all duration-300
                      text-gray-800 hover:text-glamour-gold uppercase ${
                        location.pathname === link.path ? 'text-glamour-gold' : ''
                      }`}
                  >
                    {link.label}
                    <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ease-in-out bg-glamour-gold ${
                      location.pathname === link.path ? 'w-full' : 'w-0 hover:w-full'
                    }`} />
                  </Link>
                ))}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-glamour-gold transition-colors relative z-10"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}>
          <nav className="container mx-auto px-4 py-4 bg-white border-t">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-2 py-2 text-base font-medium tracking-wide transition-colors
                    text-gray-800 hover:text-glamour-gold uppercase ${
                      location.pathname === link.path ? 'text-glamour-gold' : ''
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;