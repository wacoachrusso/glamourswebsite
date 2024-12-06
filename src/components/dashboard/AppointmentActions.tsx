import React, { useState } from 'react';
import { MessageSquare, Trash2, X, Check } from 'lucide-react';

interface AppointmentActionsProps {
  appointmentId: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  status: string;
  onStatusChange: (id: number, status: string) => void;
  onDelete: (id: number) => void;
  onMessage: (recipient: { name: string; email: string; phone: string }) => void;
}

const AppointmentActions: React.FC<AppointmentActionsProps> = ({
  appointmentId,
  clientName,
  clientEmail,
  clientPhone,
  status,
  onStatusChange,
  onDelete,
  onMessage
}) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleDelete = () => {
    if (showConfirmDelete) {
      onDelete(appointmentId);
    } else {
      setShowConfirmDelete(true);
    }
  };

  return (
    <div className="mt-4 flex items-center gap-2">
      <select
        value={status}
        onChange={(e) => onStatusChange(appointmentId, e.target.value)}
        className="px-3 py-1 text-sm border rounded-lg focus:ring-2 focus:ring-glamour-gold/50 focus:border-glamour-gold"
      >
        <option value="PENDING">Pending</option>
        <option value="CONFIRMED">Confirm</option>
        <option value="CANCELLED">Cancel</option>
        <option value="COMPLETED">Complete</option>
      </select>

      <button
        onClick={() => onMessage({ name: clientName, email: clientEmail, phone: clientPhone })}
        className="flex items-center px-3 py-1 text-sm bg-glamour-gold text-white rounded-lg hover:bg-opacity-90 transition-colors"
      >
        <MessageSquare className="w-4 h-4 mr-1" />
        Message
      </button>

      {showConfirmDelete ? (
        <div className="flex items-center gap-2">
          <button
            onClick={handleDelete}
            className="flex items-center px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            <Check className="w-4 h-4 mr-1" />
            Confirm
          </button>
          <button
            onClick={() => setShowConfirmDelete(false)}
            className="flex items-center px-3 py-1 text-sm bg-gray-500 text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            <X className="w-4 h-4 mr-1" />
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={handleDelete}
          className="flex items-center px-3 py-1 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Delete
        </button>
      )}
    </div>
  );
};

export default AppointmentActions;