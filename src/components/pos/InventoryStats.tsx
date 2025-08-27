import React from 'react';
import { Package, AlertTriangle } from 'lucide-react';

interface InventoryStatsProps {
  totalProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
}

export const InventoryStats: React.FC<InventoryStatsProps> = ({
  totalProducts,
  lowStockProducts,
  outOfStockProducts,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-xs md:text-sm">Total Products</p>
            <p className="text-lg md:text-2xl font-bold text-gray-900">{totalProducts}</p>
          </div>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-xl flex items-center justify-center">
            <Package className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-xs md:text-sm">Low Stock</p>
            <p className="text-lg md:text-2xl font-bold text-yellow-600">{lowStockProducts}</p>
          </div>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-xs md:text-sm">Out of Stock</p>
            <p className="text-lg md:text-2xl font-bold text-red-600">{outOfStockProducts}</p>
          </div>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-red-50 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
          </div>
        </div>
      </div>
    </div>
  );
};
