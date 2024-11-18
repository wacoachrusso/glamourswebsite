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
    <header className="w-full">
      {/* Top Info Bar */}
      <div className="bg-glamour-800 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-4 md:gap-0 md:justify-between text-sm">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-glamour-200" />
                <span>Open everyday 10am - 7pm</span>
              </div>
              <div className="hidden md:flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-glamour-200" />
                <span>275 Adams St, Newark NJ 07105</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-glamour-200" />
                <a href="tel:9733445199" className="hover:text-glamour-200 transition-colors">
                  (973) 344-5199
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className={`w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-glamour py-2' 
          : 'bg-white/80 backdrop-blur-md py-4'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img 
                src="/logo.png"
                alt="Glamour's Beauty Salon" 
                className={`transition-all duration-300 ${
                  isScrolled ? 'h-16' : 'h-20'
                }`}
                style={{ objectFit: 'contain' }}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center">
              <div className="flex items-center space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`nav-link text-sm font-medium tracking-wide uppercase ${
                      location.pathname === link.path ? 'text-glamour-600 after:w-full' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-glamour-600 hover:text-glamour-700 transition-colors"
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
          <nav className="container mx-auto px-4 py-4 bg-white border-t border-glamour-100">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm font-medium tracking-wide uppercase ${
                    location.pathname === link.path 
                      ? 'text-glamour-600' 
                      : 'text-glamour-800 hover:text-glamour-600'
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