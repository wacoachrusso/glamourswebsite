import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, AlertCircle } from 'lucide-react';
import { sendConfirmationAndStylistEmails } from '../services/emailService'; // Updated import
import PersonalInfo from './booking/PersonalInfo';
import ServiceSelect from './booking/ServiceSelect';
import ProfessionalSelect from './booking/ProfessionalSelect';
import DateTimeSelect from './booking/DateTimeSelect';
import BookingConfirmation from './booking/BookingConfirmation';
import { services } from '../data/services';

const Booking: FC = () => {
  const navigate = useNavigate();
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
  const [currentStep, setCurrentStep] = useState(1);

  // Get selected service details
  const selectedService = services.find(s => s.id === formData.selectedService);

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

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.clientName?.trim()) {
          setError('Please enter your name');
          return false;
        }
        if (!formData.clientEmail?.trim()) {
          setError('Please enter your email address');
          return false;
        }
        if (!validateEmail(formData.clientEmail)) {
          setError('Please enter a valid email address');
          return false;
        }
        if (formData.clientPhone && !validatePhone(formData.clientPhone)) {
          setError('Please enter a valid 10-digit phone number');
          return false;
        }
        if (formData.clientPhone && !formData.carrier) {
          setError('Please select your mobile carrier for SMS notifications');
          return false;
        }
        break;
      case 2:
        if (!formData.selectedService) {
          setError('Please select a service');
          return false;
        }
        break;
      case 4:
        if (!formData.appointmentDate || !formData.appointmentTime) {
          setError('Please select appointment date and time');
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      setError('');
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    setError('');
  };

  const handleSubmit = async () => {
    setError('');

    try {
      if (!selectedService) {
        throw new Error('Selected service not found');
      }

      await sendConfirmationAndStylistEmails({
        to_name: formData.clientName.trim(),
        to_email: formData.clientEmail.trim(),
        service_name: selectedService.name,
        stylist_name: formData.selectedProfessional || '',
        stylist_email: formData.selectedProfessional ? formData.clientEmail.trim() : '', // Assuming professional's email is stored in formData
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
        service: selectedService,
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

      // Navigate to home page with success state
      navigate('/', { 
        state: { bookingSuccess: true },
        replace: true 
      });

    } catch (err: any) {
      setError(err.message || 'Failed to book appointment. Please try again.');
      console.error('Booking error:', err);
    }
  };

  const steps = [
    { number: 1, title: 'Personal Information' },
    { number: 2, title: 'Select Service' },
    { number: 3, title: 'Choose Stylist' },
    { number: 4, title: 'Date & Time' },
    { number: 5, title: 'Confirm Booking' }
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
          <p className="text-gray-600">Redirecting you to the home page...</p>
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

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {error && (
            <div className="p-4 m-6 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="p-6 lg:p-8">
            {currentStep === 1 && (
              <PersonalInfo formData={formData} onChange={handleChange} />
            )}

            {currentStep === 2 && (
              <ServiceSelect 
                selectedService={formData.selectedService} 
                onChange={handleServiceChange}
              />
            )}

            {currentStep === 3 && (
              <ProfessionalSelect 
                selectedProfessional={formData.selectedProfessional} 
                onChange={handleChange} 
              />
            )}

            {currentStep === 4 && (
              <DateTimeSelect 
                appointmentDate={formData.appointmentDate}
                appointmentTime={formData.appointmentTime}
                serviceDuration={selectedService ? parseInt(selectedService.duration) : 60}
                selectedProfessional={formData.selectedProfessional}
                onChange={handleChange}
              />
            )}

            {currentStep === 5 && (
              <BookingConfirmation
                formData={formData}
                selectedServiceDetails={selectedService}
                onEdit={setCurrentStep}
                onConfirm={handleSubmit}
              />
            )}

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

          {currentStep < 5 && (
            <div className="px-6 lg:px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
              <button
                type="button"
                onClick={handleBack}
                className={`px-6 py-2 border border-glamour-gold text-glamour-gold rounded-lg hover:bg-glamour-light transition-colors ${
                  currentStep === 1 ? 'invisible' : ''
                }`}
              >
                Previous
              </button>
              
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-glamour-gold text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
