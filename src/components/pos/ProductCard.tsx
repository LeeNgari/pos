import React from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  viewMode?: 'grid' | 'list';
}

export function ProductCard({ product, quantity, onAdd, onRemove, viewMode = 'grid' }: ProductCardProps) {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg md:rounded-xl overflow-hidden flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 font-semibold text-base md:text-lg mb-1 truncate">{product.name}</h3>
            <p className="text-gray-600 text-xs md:text-sm line-clamp-2 mb-2">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg md:text-xl font-bold text-gray-900">KES {product.price.toLocaleString()}</span>
              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full font-medium hidden sm:inline">
                {product.category}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 flex-shrink-0">
            <button
              onClick={onRemove}
              disabled={quantity === 0}
              className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              <Minus className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
            </button>
            <span className="text-gray-900 font-medium w-6 md:w-8 text-center text-sm md:text-base">{quantity}</span>
            <button
              onClick={onAdd}
              className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#5771FF] flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
            >
              <Plus className="w-3 h-3 md:w-4 md:h-4 text-white" />
            </button>
            
            {quantity > 0 && (
              <div className="hidden lg:flex items-center space-x-1 text-gray-600 ml-2">
                <ShoppingCart className="w-4 h-4" />
                <span className="text-sm font-medium">KES {(product.price * quantity).toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group">
      <div className="aspect-square rounded-lg md:rounded-xl overflow-hidden mb-3 md:mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="space-y-3">
        <div>
          <h3 className="text-gray-900 font-semibold text-base md:text-lg mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-gray-600 text-xs md:text-sm line-clamp-2">{product.description}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-lg md:text-2xl font-bold text-gray-900">KES {product.price.toLocaleString()}</span>
          <span className="text-xs text-blue-600 bg-blue-50 px-2 md:px-3 py-1 rounded-full font-medium hidden sm:inline">
            {product.category}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onRemove}
              disabled={quantity === 0}
              className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              <Minus className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
            </button>
            <span className="text-gray-900 font-medium w-6 md:w-8 text-center text-sm md:text-base">{quantity}</span>
            <button
              onClick={onAdd}
              className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#5771FF] flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
            >
              <Plus className="w-3 h-3 md:w-4 md:h-4 text-white" />
            </button>
          </div>
          
          {quantity > 0 && (
            <div className="hidden sm:flex items-center space-x-1 text-gray-600">
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm font-medium">KES {(product.price * quantity).toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}