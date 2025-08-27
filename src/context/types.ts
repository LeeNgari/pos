import { User, Product, Order, Expense, PurchaseOrder } from '../types';

export interface AppState {
  auth: {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    pinEntered: boolean;
  };
  products: Product[];
  orders: Order[];
  users: User[];
  purchaseOrders: PurchaseOrder[];
  expenses: Expense[];
}

export interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<any>;
  setPinEntered: (entered: boolean) => void;
  login: (phone: string, otp: string) => Promise<boolean>;
  logout: () => void;
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  addPurchaseOrder: (po: Omit<PurchaseOrder, 'id' | 'createdAt'>) => void;
  updatePurchaseOrder: (id: string, updates: Partial<PurchaseOrder>) => void;
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt'>) => void;
}
