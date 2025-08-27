import { AppState } from './types';

export const initialState: AppState = {
  auth: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    pinEntered: false,
  },
  products: [],
  orders: [],
  users: [],
  purchaseOrders: [],
  expenses: [],
};
