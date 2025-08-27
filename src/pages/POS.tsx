import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { useApp } from '../context/AppContext';
import { OrderItem, Product } from '../types';
import { POSControls } from '../components/pos/POSControls';
import { ProductGrid } from '../components/pos/ProductGrid';
import { OrderSummary } from '../components/pos/OrderSummary';
import { POSNavigationTabs } from '../components/pos/POSNavigationTabs';
import { StoreInventory } from '../pages/StoreInventory';
import { PurchaseOrders } from '../pages/PurchaseOrders';
import { Expenses } from '../components/pos/Expenses';
import { NetSales } from '../components/pos/NetSales';
import { Receipt } from '../components/pos/Receipt';
import { CheckoutPage } from '../pages/checkout/CheckoutPage';
import { PaymentPage } from '../pages/payment/PaymentPage';

export function POS() {
  const { state, addOrder } = useApp();
  const { user } = state.auth;
  const [cart, setCart] = useState<{ [productId: string]: number }>({});
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState('pos');
  const [currentView, setCurrentView] = useState<'pos' | 'checkout' | 'payment'>('pos');
  const [customerInfo, setCustomerInfo] = useState<any>({});
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'mpesa'>('cash');
  const [showReceipt, setShowReceipt] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  const storeProducts = state.products.filter(product => product.storeType === user?.storeType);
  
  const filteredProducts = storeProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(storeProducts.map(p => p.category))];

  const addToCart = (product: Product) => {
    const newCart = { ...cart };
    newCart[product.id] = (newCart[product.id] || 0) + 1;
    setCart(newCart);
    updateOrderItems(product, newCart[product.id]);
  };

  const removeFromCart = (product: Product) => {
    const newCart = { ...cart };
    if (newCart[product.id] > 0) {
      newCart[product.id] -= 1;
      if (newCart[product.id] === 0) {
        delete newCart[product.id];
      }
    }
    setCart(newCart);
    updateOrderItems(product, newCart[product.id] || 0);
  };

  const updateOrderItems = (product: Product, quantity: number) => {
    setOrderItems(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        if (quantity === 0) {
          return prev.filter(item => item.productId !== product.id);
        }
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity, price: product.price }
            : item
        );
      } else if (quantity > 0) {
        return [...prev, {
          id: Date.now().toString(),
          productId: product.id,
          product,
          quantity,
          price: product.price,
        }];
      }
      return prev;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const product = state.products.find(p => p.id === productId);
    if (product) {
      if (quantity === 0) {
        const newCart = { ...cart };
        delete newCart[productId];
        setCart(newCart);
        setOrderItems(prev => prev.filter(item => item.productId !== productId));
      } else {
        setCart(prev => ({ ...prev, [productId]: quantity }));
        updateOrderItems(product, quantity);
      }
    }
  };

  const removeItem = (productId: string) => {
    const newCart = { ...cart };
    delete newCart[productId];
    setCart(newCart);
    setOrderItems(prev => prev.filter(item => item.productId !== productId));
  };

  const handleProceedToCheckout = (customerData: any) => {
    setCustomerInfo(customerData);
    setCurrentView('checkout');
  };

  const handleProceedToPayment = (selectedPaymentMethod: 'cash' | 'mpesa') => {
    setPaymentMethod(selectedPaymentMethod);
    setCurrentView('payment');
  };

  const handlePaymentComplete = () => {
    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    const newOrder = {
      items: orderItems,
      total: total,
      status: 'completed',
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      tableNumber: customerInfo.tableNumber,
      roomNumber: customerInfo.roomNumber,
      paymentMethod: paymentMethod,
    };
    
    addOrder(newOrder);
    
    // Show receipt for all payment types and store types
    setCompletedOrder({
      ...newOrder,
      id: Date.now().toString(),
      createdAt: new Date(),
    });
    setShowReceipt(true);
  };
  
  const resetAfterOrder = () => {
    setCart({});
    setOrderItems([]);
    setCustomerInfo({});
    setCurrentView('pos');
    setActiveTab('pos');
    setShowReceipt(false);
    setCompletedOrder(null);
  };

  // Show receipt
  if (showReceipt && completedOrder) {
    return (
      <Receipt
        order={completedOrder}
        onClose={resetAfterOrder}
      />
    );
  };

  const handleBackToCheckout = () => {
    setCurrentView('checkout');
  };

  const handleBackToPOS = () => {
    setCurrentView('pos');
  };

  const getStoreTitle = () => {
    switch (user?.storeType) {
      case 'hotel':
        return 'Hotel Services';
      case 'bar':
        return 'Bar & Beverages';
      case 'kitchen':
        return 'Kitchen & Dining';
      case 'bakery':
        return 'Bakery & Pastries';
      case 'alcoholics':
        return 'Alcoholic Beverages';
      default:
        return 'Point of Sale';
    }
  };

  // Show checkout page
  if (currentView === 'checkout') {
    return (
      <CheckoutPage
        items={orderItems}
        customerInfo={customerInfo}
        onBack={handleBackToPOS}
        onProceedToPayment={handleProceedToPayment}
      />
    );
  }

  // Show payment page
  if (currentView === 'payment') {
    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    return (
      <PaymentPage
        paymentMethod={paymentMethod}
        amount={total}
        onBack={handleBackToCheckout}
        onPaymentComplete={handlePaymentComplete}
      />
    );
  }

  return (
    <Layout title={getStoreTitle()}>
      <div className="space-y-6">
        <POSNavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'pos' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
            <div className="xl:col-span-2 order-2 xl:order-1">
              <POSControls
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                viewMode={viewMode}
                setViewMode={setViewMode}
                categories={categories}
                filteredProductCount={filteredProducts.length}
                cartItemCount={Object.keys(cart).length}
              />
              <ProductGrid
                products={filteredProducts}
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                viewMode={viewMode}
              />
            </div>
            
            <div className="xl:col-span-1 order-1 xl:order-2">
              <OrderSummary
                items={orderItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
                onProceedToCheckout={handleProceedToCheckout}
                storeType={user?.storeType || ''}
              />
            </div>
          </div>
        )}

        {activeTab === 'inventory' && <StoreInventory />}
        {activeTab === 'purchase-orders' && <PurchaseOrders />}
        {activeTab === 'expenses' && <Expenses />}
        {activeTab === 'net-sales' && <NetSales />}
      </div>
    </Layout>
  );
}
