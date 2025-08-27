import React from 'react';
import { Grid, Package, ClipboardList, DollarSign, TrendingUp } from 'lucide-react';

interface POSNavigationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const POSNavigationTabs: React.FC<POSNavigationTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs = [
    { id: 'pos', label: 'Point of Sale', icon: Grid },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'purchase-orders', label: 'Purchase Orders', icon: ClipboardList },
    { id: 'expenses', label: 'Expenses', icon: DollarSign },
    { id: 'net-sales', label: 'Net Sales', icon: TrendingUp },
  ];

  return (
    <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-6 shadow-sm border border-gray-200">
      {/* Desktop tabs */}
      <nav className="hidden md:flex space-x-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 font-medium ${
                activeTab === tab.id
                  ? 'bg-[#5771FF] text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
      
      {/* Mobile dropdown */}
      <div className="md:hidden">
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
        >
          {tabs.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
