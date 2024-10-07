import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateProfileRoute = () => {
  const { user } = useSelector((state) => state.auth);

  return user?.user ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateProfileRoute;
