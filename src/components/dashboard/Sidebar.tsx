import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface SidebarProps {
  menuItems: MenuItem[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  menuItems, 
  activeTab, 
  onTabChange,
  onLogout 
}) => {
  return (
    <div className="h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b">
        <img 
          src="/src/assets/logo.png"
          alt="Glamour's Beauty Salon" 
          className="h-12 w-auto mx-auto"
          style={{ objectFit: 'contain' }}
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-glamour-gold text-white'
                      : 'text-gray-600 hover:bg-glamour-light hover:text-glamour-gold'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t">
        <button
          onClick={onLogout}
          className="w-full px-4 py-2 text-white bg-glamour-gold rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;