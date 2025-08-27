import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product, StoreType } from '../../types';
import { ProductModal } from '../../components/admin/ProductModal';
import { StoreTabs } from '../../components/admin/StoreTabs';
import { ProductSearchFilter } from '../../components/admin/ProductSearchFilter';
import { ProductList } from '../../components/admin/ProductList';

export function ProductManagement() {
  const { state, addProduct, updateProduct, deleteProduct } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeStoreTab, setActiveStoreTab] = useState<StoreType>('hotel');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    price: '',
    storeType: 'hotel' as StoreType,
    image: '',
    stockQuantity: '',
  });

  const storeTypes: { type: StoreType; label: string; icon: string }[] = [
    { type: 'hotel', label: 'Hotel', icon: '🏨' },
    { type: 'bar', label: 'Bar', icon: '🍺' },
    { type: 'kitchen', label: 'Kitchen', icon: '🍳' },
    { type: 'bakery', label: 'Bakery', icon: '🥖' },
    { type: 'alcoholics', label: 'Alcoholics', icon: '🍷' },
  ];

  const filteredProducts = state.products.filter(product => {
    const matchesStore = product.storeType === activeStoreTab;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesStore && matchesSearch && matchesCategory;
  });

  const categories = [...new Set(state.products
    .filter(p => p.storeType === activeStoreTab)
    .map(p => p.category))];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      sku: formData.sku,
      price: parseFloat(formData.price),
      storeType: formData.storeType,
      image: formData.image,
      inStock: true,
      stockQuantity: parseInt(formData.stockQuantity),
      category: 'General', // Default category
      description: formData.name, // Use name as description
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      sku: '',
      price: '',
      storeType: activeStoreTab,
      image: '',
      stockQuantity: '',
    });
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      sku: product.sku || '',
      price: product.price.toString(),
      storeType: product.storeType,
      image: product.image,
      stockQuantity: product.stockQuantity.toString(),
    });
    setIsModalOpen(true);
  };

  const handleDelete = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };

  const handleAddProduct = () => {
    setFormData(prev => ({ ...prev, storeType: activeStoreTab }));
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
        <button
          onClick={handleAddProduct}
          className="bg-[#5771FF] text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 font-semibold shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Add Product</span>
        </button>
      </div>

      <StoreTabs
        activeStoreTab={activeStoreTab}
        setActiveStoreTab={setActiveStoreTab}
        storeTypes={storeTypes}
        products={state.products}
      />

      <ProductSearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
      />

      <ProductList
        filteredProducts={filteredProducts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleAddProduct={handleAddProduct}
        searchTerm={searchTerm}
        categoryFilter={categoryFilter}
        activeStoreTab={activeStoreTab}
        storeTypes={storeTypes}
      />

      <ProductModal
        isModalOpen={isModalOpen}
        editingProduct={editingProduct}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        resetForm={resetForm}
        storeTypes={storeTypes}
      />
    </div>
  );
}
