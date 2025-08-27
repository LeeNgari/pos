
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import { Login } from "./pages/auth/Login";
import { PinPage } from "./pages/auth/PinPage";
import { POS } from "./pages/POS";
import { AdminLayout } from "./components/admin/AdminLayout";
import { AdminDashboard } from "./pages/admin/Dashboard";
import { ProductManagement } from "./pages/admin/ProductManagement";
import { UserManagement } from "./pages/admin/UserManagement";
import { OrderHistory } from "./pages/admin/OrderHistory";
import { AdminPurchaseOrders } from "./pages/admin/PurchaseOrders";

import { StoreInventory } from "./pages/StoreInventory";
import { PurchaseOrders } from "./pages/PurchaseOrders";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { useApp } from "./context/AppContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomeRedirect />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "pin",
        element: <PinPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "pos",
            element: <POS />,
          },
          {
            path: "inventory",
            element: <StoreInventory />,
          },
          {
            path: "purchase-orders",
            element: <PurchaseOrders />,
          },
        ],
      },
      {
        element: <ProtectedRoute allowedRoles={['admin']} />,
        children: [
          {
            path: "admin",
            element: <AdminLayout title="Admin Dashboard" />,
            children: [
              {
                index: true,
                element: <AdminDashboard />,
              },
              {
                path: "products",
                element: <ProductManagement />,
              },
              {
                path: "users",
                element: <UserManagement />,
              },
              {
                path: "orders",
                element: <OrderHistory />,
              },
              {
                path: "purchase-orders",
                element: <AdminPurchaseOrders />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

// Custom component to handle redirection from the root path
function HomeRedirect() {
  const { state } = useApp();
  const { isAuthenticated, user } = state.auth;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/pos" replace />;
}

export default router;
