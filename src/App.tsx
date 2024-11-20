import { FC, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Home from './components/Home';
import Services from './components/Services';
import Booking from './components/Booking';
import EmployeeLogin from './components/EmployeeLogin';
import DashboardLayout from './components/dashboard/DashboardLayout';
import MeetTheTeam from './components/MeetTheTeam';
import AboutUs from './components/AboutUs';
import Products from './components/Products';
import PrivacyPolicy from './components/PrivacyPolicy';
import Terms from './components/Terms';
import Footer from './components/Footer';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

const App: FC = () => {
  const location = useLocation();

  // Smooth scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);

  return (
    <LanguageProvider>
      <Routes>
        <Route path="/employee-dashboard/*" element={<DashboardLayout />} />
        <Route
          path="*"
          element={
            <div className="flex flex-col min-h-screen">
              <Header />
              <AnimatePresence mode="wait">
                <motion.main
                  key={location.pathname}
                  className="flex-grow pt-24"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                >
                  <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/employee-login" element={<EmployeeLogin />} />
                    <Route path="/team" element={<MeetTheTeam />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<Terms />} />
                  </Routes>
                </motion.main>
              </AnimatePresence>
              <Footer />
            </div>
          }
        />
      </Routes>
    </LanguageProvider>
  );
};

export default App;
