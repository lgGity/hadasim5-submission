import { ReactNode } from "react"
import { selectAuth } from "../redux/auth/auth.selectors"
import { Navigate } from "react-router-dom"
import { PATHS } from "../routes/paths"
import { useSelector } from "react-redux";

type Props = {
    children: ReactNode
}


const UserGuard = ({ children }: { children: JSX.Element }) => {
  const { isAuthanticated, isInitialized,user } = useSelector(selectAuth);
  if (!isInitialized) {
    return <h1>Loading...</h1>;
}

  if (!isAuthanticated) {
    return <Navigate to={PATHS.login} replace />;
  }

  if (user?.role !== "user") {
    return <Navigate to={PATHS.managerOrders} replace />;
  }

  return children;
};

export default UserGuard;
