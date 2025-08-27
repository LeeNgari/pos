import React from "react";
import { Package, AlertTriangle, CheckCircle } from "lucide-react";
import { Product } from "../../types";

interface InventoryTableProps {
  filteredProducts: Product[];
  searchTerm: string;
  categoryFilter: string;
  stockFilter: string;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({
  filteredProducts,
  searchTerm,
  categoryFilter,
  stockFilter,
}) => {
  const getStockStatus = (quantity: number) => {
    if (quantity === 0)
      return {
        status: "out",
        color: "bg-red-50 text-red-600",
        icon: AlertTriangle,
      };
    if (quantity <= 5)
      return {
        status: "low",
        color: "bg-yellow-50 text-yellow-600",
        icon: AlertTriangle,
      };
    return {
      status: "good",
      color: "bg-green-50 text-green-600",
      icon: CheckCircle,
    };
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 text-gray-900 font-semibold">
                Product
              </th>
              <th className="text-left py-4 px-6 text-gray-900 font-semibold">
                Category
              </th>
              <th className="text-left py-4 px-6 text-gray-900 font-semibold">
                Stock
              </th>
              <th className="text-left py-4 px-6 text-gray-900 font-semibold">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => {
              const stockStatus = getStockStatus(product.stockQuantity);
              const StatusIcon = stockStatus.icon;

              return (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-gray-900 font-medium">
                          {product.name}
                        </p>
                        <p className="text-gray-600 text-sm truncate max-w-xs">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-900 font-medium">
                      {product.stockQuantity}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div
                      className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${stockStatus.color}`}
                    >
                      <StatusIcon className="w-4 h-4" />
                      <span className="capitalize">{stockStatus.status}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-600">
            {searchTerm || categoryFilter !== "all" || stockFilter !== "all"
              ? "Try adjusting your search or filter criteria."
              : "No products available in your inventory."}
          </p>
        </div>
      )}
    </div>
  );
};
