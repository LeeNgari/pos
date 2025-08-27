import React, { createContext, useContext, useReducer, useEffect } from 'react';
import {  AppContextType } from './types';
import { appReducer } from './reducer';
import { initialState } from './initialState';
import { sampleProducts, sampleUsers, sampleOrders } from '../data/sampleData';
import {
  setPinEntered as setPinEnteredAction,
  login as loginAction,
  logout as logoutAction,
  addProduct as addProductAction,
  updateProduct as updateProductAction,
  deleteProduct as deleteProductAction,
  addOrder as addOrderAction,
  updateOrder as updateOrderAction,
  addUser as addUserAction,
  updateUser as updateUserAction,
  addPurchaseOrder as addPurchaseOrderAction,
  updatePurchaseOrder as updatePurchaseOrderAction,
  addExpense as addExpenseAction,
} from './actions';

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'SET_PRODUCTS', payload: sampleProducts });
    dispatch({ type: 'SET_USERS', payload: sampleUsers });
    dispatch({ type: 'SET_ORDERS', payload: sampleOrders });
    dispatch({ type: 'SET_PURCHASE_ORDERS', payload: [] });
    dispatch({ type: 'SET_EXPENSES', payload: [] });
  }, []);

  const setPinEntered = setPinEnteredAction(dispatch);
  const login = loginAction(dispatch, state);
  const logout = logoutAction(dispatch, state);
  const addProduct = addProductAction(dispatch);
  const updateProduct = updateProductAction(dispatch);
  const deleteProduct = deleteProductAction(dispatch);
  const addOrder = addOrderAction(dispatch);
  const updateOrder = updateOrderAction(dispatch);
  const addUser = addUserAction(dispatch);
  const updateUser = updateUserAction(dispatch);
  const addPurchaseOrder = addPurchaseOrderAction(dispatch);
  const updatePurchaseOrder = updatePurchaseOrderAction(dispatch);
  const addExpense = addExpenseAction(dispatch);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        setPinEntered,
        login,
        logout,
        addProduct,
        updateProduct,
        deleteProduct,
        addOrder,
        updateOrder,
        addUser,
        updateUser,
        addPurchaseOrder,
        updatePurchaseOrder,
        addExpense,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
