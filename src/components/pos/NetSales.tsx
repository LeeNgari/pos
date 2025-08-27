import React, { useState } from 'react';
import { Calendar, DollarSign, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function NetSales() {
  const { state } = useApp();
  const { user } = state.auth;
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Filter data by selected date and user's store (if not admin)
  const filterByDateAndStore = (items: any[], dateField: string) => {
    return items.filter(item => {
      // Add a check here
      if (!item[dateField]) {
        return false; // Skip items without a valid date field
      }
      const itemDate = new Date(item[dateField]).toISOString().split('T')[0];
      const matchesDate = itemDate === selectedDate;
      const matchesStore = user?.role === 'admin' || item.storeType === user?.storeType || 
                          (item.items && item.items.some((orderItem: any) => orderItem.product.storeType === user?.storeType));
      return matchesDate && matchesStore;
    });
  };

  // Calculate gross sales from completed orders
  const completedOrders = state.orders.filter(order => order.status === 'completed');
  const dailyOrders = filterByDateAndStore(completedOrders, 'completedAt');
  
  const grossSales = dailyOrders.reduce((total, order) => {
    if (user?.role === 'admin') {
      return total + order.total;
    } else {
      // For staff, only count items from their store
      const storeItems = order.items.filter((item: any) => item.product.storeType === user?.storeType);
      const storeTotal = storeItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
      return total + storeTotal;
    }
  }, 0);

  // Calculate expenses
  const dailyExpenses = filterByDateAndStore(state.expenses, 'createdAt');
  const totalExpenses = dailyExpenses.reduce((total, expense) => total + expense.amount, 0);

  // Calculate net sales
  const netSales = grossSales - totalExpenses;

  // Get store type for display
  const getStoreDisplay = () => {
    if (user?.role === 'admin') {
      return 'All Stores';
    }
    return user?.storeType?.charAt(0).toUpperCase() + user?.storeType?.slice(1) || 'Store';
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-2 md:space-x-3">
          <div>
            <h2 className="text-lg md:text-2xl font-bold text-gray-900">Net Sales Report</h2>
            <p className="text-gray-600 text-sm md:text-base">{getStoreDisplay()}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Calendar className="w-5 h-5 text-gray-400" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="flex-1 sm:flex-none px-3 md:px-4 py-2 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Gross Sales */}
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs md:text-sm">Gross Sales</p>
              <p className="text-lg md:text-2xl font-bold text-green-600">KES {grossSales.toLocaleString()}</p>
              <p className="text-gray-500 text-xs mt-1">{dailyOrders.length} orders</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs md:text-sm">Total Expenses</p>
              <p className="text-lg md:text-2xl font-bold text-red-600">KES {totalExpenses.toLocaleString()}</p>
              <p className="text-gray-500 text-xs mt-1">{dailyExpenses.length} expenses</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-red-50 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
            </div>
          </div>
        </div>

        {/* Net Sales */}
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs md:text-sm">Net Sales</p>
              <p className={`text-lg md:text-2xl font-bold ${netSales >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                KES {netSales.toLocaleString()}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {netSales >= 0 ? 'Profit' : 'Loss'}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              netSales >= 0 ? 'bg-blue-50' : 'bg-red-50'
            }`}>
              <DollarSign className={`w-5 h-5 md:w-6 md:h-6 ${netSales >= 0 ? 'text-blue-600' : 'text-red-600'}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Sales Breakdown */}
        <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-900">Sales Breakdown</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          
          {dailyOrders.length > 0 ? (
            <div className="space-y-3">
              {dailyOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-gray-900 font-medium">Order #{order.id}</p>
                    <p className="text-gray-600 text-sm">
                      {new Date(order.completedAt || order.createdAt).toLocaleTimeString()}
                    </p>
                    {order.customerName && (
                      <p className="text-gray-500 text-xs">{order.customerName}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 font-semibold">
                      KES {user?.role === 'admin' ? order.total.toLocaleString() : 
                        order.items.filter((item: any) => item.product.storeType === user?.storeType)
                          .reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              {dailyOrders.length > 5 && (
                <p className="text-gray-500 text-sm text-center">
                  +{dailyOrders.length - 5} more orders
                </p>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No sales recorded for this date</p>
            </div>
          )}
        </div>

        {/* Expenses Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Expenses Breakdown</h3>
            <TrendingDown className="w-5 h-5 text-gray-400" />
          </div>
          
          {dailyExpenses.length > 0 ? (
            <div className="space-y-3">
              {dailyExpenses.slice(0, 5).map((expense) => (
                <div key={expense.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-gray-900 font-medium">{expense.name}</p>
                    <p className="text-gray-600 text-sm">
                      {new Date(expense.createdAt).toLocaleTimeString()}
                    </p>
                    <p className="text-gray-500 text-xs">By: {expense.createdBy}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-red-600 font-semibold">KES {expense.amount.toLocaleString()}</p>
                  </div>
                </div>
              ))}
              {dailyExpenses.length > 5 && (
                <p className="text-gray-500 text-sm text-center">
                  +{dailyExpenses.length - 5} more expenses
                </p>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <TrendingDown className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No expenses recorded for this date</p>
            </div>
          )}
        </div>
      </div>

      {/* Summary Footer */}
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Daily Summary for {new Date(selectedDate).toLocaleDateString()}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-blue-700">Gross Sales</p>
              <p className="text-xl font-bold text-blue-900">KES {grossSales.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-blue-700">Less: Expenses</p>
              <p className="text-xl font-bold text-blue-900">KES {totalExpenses.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-blue-700">Net Sales</p>
              <p className={`text-xl font-bold ${netSales >= 0 ? 'text-blue-900' : 'text-red-600'}`}>
                KES {netSales.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}