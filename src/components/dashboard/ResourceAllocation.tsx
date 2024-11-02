import React from 'react';

const ResourceAllocation: React.FC = () => {
  return (
    <div className="p-6">
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">Styling Stations</h3>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">6/8 in use</span>
            <div className="w-2/3 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-glamour-gold rounded-full" />
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">Treatment Rooms</h3>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">2/3 in use</span>
            <div className="w-2/3 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-glamour-gold rounded-full" />
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">Waiting Area</h3>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">4/10 seats occupied</span>
            <div className="w-2/3 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="w-2/5 h-full bg-glamour-gold rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceAllocation;