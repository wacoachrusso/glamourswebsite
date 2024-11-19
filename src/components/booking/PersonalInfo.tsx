import React from 'react';
import { User, Mail, Phone } from 'lucide-react';

interface PersonalInfoProps {
  formData: {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-glamour-dark flex items-center">
        <User className="w-5 h-5 mr-2" />
        Personal Information
      </h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={onChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamour-gold/50 focus:border-glamour-gold"
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="clientEmail"
              name="clientEmail"
              value={formData.clientEmail}
              onChange={onChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamour-gold/50 focus:border-glamour-gold"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="clientPhone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              id="clientPhone"
              name="clientPhone"
              value={formData.clientPhone}
              onChange={onChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamour-gold/50 focus:border-glamour-gold"
              placeholder="(123) 456-7890"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">Optional, but recommended for appointment reminders</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;