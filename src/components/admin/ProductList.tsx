import React from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { Product, StoreType } from '../../types';

interface ProductListProps {
  filteredProducts: Product[];
  handleEdit: (product: Product) => void;
  handleDelete: (productId: string) => void;
  handleAddProduct: () => void;
  searchTerm: string;
  categoryFilter: string;
  activeStoreTab: StoreType;
  storeTypes: { type: StoreType; label: string; icon: string }[];
}

export const ProductList: React.FC<ProductListProps> = ({
  filteredProducts,
  handleEdit,
  handleDelete,
  handleAddProduct,
  searchTerm,
  categoryFilter,
  activeStoreTab,
  storeTypes,
}) => {
  return (
    <div className="space-y-6">
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all border border-gray-100">
            <div className="aspect-square rounded-lg overflow-hidden mb-3">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="space-y-2">
              <div>
                <h3 className="text-gray-900 font-semibold text-sm">{product.name}</h3>
                <p className="text-gray-600 text-xs line-clamp-2">{product.description}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">${product.price}</span>
                <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full font-medium">
                  {product.category}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-xs">Stock: {product.stockQuantity}</span>
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleEdit(product)}
                    className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">
            {storeTypes.find(s => s.type === activeStoreTab)?.icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No products found for {storeTypes.find(s => s.type === activeStoreTab)?.label}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || categoryFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Start by adding your first product to this store.'}
          </p>
          <button
            onClick={handleAddProduct}
            className="bg-[#5771FF] text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 font-semibold shadow-lg mx-auto"
          >
            <Plus className="w-5 h-5" />
            <span>Add First Product</span>
          </button>
        </div>
      )}
    </div>
  );
};
