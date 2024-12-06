import React, { useState } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { resetStats, updateStatsFromBookings } from '../../utils/statsManager';

const StatsResetButton: React.FC = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = () => {
    resetStats();
    updateStatsFromBookings();
    setShowConfirm(false);
    window.location.reload();
  };

  if (showConfirm) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md mx-4">
          <div className="flex items-start mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Reset Dashboard Stats</h3>
              <p className="text-gray-600 mt-1">
                This will reset all dashboard statistics. The action cannot be undone. New stats will be calculated from existing appointments.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setShowConfirm(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Reset Stats
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="flex items-center px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
    >
      <RefreshCw className="w-4 h-4 mr-2" />
      Reset Stats
    </button>
  );
};

export default StatsResetButton;