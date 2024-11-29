import React from 'react';
import { Clock, Calendar, User, Mail, Phone, Scissors } from 'lucide-react';

interface BookingConfirmationProps {
  formData: {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    carrier: string;
    selectedService: string;
    selectedProfessional: string;
    appointmentDate: string;
    appointmentTime: string;
    notes: string;
  };
  selectedServiceDetails: {
    name: string;
    price: string;
    duration: string;
  } | undefined;
  onEdit: (step: number) => void;
  onConfirm: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  formData,
  selectedServiceDetails,
  onEdit,
  onConfirm,
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-glamour-dark mb-2">Review Your Booking</h2>
        <p className="text-gray-600">Please review your appointment details before confirming</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-glamour-dark">Personal Information</h3>
            <button
              onClick={() => onEdit(1)}
              className="text-sm text-glamour-gold hover:text-glamour-dark transition-colors"
            >
              Edit
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-glamour-gold" />
              <span className="text-gray-600">{formData.clientName}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-glamour-gold" />
              <span className="text-gray-600">{formData.clientEmail}</span>
            </div>
            {formData.clientPhone && (
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-glamour-gold" />
                <span className="text-gray-600">
                  {formData.clientPhone}
                  {formData.carrier && ` (${formData.carrier})`}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Service Details */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-glamour-dark">Service Details</h3>
            <button
              onClick={() => onEdit(2)}
              className="text-sm text-glamour-gold hover:text-glamour-dark transition-colors"
            >
              Edit
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <Scissors className="w-5 h-5 text-glamour-gold" />
            <div>
              <p className="text-gray-800 font-medium">{selectedServiceDetails?.name}</p>
              <p className="text-sm text-gray-600">
                ${selectedServiceDetails?.price} · {selectedServiceDetails?.duration} minutes
              </p>
            </div>
          </div>
        </div>

        {/* Stylist */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-glamour-dark">Selected Stylist</h3>
            <button
              onClick={() => onEdit(3)}
              className="text-sm text-glamour-gold hover:text-glamour-dark transition-colors"
            >
              Edit
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-glamour-gold" />
            <span className="text-gray-600">
              {formData.selectedProfessional || "No preference (Next available stylist)"}
            </span>
          </div>
        </div>

        {/* Date & Time */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-glamour-dark">Appointment Time</h3>
            <button
              onClick={() => onEdit(4)}
              className="text-sm text-glamour-gold hover:text-glamour-dark transition-colors"
            >
              Edit
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-glamour-gold" />
              <span className="text-gray-600">
                {new Date(formData.appointmentDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-glamour-gold" />
              <span className="text-gray-600">{formData.appointmentTime}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {formData.notes && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-glamour-dark">Additional Notes</h3>
            <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{formData.notes}</p>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
        <button
          onClick={() => onEdit(4)}
          className="px-6 py-2 border-2 border-glamour-gold text-glamour-gold rounded-lg hover:bg-glamour-light transition-colors"
        >
          Go Back
        </button>
        <button
          onClick={onConfirm}
          className="px-6 py-2 bg-glamour-gold text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;