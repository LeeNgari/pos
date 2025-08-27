import React from 'react';
import { Product, StoreType } from '../../types';

interface StoreTabsProps {
  activeStoreTab: StoreType;
  setActiveStoreTab: (tab: StoreType) => void;
  storeTypes: { type: StoreType; label: string; icon: string }[];
  products: Product[];
}

export const StoreTabs: React.FC<StoreTabsProps> = ({
  activeStoreTab,
  setActiveStoreTab,
  storeTypes,
  products,
}) => {
  return (
    <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200">
      {/* Desktop store tabs */}
      <div className="hidden md:flex flex-wrap gap-2 mb-6">
        {storeTypes.map((store) => (
          <button
            key={store.type}
            onClick={() => {
              setActiveStoreTab(store.type);
            }}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
              activeStoreTab === store.type
                ? 'bg-[#5771FF] text-white shadow-md'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50 border border-gray-200'
            }`}
          >
            <span className="text-lg">{store.icon}</span>
            <span>{store.label}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              activeStoreTab === store.type
                ? 'bg-white/20 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {products.filter(p => p.storeType === store.type).length}
            </span>
          </button>
        ))}
      </div>

      {/* Mobile store dropdown */}
      <div className="md:hidden mb-6">
        <select
          value={activeStoreTab}
          onChange={(e) => {
            setActiveStoreTab(e.target.value as StoreType);
          }}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
        >
          {storeTypes.map((store) => (
            <option key={store.type} value={store.type}>
              {store.icon} {store.label} ({products.filter(p => p.storeType === store.type).length})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
