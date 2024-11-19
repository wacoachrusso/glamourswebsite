import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Mail, Phone, Scissors, AlertCircle, Users } from 'lucide-react';
import { bookAppointment, getServices, getProfessionals } from '../services/api';
import { sendBookingConfirmation } from '../services/emailService';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
}

interface Professional {
  id: number;
  name: string;
  role: string;
  specialties: string[];
  experience: number;
}

const Booking: React.FC = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    serviceId: '',
    professionalId: 'any',
    date: '',
    time: '',
    notes: ''
  });

  const [services, setServices] = useState<Service[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [servicesLoading, setServicesLoading] = useState(true);
  const [professionalsLoading, setProfessionalsLoading] = useState(true);
  const [emailSending, setEmailSending] = useState(false);

  useEffect(() => {
    loadServices();
    loadProfessionals();
  }, []);

  const loadServices = async () => {
    try {
      const servicesData = await getServices();
      setServices(servicesData);
      setServicesLoading(false);
    } catch (err: any) {
      setError('Failed to load services. Please refresh the page.');
      setServicesLoading(false);
    }
  };

  const loadProfessionals = async () => {
    try {
      const professionalsData = await getProfessionals();
      setProfessionals(professionalsData);
      setProfessionalsLoading(false);
    } catch (err: any) {
      setError('Failed to load professionals. Please refresh the page.');
      setProfessionalsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setEmailSending(true);

    try {
      const selectedService = services.find(s => s.id === parseInt(formData.serviceId));
      if (!selectedService) {
        throw new Error('Please select a valid service');
      }

      const selectedProfessional = formData.professionalId === 'any' 
        ? null 
        : professionals.find(p => p.id === parseInt(formData.professionalId));

      // Book the appointment
      await bookAppointment({
        ...formData,
        serviceId: parseInt(formData.serviceId),
        service: selectedService,
        professional: selectedProfessional,
        professionalId: formData.professionalId === 'any' ? null : parseInt(formData.professionalId)
      });

      // Send confirmation email
      await sendBookingConfirmation({
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        serviceName: selectedService.name,
        date: formData.date,
        time: formData.time,
        notes: formData.notes
      });

      setSuccess('Appointment booked successfully! Check your email for confirmation details.');
      setFormData({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        serviceId: '',
        professionalId: 'any',
        date: '',
        time: '',
        notes: ''
      });
    } catch (err: any) {
      setError(err.message || 'Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
      setEmailSending(false);
    }
  };

  if (servicesLoading || professionalsLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-glamour-gold"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-glamour-dark mb-4">Schedule Your Appointment</h1>
          <p className="text-xl text-gray-600">Book your visit with our expert stylists</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
            {success}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-glamour p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="clientName" className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                  <User className="w-4 h-4 mr-2 text-glamour-gold" />
                  Full Name
                </label>
                <input
                  type="text"
                  id="clientName"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamour-gold/50 focus:border-glamour-gold transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="clientEmail" className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                  <Mail className="w-4 h-4 mr-2 text-glamour-gold" />
                  Email Address
                </label>
                <input
                  type="email"
                  id="clientEmail"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamour-gold/50 focus:border-glamour-gold transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="clientPhone" className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                  <Phone className="w-4 h-4 mr-2 text-glamour-gold" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="clientPhone"
                  name="clientPhone"
                  value={formData.clientPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamour-gold/50 focus:border-glamour-gold transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="serviceId" className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                  <Scissors className="w-4 h-4 mr-2 text-glamour-gold" />
                  Select Service
                </label>
                <select
                  id="serviceId"
                  name="serviceId"
                  value={formData.serviceId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamour-gold/50 focus:border-glamour-gold transition-colors"
                  required
                >
                  <option value="">Choose a service...</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} (${service.price} - {service.duration} min)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="professionalId" className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                  <Users className="w-4 h-4 mr-2 text-glamour-gold" />
                  Select Professional
                </label>
                <select
                  id="professionalId"
                  name="professionalId"
                  value={formData.professionalId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamour-gold/50 focus:border-glamour-gold transition-colors"
                  required
                >
                  <option value="any">Any Available Professional</option>
                  {professionals.map((professional) => (
                    <option key={professional.id} value={professional.id}>
                      {professional.name} - {professional.role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="date" className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                  <Calendar className="w-4 h-4 mr-2 text-glamour-gold" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamour-gold/50 focus:border-glamour-gold transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="time" className="flex items-center text-gray-700 text-sm font-semibold mb-2">
                  <Clock className="w-4 h-4 mr-2 text-glamour-gold" />
                  Preferred Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  min="10:00"
                  max="19:00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamour-gold/50 focus:border-glamour-gold transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="block text-gray-700 text-sm font-semibold mb-2">
                Special Requests or Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamour-gold/50 focus:border-glamour-gold transition-colors"
                placeholder="Tell us about any specific preferences or requirements..."
              />
            </div>

            <div className="flex flex-col items-center space-y-4">
              <button
                type="submit"
                disabled={loading || emailSending}
                className={`px-8 py-3 bg-glamour-gold text-white rounded-full font-semibold hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300 ${
                  (loading || emailSending) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading || emailSending ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {emailSending ? 'Sending confirmation...' : 'Booking...'}
                  </span>
                ) : (
                  'Confirm Booking'
                )}
              </button>
              <p className="text-sm text-gray-600">
                By booking, you agree to our cancellation and rescheduling policies.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;