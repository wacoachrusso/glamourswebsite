import React, { useState, useEffect } from 'react';
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
    carrier: '',
    selectedService: '',
    selectedProfessional: '',
    appointmentDate: '',
    appointmentTime: '',
    notes: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10;
  };

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

    try {
      if (!formData.clientName?.trim()) {
        throw new Error('Please enter your name');
      }

      if (!formData.clientEmail?.trim()) {
        throw new Error('Please enter your email address');
      }

      if (!validateEmail(formData.clientEmail)) {
        throw new Error('Please enter a valid email address');
      }

      if (!formData.selectedService) {
        throw new Error('Please select a service');
      }

      if (!formData.appointmentDate || !formData.appointmentTime) {
        throw new Error('Please select appointment date and time');
      }

      if (formData.clientPhone && !validatePhone(formData.clientPhone)) {
        throw new Error('Please enter a valid 10-digit phone number');
      }

      if (formData.clientPhone && !formData.carrier) {
        throw new Error('Please select your mobile carrier for SMS notifications');
      }

      const selectedService = services.find(s => s.id === formData.selectedService);
      if (!selectedService) {
        throw new Error('Selected service not found');
      }

      await sendConfirmationEmail({
        to_name: formData.clientName.trim(),
        to_email: formData.clientEmail.trim(),
        service_name: selectedService.name,
        stylist_name: formData.selectedProfessional || 'Our Expert Stylist',
        appointment_date: new Date(formData.appointmentDate).toLocaleDateString(),
        appointment_time: formData.appointmentTime,
        phone_number: formData.clientPhone?.trim() || 'Not provided',
        carrier: formData.carrier,
        notes: formData.notes?.trim() || 'No special notes',
        salon_phone: '(973) 344-5199',
        salon_address: '275 Adams St, Newark, NJ 07105'
      });

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
        carrier: '',
        selectedService: '',
        selectedProfessional: '',
        appointmentDate: '',
        appointmentTime: '',
        notes: ''
      });
    } catch (err: any) {
      setError(err.message || 'Failed to book appointment. Please try again.');
      console.error('Booking error:', err);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Personal Information' },
    { number: 2, title: 'Select Service' },
    { number: 3, title: 'Choose Stylist' },
    { number: 4, title: 'Date & Time' }
  ];

  if (success) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for choosing Glamour's Beauty Salon. We've sent a confirmation email{formData.clientPhone ? ' and SMS' : ''} with your appointment details.
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-glamour-dark mb-4">Book Your Appointment</h1>
          <p className="text-xl text-gray-600">Schedule your visit with our expert stylists</p>
        </div>

        {/* Progress Steps */}
        <div className="hidden lg:flex items-center justify-center mb-12">
          <div className="flex items-center w-full max-w-4xl justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -translate-y-1/2" />
            {steps.map((step) => (
              <div key={step.number} className="relative flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                  currentStep >= step.number 
                    ? 'bg-glamour-gold text-white' 
                    : 'bg-white text-gray-400 border-2 border-gray-200'
                }`}>
                  {step.number}
                </div>
                <span className={`mt-2 text-sm font-medium ${
                  currentStep >= step.number ? 'text-glamour-dark' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg overflow-hidden">
          {error && (
            <div className="p-4 m-6 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="p-6 lg:p-8">
            <div className={`${currentStep === 1 ? 'block' : 'hidden'}`}>
              <PersonalInfo formData={formData} onChange={handleChange} />
            </div>

            <div className={`${currentStep === 2 ? 'block' : 'hidden'}`}>
              <ServiceSelect 
                selectedService={formData.selectedService} 
                onChange={handleServiceChange}
              />
            </div>

            <div className={`${currentStep === 3 ? 'block' : 'hidden'}`}>
              <ProfessionalSelect 
                selectedProfessional={formData.selectedProfessional} 
                onChange={handleChange} 
              />
            </div>

            <div className={`${currentStep === 4 ? 'block' : 'hidden'}`}>
              <DateTimeSelect 
                appointmentDate={formData.appointmentDate}
                appointmentTime={formData.appointmentTime}
                onChange={handleChange}
              />
            </div>

            {currentStep === 4 && (
              <div className="mt-8 space-y-4">
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
            )}
          </div>

          <div className="px-6 lg:px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
            <button
              type="button"
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              className={`px-6 py-2 border border-glamour-gold text-glamour-gold rounded-lg hover:bg-glamour-light transition-colors ${
                currentStep === 1 ? 'invisible' : ''
              }`}
            >
              Previous
            </button>
            
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))}
                className="px-6 py-2 bg-glamour-gold text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 bg-glamour-gold text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <span className="flex items-center">
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
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;