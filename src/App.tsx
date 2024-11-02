import { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

const App: FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Employee Dashboard Route */}
          <Route path="/employee-dashboard/*" element={<DashboardLayout />} />
          
          {/* Public Routes */}
          <Route
            path="*"
            element={
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow pt-48 md:pt-56">
                  <Routes>
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
                </main>
                <Footer />
              </div>
            }
          />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;