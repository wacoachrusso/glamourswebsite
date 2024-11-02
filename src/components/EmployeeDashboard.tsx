import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, DollarSign, Clock, AlertCircle } from 'lucide-react';
import { getAppointments, updateAppointmentStatus } from '../services/api';

interface Appointment {
  id: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: number;
  service: {
    name: string;
    price: number;
    duration: number;
  };
  date: string;
  time: string;
  status: string;
  notes?: string;
}

const EmployeeDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (err) {
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      await updateAppointmentStatus(id, status);
      setAppointments(prevAppointments =>
        prevAppointments.map(appointment =>
          appointment.id === id ? { ...appointment, status } : appointment
        )
      );
    } catch (err) {
      setError('Failed to update appointment status');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/employee-login');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED': return 'text-green-600';
      case 'CANCELLED': return 'text-red-600';
      case 'COMPLETED': return 'text-blue-600';
      default: return 'text-yellow-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-glamour-gold"></div>
      </div>
    );
  }

  const todayAppointments = appointments.filter(a => 
    new Date(a.date).toDateString() === new Date().toDateString()
  );

  const totalRevenue = todayAppointments.reduce((sum, a) => sum + a.service.price, 0);
  const totalHours = Math.round(todayAppointments.reduce((sum, a) => sum + a.service.duration, 0) / 60);
  const uniqueClients = new Set(appointments.map(a => a.clientEmail)).size;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-glamour-dark">Employee Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-glamour-gold rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Calendar className="w-8 h-8 text-glamour-gold mr-3" />
              <h3 className="text-lg font-semibold">Today's Appointments</h3>
            </div>
            <p className="text-2xl font-bold">{todayAppointments.length}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Users className="w-8 h-8 text-glamour-gold mr-3" />
              <h3 className="text-lg font-semibold">Total Clients</h3>
            </div>
            <p className="text-2xl font-bold">{uniqueClients}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <DollarSign className="w-8 h-8 text-glamour-gold mr-3" />
              <h3 className="text-lg font-semibold">Revenue (Today)</h3>
            </div>
            <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Clock className="w-8 h-8 text-glamour-gold mr-3" />
              <h3 className="text-lg font-semibold">Hours Booked</h3>
            </div>
            <p className="text-2xl font-bold">{totalHours}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No appointments found
                    </td>
                  </tr>
                ) : (
                  appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{appointment.clientName}</div>
                          <div className="text-sm text-gray-500">{appointment.clientEmail}</div>
                          <div className="text-sm text-gray-500">{appointment.clientPhone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{appointment.service.name}</div>
                          <div className="text-sm text-gray-500">${appointment.service.price}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">
                            {new Date(appointment.date).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-500">{appointment.time}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-sm font-semibold rounded-full ${getStatusColor(appointment.status)} bg-opacity-10`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={appointment.status}
                          onChange={(e) => handleStatusUpdate(appointment.id, e.target.value)}
                          className="text-sm border rounded-md px-2 py-1"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="CONFIRMED">Confirm</option>
                          <option value="CANCELLED">Cancel</option>
                          <option value="COMPLETED">Complete</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;