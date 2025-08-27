import React, { useState } from 'react';
import { Plus, X, DollarSign, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function Expenses() {
  const { state, addExpense } = useApp();
  const { user } = state.auth;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
  });

  const userExpenses = state.expenses.filter(expense => 
    expense.storeType === user?.storeType
  );

  const totalExpenses = userExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addExpense({
      name: formData.name,
      amount: parseFloat(formData.amount),
      storeType: user?.storeType || 'hotel',
      createdBy: user?.name || 'Unknown',
    });

    setFormData({ name: '', amount: '' });
    setIsModalOpen(false);
  };

  const resetForm = () => {
    setFormData({ name: '', amount: '' });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Expenses</h2>
          <p className="text-gray-600">Track your store expenses</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#5771FF] text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 font-semibold shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Total Expenses Card */}
      <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-xs md:text-sm">Total Expenses</p>
            <p className="text-xl md:text-3xl font-bold text-gray-900">KES {totalExpenses.toLocaleString()}</p>
          </div>
          <div className="w-12 h-12 md:w-16 md:h-16 bg-red-50 rounded-xl flex items-center justify-center">
            <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Expenses List */}
      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {userExpenses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 md:py-4 px-4 md:px-6 text-gray-900 font-semibold text-sm md:text-base">Expense Name</th>
                  <th className="text-left py-3 md:py-4 px-4 md:px-6 text-gray-900 font-semibold text-sm md:text-base">Amount</th>
                  <th className="text-left py-3 md:py-4 px-4 md:px-6 text-gray-900 font-semibold text-sm md:text-base hidden sm:table-cell">Date</th>
                  <th className="text-left py-3 md:py-4 px-4 md:px-6 text-gray-900 font-semibold text-sm md:text-base hidden md:table-cell">Added By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {userExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 md:py-4 px-4 md:px-6">
                      <p className="text-gray-900 font-medium text-sm md:text-base">{expense.name}</p>
                      <div className="sm:hidden text-xs text-gray-500 mt-1">
                        {new Date(expense.createdAt).toLocaleDateString()} • {expense.createdBy}
                      </div>
                    </td>
                    <td className="py-3 md:py-4 px-4 md:px-6">
                      <span className="text-red-600 font-semibold text-sm md:text-base">KES {expense.amount.toLocaleString()}</span>
                    </td>
                    <td className="py-3 md:py-4 px-4 md:px-6 hidden sm:table-cell">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 text-sm md:text-base">{new Date(expense.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-3 md:py-4 px-4 md:px-6 hidden md:table-cell">
                      <span className="text-gray-600 text-sm md:text-base">{expense.createdBy}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">No Expenses Recorded</h3>
            <p className="text-gray-600 mb-4 text-sm md:text-base">Start tracking your store expenses.</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#5771FF] text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 font-semibold shadow-lg mx-auto"
            >
              <Plus className="w-5 h-5" />
              <span>Add First Expense</span>
            </button>
          </div>
        )}
      </div>

      {/* Add Expense Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Add Expense</h3>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Expense Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter expense name"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Amount (KES)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#5771FF] text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg"
                >
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}