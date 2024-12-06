import React, { useState } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  BarChart2, 
  MessageSquare, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import Sidebar from './Sidebar';
import DashboardStats from './DashboardStats';
import ClientManagement from './ClientManagement';
import ServiceTracking from './ServiceTracking';
import Reports from './Reports';
import Communications from './Communications';
import StylistPortal from './stylist/StylistPortal';

const DashboardLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/employee-login');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'services', label: 'Services', icon: Calendar },
    { id: 'reports', label: 'Reports', icon: BarChart2 },
    { id: 'communications', label: 'Communications', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-white shadow-md text-gray-600 hover:text-glamour-gold transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white shadow-xl transition-transform duration-300 z-40
        lg:translate-x-0 lg:w-64
        ${isMobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full'}
      `}>
        <Sidebar 
          menuItems={menuItems} 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          onLogout={handleLogout}
        />
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        <div className="p-6">
          <Routes>
            <Route path="/" element={<DashboardStats />} />
            <Route path="/clients" element={<ClientManagement />} />
            <Route path="/services" element={<ServiceTracking />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/communications" element={<Communications />} />
            <Route path="/stylist/:stylistName/*" element={<StylistPortal />} />
          </Routes>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;