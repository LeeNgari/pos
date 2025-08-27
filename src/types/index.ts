export interface User {
  id: string;
  phone: string;
  name: string;
  role: 'admin' | 'staff';
  storeType: StoreType;
  createdAt: Date;
  isActive: boolean;
}

export type StoreType = 'hotel' | 'alcoholics' | 'bar' | 'kitchen' | 'bakery';

export interface Product {
  id: string;
  name: string;
  sku?: string;
  description: string;
  price: number;
  category: string;
  storeType: StoreType;
  image: string;
  inStock: boolean;
  stockQuantity: number;
  createdAt: Date;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  notes?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  customerName?: string;
  customerPhone?: string;
  tableNumber?: string;
  roomNumber?: string;
  paymentMethod?: 'cash' | 'mpesa';
  createdAt: Date;
  completedAt?: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  pinEntered: boolean;
}

export interface AppState {
  auth: AuthState;
  products: Product[];
  orders: Order[];
  users: User[];
  purchaseOrders: PurchaseOrder[];
  expenses: Expense[];
}

export interface PurchaseOrder {
  id: string;
  storeType: StoreType;
  items: PurchaseOrderItem[];
  status: 'pending' | 'fulfilled' | 'cancelled';
  requestedBy: string;
  createdAt: Date;
  fulfilledAt?: Date;
}

export interface PurchaseOrderItem {
  id: string;
  itemName: string;
  quantity: number;
}

export interface Expense {
  id: string;
  name: string;
  amount: number;
  storeType: StoreType;
  createdBy: string;
  createdAt: Date;
}