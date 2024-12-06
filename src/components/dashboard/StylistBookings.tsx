import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, MessageSquare } from 'lucide-react';
import AppointmentActions from './AppointmentActions';
import MessageModal from './MessageModal';
import { sendConfirmationAndStylistEmails } from '../../services/emailService';

interface StylistBooking {
  id: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  service: {
    name: string;
    price: string;
    duration: string;
  };
  appointmentDate: string;
  appointmentTime: string;
  notes: string;
  status: string;
}

interface StylistBookingsProps {
  stylistName: string;
}

const StylistBookings: React.FC<StylistBookingsProps> = ({ stylistName }) => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [messageRecipient, setMessageRecipient] = useState<{
    name: string;
    email: string;
    phone: string;
  } | null>(null);

  const getBookings = (): StylistBooking[] => {
    const allBookings = JSON.parse(localStorage.getItem('appointments') || '[]');
    return allBookings.filter((booking: any) => 
      booking.selectedProfessional === stylistName
    );
  };

  const bookings = getBookings();

  const handleStatusChange = (id: number, newStatus: string) => {
    const allBookings = JSON.parse(localStorage.getItem('appointments') || '[]');
    const updatedBookings = allBookings.map((booking: any) =>
      booking.id === id ? { ...booking, status: newStatus } : booking
    );
    localStorage.setItem('appointments', JSON.stringify(updatedBookings));
    window.location.reload(); // Refresh to show updated status
  };

  const handleDelete = (id: number) => {
    const allBookings = JSON.parse(localStorage.getItem('appointments') || '[]');
    const updatedBookings = allBookings.filter((booking: any) => booking.id !== id);
    localStorage.setItem('appointments', JSON.stringify(updatedBookings));
    window.location.reload(); // Refresh to show updated list
  };

  const handleMessage = async (message: string) => {
    if (!messageRecipient) return;

    try {
      await sendConfirmationAndStylistEmails({
        to_name: messageRecipient.name,
        to_email: messageRecipient.email,
        service_name: '',
        stylist_name: stylistName,
        appointment_date: '',
        appointment_time: '',
        phone_number: messageRecipient.phone,
        notes: message,
        salon_phone: '(973) 344-5199',
        salon_address: '275 Adams St, Newark, NJ 07105'
      });
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status.toUpperCase()) {
      case 'CONFIRMED': return 'text-green-600 bg-green-50';
      case 'PENDING': return 'text-yellow-600 bg-yellow-50';
      case 'CANCELLED': return 'text-red-600 bg-red-50';
      case 'COMPLETED': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return dateStr;
    }
  };

  const formatTime = (timeStr: string) => {
    try {
      const [hours, minutes] = timeStr.split(':');
      const date = new Date();
      date.setHours(parseInt(hours, 10));
      date.setMinutes(parseInt(minutes, 10));
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      return timeStr;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-glamour-dark">
          Bookings for {stylistName}
        </h2>
        <div className="flex gap-4">
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as 'day' | 'week' | 'month')}
            className="px-3 py-1 border rounded-lg focus:ring-2 focus:ring-glamour-gold/50 focus:border-glamour-gold"
          >
            <option value="day">Day View</option>
            <option value="week">Week View</option>
            <option value="month">Month View</option>
          </select>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-1 border rounded-lg focus:ring-2 focus:ring-glamour-gold/50 focus:border-glamour-gold"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Total Bookings</p>
              <p className="text-2xl font-semibold">{bookings.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Today's Bookings</p>
              <p className="text-2xl font-semibold">
                {bookings.filter(b => b.appointmentDate === new Date().toISOString().split('T')[0]).length}
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y">
          {bookings.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No bookings found for this stylist
            </div>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{booking.clientName}</h3>
                    <p className="text-sm text-gray-600">{booking.service.name}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(booking.appointmentDate)}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    {formatTime(booking.appointmentTime)}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {booking.clientEmail}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {booking.clientPhone}
                  </div>
                </div>

                {booking.notes && (
                  <div className="mt-3 flex items-start text-sm text-gray-600">
                    <MessageSquare className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                    <p>{booking.notes}</p>
                  </div>
                )}

                <AppointmentActions
                  appointmentId={booking.id}
                  clientName={booking.clientName}
                  clientEmail={booking.clientEmail}
                  clientPhone={booking.clientPhone}
                  status={booking.status}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                  onMessage={setMessageRecipient}
                />
              </div>
            ))
          )}
        </div>
      </div>

      {messageRecipient && (
        <MessageModal
          recipient={messageRecipient}
          onClose={() => setMessageRecipient(null)}
          onSend={handleMessage}
        />
      )}
    </div>
  );
};

export default StylistBookings;