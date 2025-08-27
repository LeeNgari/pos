import React, { useState } from 'react';
import { useApp } from "../context/AppContext";
import { InventoryStats } from '../components/pos/InventoryStats';
import { InventoryFilters } from '../components/pos/InventoryFilters';
import { InventoryTable } from '../components/pos/InventoryTable';

export function StoreInventory() {
  const { state } = useApp();
  const { user } = state.auth;
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');

  const storeProducts = state.products.filter(product => product.storeType === user?.storeType);
  
  const filteredProducts = storeProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStock = stockFilter === 'all' || 
                        (stockFilter === 'low' && product.stockQuantity <= 5) ||
                        (stockFilter === 'out' && product.stockQuantity === 0) ||
                        (stockFilter === 'available' && product.stockQuantity > 5);
    return matchesSearch && matchesCategory && matchesStock;
  });

  const categories = [...new Set(storeProducts.map(p => p.category))];

  const totalProducts = storeProducts.length;
  const lowStockProducts = storeProducts.filter(p => p.stockQuantity <= 5 && p.stockQuantity > 0).length;
  const outOfStockProducts = storeProducts.filter(p => p.stockQuantity === 0).length;

  return (
    <div className="space-y-6">
      <InventoryStats
        totalProducts={totalProducts}
        lowStockProducts={lowStockProducts}
        outOfStockProducts={outOfStockProducts}
      />

      <InventoryFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        stockFilter={stockFilter}
        setStockFilter={setStockFilter}
        categories={categories}
      />

      <InventoryTable
        filteredProducts={filteredProducts}
        searchTerm={searchTerm}
        categoryFilter={categoryFilter}
        stockFilter={stockFilter}
      />
    </div>
  );
}
