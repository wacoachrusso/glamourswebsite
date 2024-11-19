import React, { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { sendConfirmationEmail } from '../services/emailService';
import PersonalInfo from './booking/PersonalInfo';
import ServiceSelect from './booking/ServiceSelect';
import ProfessionalSelect from './booking/ProfessionalSelect';
import DateTimeSelect from './booking/DateTimeSelect';
import { services } from '../data/services';

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
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setError('');
    setLoading(true);

    // Basic validation
    if (!formData.clientName || !formData.clientEmail || !formData.selectedService || 
        !formData.appointmentDate || !formData.appointmentTime) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      // Get service details
      const selectedService = services.find(s => s.id === formData.selectedService);
      if (!selectedService) {
        throw new Error('Selected service not found');
      }

      // Prepare email template parameters
      const emailParams = {
        to_name: formData.clientName,
        to_email: formData.clientEmail,
        service_name: selectedService.name,
        stylist_name: formData.selectedProfessional || 'Our Expert Stylist',
        appointment_date: new Date(formData.appointmentDate).toLocaleDateString(),
        appointment_time: formData.appointmentTime,
        phone_number: formData.clientPhone || 'Not provided',
        notes: formData.notes || 'No special notes',
        salon_phone: '(973) 344-5199',
        salon_address: '275 Adams St, Newark, NJ 07105'
      };

      // Send confirmation email
      await sendConfirmationEmail(emailParams);

      // Store appointment in localStorage (for demo purposes)
      const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      appointments.push({
        id: Date.now(),
        ...formData,
        status: 'PENDING',
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('appointments', JSON.stringify(appointments));

      setSuccess(true);
      setFormData({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        selectedService: '',
        selectedProfessional: '',
        appointmentDate: '',
        appointmentTime: '',
        notes: ''
      });
    } catch (err) {
      setError('Failed to book appointment. Please try again.');
      console.error('Booking error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for choosing Glamour's Beauty Salon. We've sent a confirmation email with your appointment details.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="px-6 py-2 bg-glamour-gold text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-12 bg-white rounded-xl p-8 shadow-lg">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <PersonalInfo formData={formData} onChange={handleChange} />
        
        <ServiceSelect 
          selectedService={formData.selectedService} 
          onChange={handleServiceChange}
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
          disabled={loading}
          className={`w-full py-3 bg-glamour-gold text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1 ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Book Appointment'
          )}
        </button>
      </form>
    </div>
  );
};

export default Booking;