import { useState } from 'react';
import { sendConfirmationEmail } from '../services/emailService';

const Booking = () => {
  // Define state variables for booking details
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [clientNotes, setClientNotes] = useState('');

  // Static values for the salon information
  const salonPhone = '(973) 344-5199';
  const salonAddress = '275 Adams St, Newark, NJ 07105';

  // Booking Submit Handler
  const handleBookingSubmit = async () => {
    const templateParams = {
      to_name: clientName,
      to_email: clientEmail,
      service_name: selectedService,
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
      notes: clientNotes,
      salon_phone: salonPhone,
      salon_address: salonAddress,
    };

    try {
      // Send the confirmation email after booking
      await sendConfirmationEmail(templateParams);
      alert('Confirmation email sent successfully!');
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
      alert('Failed to send confirmation email. Check console for details.');
    }
  };

  return (
    <div>
      <h2>Schedule Your Appointment</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleBookingSubmit(); }}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email Address:</label>
          <input
            type="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Service:</label>
          <input
            type="text"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Appointment Date:</label>
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Appointment Time:</label>
          <input
            type="time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Notes:</label>
          <textarea
            value={clientNotes}
            onChange={(e) => setClientNotes(e.target.value)}
          />
        </div>
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default Booking;
