import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import { selectAuth } from "../redux/auth/auth.selectors";
import { PATHS } from "../routes/paths";

type Props = {
  children: ReactNode;
};


const AdminGuard = ({ children }: { children: JSX.Element }) => {
  const { isAuthanticated, isInitialized, user } = useAppSelector(selectAuth);

  if (!isInitialized) {
    return <h1>Loading...</h1>;
  }

  if (!isAuthanticated) {
    return <Navigate to={PATHS.signIn} replace />;
  }

  if (user?.role !== "manager") {
    return <Navigate to={PATHS.suppliersOrders} replace />;
  }

  return children;
};

export default AdminGuard;
