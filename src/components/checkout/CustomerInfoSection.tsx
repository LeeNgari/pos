import React from 'react';

interface CustomerInfoSectionProps {
  customerInfo: {
    name?: string;
    phone?: string;
    tableNumber?: string;
    roomNumber?: string;
  };
}

export const CustomerInfoSection: React.FC<CustomerInfoSectionProps> = ({
  customerInfo,
}) => {
  if (!customerInfo.name && !customerInfo.phone && !customerInfo.tableNumber && !customerInfo.roomNumber) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Information</h2>
      <div className="grid grid-cols-2 gap-4">
        {customerInfo.name && (
          <div>
            <p className="text-gray-600 text-sm">Name</p>
            <p className="text-gray-900 font-medium">{customerInfo.name}</p>
          </div>
        )}
        {customerInfo.phone && (
          <div>
            <p className="text-gray-600 text-sm">Phone</p>
            <p className="text-gray-900 font-medium">{customerInfo.phone}</p>
          </div>
        )}
        {customerInfo.tableNumber && (
          <div>
            <p className="text-gray-600 text-sm">Table Number</p>
            <p className="text-gray-900 font-medium">{customerInfo.tableNumber}</p>
          </div>
        )}
        {customerInfo.roomNumber && (
          <div>
            <p className="text-gray-600 text-sm">Room Number</p>
            <p className="text-gray-900 font-medium">{customerInfo.roomNumber}</p>
          </div>
        )}
      </div>
    </div>
  );
};
