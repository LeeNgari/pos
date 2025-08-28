import { AppState, AppContextType } from './types';
import { User, Product, Order, Expense, PurchaseOrder } from '../types';

export const setPinEntered = (dispatch: AppContextType['dispatch']) => (entered: boolean) => {
  dispatch({ type: 'SET_PIN_ENTERED', payload: entered });
};

export const login = (dispatch: AppContextType['dispatch'], state: AppState) => async (phone: string, otp: string): Promise<User | null> => {
  dispatch({
    type: 'SET_AUTH',
    payload: { ...state.auth, isLoading: true },
  });

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  const user = state.users.find(u => u.phone === phone);
  
  if (user && otp === '1234') {
    dispatch({
      type: 'SET_AUTH',
      payload: {
        user,
        isAuthenticated: true,
        isLoading: false,
        pinEntered: true,
      },
    });
    return user; // Return the user object on success
  }

  dispatch({
    type: 'SET_AUTH',
    payload: {
      user: null,
      isAuthenticated: false,
      isLoading: false,
    },
  });
  return null; // Return null on failure
};

export const logout = (dispatch: AppContextType['dispatch'], state: AppState) => () => {
  dispatch({
    type: 'SET_AUTH',
    payload: {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      pinEntered: state.auth.pinEntered,
    },
  });
};

export const addProduct = (dispatch: AppContextType['dispatch']) => (product: Omit<Product, 'id' | 'createdAt'>) => {
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date(),
  };
  dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
};

export const updateProduct = (dispatch: AppContextType['dispatch']) => (id: string, updates: Partial<Product>) => {
  dispatch({ type: 'UPDATE_PRODUCT', payload: { id, updates } });
};

export const deleteProduct = (dispatch: AppContextType['dispatch']) => (id: string) => {
  dispatch({ type: 'DELETE_PRODUCT', payload: id });
};

export const addOrder = (dispatch: AppContextType['dispatch']) => (order: Omit<Order, 'id' | 'createdAt'>) => {
  const newOrder: Order = {
    ...order,
    id: Date.now().toString(),
    createdAt: new Date(),
  };
  dispatch({ type: 'ADD_ORDER', payload: newOrder });
};

export const updateOrder = (dispatch: AppContextType['dispatch']) => (id: string, updates: Partial<Order>) => {
  dispatch({ type: 'UPDATE_ORDER', payload: { id, updates } });
};

export const addUser = (dispatch: AppContextType['dispatch']) => (user: Omit<User, 'id' | 'createdAt'>) => {
  const newUser: User = {
    ...user,
    id: Date.now().toString(),
    createdAt: new Date(),
  };
  dispatch({ type: 'ADD_USER', payload: newUser });
};

export const updateUser = (dispatch: AppContextType['dispatch']) => (id: string, updates: Partial<User>) => {
  dispatch({ type: 'UPDATE_USER', payload: { id, updates } });
};

export const addPurchaseOrder = (dispatch: AppContextType['dispatch']) => (po: Omit<PurchaseOrder, 'id' | 'createdAt'>) => {
  const newPO: PurchaseOrder = {
    ...po,
    id: Date.now().toString(),
    createdAt: new Date(),
  };
  dispatch({ type: 'ADD_PURCHASE_ORDER', payload: newPO });
};

export const updatePurchaseOrder = (dispatch: AppContextType['dispatch']) => (id: string, updates: Partial<PurchaseOrder>) => {
  dispatch({ type: 'UPDATE_PURCHASE_ORDER', payload: { id, updates } });
};

export const addExpense = (dispatch: AppContextType['dispatch']) => (expense: Omit<Expense, 'id' | 'createdAt'>) => {
  const newExpense: Expense = {
    ...expense,
    id: Date.now().toString(),
    createdAt: new Date(),
  };
  dispatch({ type: 'ADD_EXPENSE', payload: newExpense });
};
