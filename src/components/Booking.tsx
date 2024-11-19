import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { sendConfirmationEmail } from '../services/emailService';
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

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate form
      if (!formData.clientName || !formData.clientEmail || !formData.selectedService || 
          !formData.selectedProfessional || !formData.appointmentDate || !formData.appointmentTime) {
        throw new Error('Please fill in all required fields');
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.clientEmail)) {
        throw new Error('Please enter a valid email address');
      }

      // Phone validation (optional field)
      if (formData.clientPhone) {
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!phoneRegex.test(formData.clientPhone)) {
          throw new Error('Please enter a valid phone number');
        }
      }

      // Send confirmation email
      await sendConfirmationEmail({
        to_name: formData.clientName,
        to_email: formData.clientEmail,
        service_name: formData.selectedService,
        stylist_name: formData.selectedProfessional,
        appointment_date: new Date(formData.appointmentDate).toLocaleDateString(),
        appointment_time: formData.appointmentTime,
        phone_number: formData.clientPhone || 'Not provided',
        notes: formData.notes || 'No additional notes',
        salon_phone: '(973) 344-5199',
        salon_address: '275 Adams St, Newark, NJ 07105'
      });
      
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
    } catch (err: any) {
      console.error('Booking error:', err);
      setError(err.message || 'Failed to book appointment');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-glamour-dark mb-4">Book Your Appointment</h1>
          <p className="text-lg text-gray-600">
            Schedule your visit with our expert stylists
          </p>
        </div>

        {success ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-green-700 mb-2">Booking Confirmed!</h2>
            <p className="text-green-600 mb-6">
              Thank you for choosing Glamour's Beauty Salon. We've sent a confirmation email to {formData.clientEmail}.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Book Another Appointment
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-12 bg-white rounded-xl shadow-glamour p-8">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            <PersonalInfo formData={formData} onChange={handleChange} />
            <ServiceSelect selectedService={formData.selectedService} onChange={handleChange} />
            <ProfessionalSelect selectedProfessional={formData.selectedProfessional} onChange={handleChange} />
            <DateTimeSelect
              appointmentDate={formData.appointmentDate}
              appointmentTime={formData.appointmentTime}
              onChange={handleChange}
            />

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-glamour-dark flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Additional Notes
              </h2>
              
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
              className={`w-full py-4 bg-glamour-gold text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
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
        )}
      </div>
    </div>
  );
};

export default Booking;