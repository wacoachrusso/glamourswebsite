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
    <>
      {/* Spacer div to account for fixed header height */}
      <div className="h-[140px]"></div>
      
      <header className="w-full fixed top-0 left-0 right-0 z-50">
        <div className="bg-glamour-dark text-white py-1">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-4 md:gap-0 md:justify-between text-sm">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-glamour-gold" />
                  <span>Open everyday 10am - 7pm</span>
                </div>
                <div className="hidden md:flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-glamour-gold" />
                  <span>275 Adams St, Newark NJ 07105</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-glamour-gold" />
                  <a href="tel:9733445199" className="hover:text-glamour-gold transition-colors">
                    (973) 344-5199
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-glamour py-2' 
            : 'bg-white/80 backdrop-blur-md py-4'
        }`}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex-shrink-0">
                <img 
                  src="/images/logo.png"
                  alt="Glamour's Beauty Salon" 
                  className={`transition-all duration-300 ${
                    isScrolled ? 'h-12' : 'h-16'
                  }`}
                />
              </Link>

              <nav className="hidden md:flex items-center">
                <div className="flex items-center space-x-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`nav-link text-sm font-medium tracking-wide uppercase ${
                        location.pathname === link.path ? 'text-glamour-gold after:w-full' : 'text-glamour-dark'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </nav>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-glamour-dark hover:text-glamour-gold transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          <div className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen 
              ? 'max-h-96 opacity-100' 
              : 'max-h-0 opacity-0 pointer-events-none'
          }`}>
            <nav className="container mx-auto px-4 py-2 bg-white border-t border-glamour-100">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-sm font-medium tracking-wide uppercase ${
                      location.pathname === link.path 
                        ? 'text-glamour-gold' 
                        : 'text-glamour-dark hover:text-glamour-gold'
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
    </>
  );
};

export default Header;