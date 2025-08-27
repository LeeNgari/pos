import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  cart: { [productId: string]: number };
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  viewMode: 'grid' | 'list';
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  cart,
  addToCart,
  removeFromCart,
  viewMode,
}) => {
  return (
    <div className={viewMode === 'grid' 
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6" 
      : "space-y-4"
    }>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          quantity={cart[product.id] || 0}
          onAdd={() => addToCart(product)}
          onRemove={() => removeFromCart(product)}
          viewMode={viewMode}
        />
      ))}

      {products.length === 0 && (
        <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 text-sm md:text-base">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};
