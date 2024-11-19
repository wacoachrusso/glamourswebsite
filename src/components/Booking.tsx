import React, { useState } from 'react';
import PersonalInfo from './booking/PersonalInfo';
import ServiceSelect from './booking/ServiceSelect';
import ProfessionalSelect from './booking/ProfessionalSelect';
import DateTimeSelect from './booking/DateTimeSelect';

const Booking = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    selectedService: '',
    selectedProfessional: '',
    appointmentDate: '',
    appointmentTime: '',
    notes: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleServiceChange = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedService: serviceId
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Your form submission logic...
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 bg-white rounded-xl p-8 shadow-lg">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      <PersonalInfo formData={formData} onChange={handleChange} />
      
      <ServiceSelect 
        selectedService={formData.selectedService} 
        onChange={handleServiceChange} // Updated to use handleServiceChange
      />

      <ProfessionalSelect 
        selectedProfessional={formData.selectedProfessional} 
        onChange={handleChange} 
      />

      <DateTimeSelect 
        appointmentDate={formData.appointmentDate}
        appointmentTime={formData.appointmentTime}
        onChange={handleChange}
      />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-glamour-dark">Additional Notes</h2>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          placeholder="Any special requests or additional information..."
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-glamour-gold/50 focus:border-glamour-gold resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-glamour-gold text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1"
      >
        Book Appointment
      </button>
    </form>
  );
};

export default Booking;
