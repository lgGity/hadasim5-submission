import { Navigate, createBrowserRouter } from 'react-router-dom';
import { PATHS } from './paths';
import Layout from '../layouts/Layout';
import SignIn from '../sections/auth/signInForm';
import Login from '../sections/auth/LoginForm';
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
import SupplierOrdersPage from '../pages/OrdersForSuppliers';
import SupplierProductForm from '../pages/DefineProductsForSupplier';
import ManagerPage from '../pages/ManagerOrders';
import NewOrder from '../pages/NewOrder';
import UserGuard from '../auth/GuestGuard';
import AdminGuard from '../auth/AuthGuard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={PATHS.login} />,
    index: true
  },

  {
    path: PATHS.login,
    element: <Login />
  },

  {
    path: PATHS.signIn,
    element: <SignIn />
  },
  {
    path: PATHS.suppliersOrders,
    element: <UserGuard><SupplierOrdersPage /></UserGuard>
  },
  {
    path: PATHS.supplierProduct,
    element: <SupplierProductForm />
  },
  {
    path: PATHS.managerOrders,
    element: <AdminGuard><ManagerPage/></AdminGuard>
  },
  {
    path: PATHS.newOrder,
    element: <AdminGuard><NewOrder/></AdminGuard>
  },


  // עמוד 404
  {
    path: '*',
    element: <h1>404 - הדף לא נמצא</h1>
  }
]);
