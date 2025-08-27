import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { ProductManagement } from './ProductManagement';
import { UserManagement } from './UserManagement';
import { OrderHistory } from './OrderHistory';
import { AdminPurchaseOrders } from './PurchaseOrders';
import { NetSales } from '../../components/pos/NetSales';
import { Package, Users, ClipboardList,  ShoppingCart, TrendingUp } from 'lucide-react';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');

  const tabs = [
    { id: 'products', label: 'Products', icon: Package },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'orders', label: 'Orders', icon: ClipboardList },
    { id: 'purchase-orders', label: 'Purchase Orders', icon: ShoppingCart },
    { id: 'net-sales', label: 'Net Sales', icon: TrendingUp },
  ];

  return (
      <div className="space-y-6">
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

        <div className="min-h-[600px]">
          {activeTab === 'products' && <ProductManagement />}
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'orders' && <OrderHistory />}
          {activeTab === 'purchase-orders' && <AdminPurchaseOrders />}
          {activeTab === 'net-sales' && <NetSales />}
        </div>
      </div>
  );
}