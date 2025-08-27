# Project Rewrite Plan: React Router Integration and Modularization

This plan outlines the steps to refactor the existing project to use React Router for navigation and to improve modularity by breaking down components into smaller, more manageable files.

## Phase 1: Setup and Initial Refactoring

- [ ] **Install React Router:** Add `react-router-dom` as a project dependency.
- [ ] **Create `plan.md`:** Create this file to track progress.
- [ ] **Restructure Project Folders:** Create a new folder structure with `pages` and `components` directories.
    - `src/pages`: Will contain top-level components for each route.
    - `src/components`: Will contain reusable UI components.
- [ ] **Set up Basic Routing:**
    - Create a main router file (e.g., `src/router.tsx`).
    - Configure basic routes for the main pages (e.g., Login, POS, Admin).
- [ ] **Update `App.tsx`:** Modify the main `App.tsx` to use the new router setup.

## Phase 2: Component Migration and Modularization

- [ ] **Modularize `POSInterface.tsx`:**
    - [ ] Break down `POSInterface.tsx` into smaller components.
    - [ ] Move `ProductCard.tsx` to `src/components/pos/`.
    - [ ] Move `OrderSummary.tsx` to `src/components/pos/`.
    - [ ] Create a `POS` page component in `src/pages/POS.tsx`.
- [ ] **Modularize Admin Components:**
    - [ ] Create an `Admin` layout component.
    - [ ] Move `AdminDashboard.tsx` to `src/pages/admin/Dashboard.tsx`.
    - [ ] Move `ProductManagement.tsx` to `src/pages/admin/ProductManagement.tsx`.
    - [ ] Move `UserManagement.tsx` to `src/pages/admin/UserManagement.tsx`.
    - [ ] Move `OrderHistory.tsx` to `src/pages/admin/OrderHistory.tsx`.
    - [ ] Move `AdminPurchaseOrders.tsx` to `src/pages/admin/AdminPurchaseOrders.tsx`.
- [ ] **Modularize Authentication Components:**
    - [ ] Move `Login.tsx` to `src/pages/Login.tsx`.
    - [ ] Move `PinPage.tsx` to `src/pages/PinPage.tsx`.
- [ ] **Modularize Checkout and Payment:**
    - [ ] Move `CheckoutPage.tsx` to `src/pages/Checkout.tsx`.
    - [ ] Move `PaymentPage.tsx` to `src/pages/Payment.tsx`.
- [ ] **Modularize Other Components:**
    - [ ] Move `StoreInventory.tsx` to `src/pages/StoreInventory.tsx`.
    - [ ] Move `NetSales.tsx` to `src/components/pos/NetSales.tsx`.
    - [ ] Move `Receipt.tsx` to `src/components/pos/Receipt.tsx`.
    - [ ] Move `Expenses.tsx` to `src/components/pos/Expenses.tsx`.
    - [ ] Move `PurchaseOrders.tsx` to `src/pages/PurchaseOrders.tsx`.

## Phase 3: State Management and Context

- [ ] **Review and Refactor Context:**
    - [ ] Analyze the existing `AppContext.tsx`, `reducer.ts`, `actions.ts`, and `initialState.ts`.
    - [ ] Refactor the context to be more modular if necessary (e.g., create separate contexts for different parts of the application).
    - [ ] Ensure the context is used efficiently and doesn't cause unnecessary re-renders.

## Phase 4: Finalization and Cleanup

- [ ] **Review and Refactor all files to be under 100 lines.**
- [ ] **Remove Old Files:** Delete the old component files that have been replaced.
- [ ] **Update Imports:** Ensure all imports are pointing to the new file locations.
- [ ] **Code Review:** Review the entire project for consistency, and adherence to the new structure.
- [ ] **Testing:** Run the application and test all routes and functionality to ensure everything is working as expected.
