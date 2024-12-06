import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Mail, Phone, MessageSquare, Filter, Search } from 'lucide-react';
import AppointmentActions from './AppointmentActions';
import MessageModal from './MessageModal';
import { sendConfirmationAndStylistEmails } from '../../services/emailService';
import { AppointmentData } from '../../types/appointment';
import { updateAppointmentStatus, updateStatsFromBookings } from '../../utils/statsManager';

interface StylistBookingsProps {
  stylistName: string;
}

const StylistBookings: React.FC<StylistBookingsProps> = ({ stylistName }) => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [messageRecipient, setMessageRecipient] = useState<{
    name: string;
    email: string;
    phone: string;
  } | null>(null);

  const getBookings = (): AppointmentData[] => {
    const allBookings = JSON.parse(localStorage.getItem('appointments') || '[]');
    return allBookings.filter((booking: AppointmentData) => 
      booking.selectedProfessional === stylistName &&
      (statusFilter === 'all' || booking.status === statusFilter) &&
      (searchTerm === '' || 
        booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.clientPhone.includes(searchTerm)
      )
    );
  };

  const bookings = getBookings();

  const handleStatusChange = (id: number, newStatus: string) => {
    const allBookings = JSON.parse(localStorage.getItem('appointments') || '[]');
    const updatedBookings = allBookings.map((booking: AppointmentData) =>
      booking.id === id ? { ...booking, status: newStatus } : booking
    );
    localStorage.setItem('appointments', JSON.stringify(updatedBookings));
    
    // Update stats
    updateAppointmentStatus(id, newStatus);
    updateStatsFromBookings();
  };

  const handleDelete = (id: number) => {
    const allBookings = JSON.parse(localStorage.getItem('appointments') || '[]');
    const updatedBookings = allBookings.filter((booking: AppointmentData) => booking.id !== id);
    localStorage.setItem('appointments', JSON.stringify(updatedBookings));
    updateStatsFromBookings();
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
      setMessageRecipient(null);
    } catch (error) {
      console.error('Failed to send message:', error);
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

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeStr: string): string => {
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

  // Calculate quick stats
  const todayBookings = bookings.filter(b => b.appointmentDate === new Date().toISOString().split('T')[0]);
  const pendingBookings = bookings.filter(b => b.status === 'PENDING');
  const confirmedBookings = bookings.filter(b => b.status === 'CONFIRMED');
  const completedBookings = bookings.filter(b => b.status === 'COMPLETED');

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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-600">Today's Bookings</h3>
          <p className="text-2xl font-semibold mt-1">{todayBookings.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-600">Pending</h3>
          <p className="text-2xl font-semibold mt-1 text-yellow-600">{pendingBookings.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-600">Confirmed</h3>
          <p className="text-2xl font-semibold mt-1 text-green-600">{confirmedBookings.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-600">Completed</h3>
          <p className="text-2xl font-semibold mt-1 text-blue-600">{completedBookings.length}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-glamour-gold/50 focus:border-glamour-gold"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-glamour-gold/50 focus:border-glamour-gold appearance-none bg-white"
          >
            <option value="all">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="divide-y">
          {bookings.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No bookings found
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