import { ReactNode, FC, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/Store";
import { setAuthData } from "../store/authSlice";
import axiosInstance from "../services/CartService/axiosInstance";
import { Employee_Id } from "../constants/ROLES";
const API_URL = process.env.REACT_APP_API_URL;
interface AuthGuardProps {
  children: ReactNode;
  requiredRole?: string;
  guestOnly?: boolean;
}

const ProtectedRoute: FC<AuthGuardProps> = ({
  children,
  requiredRole,
  guestOnly,
}) => {
  const userRoleId = useSelector((state: RootState) => state.auth.userRoleId);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && (!userRoleId || !userId)) {
      getUserByToken();
    }
  }, [token, userRoleId, userId, dispatch]);
  const getUserByToken = async () => {
    try {
      const response = await axiosInstance.get(
        `${API_URL}/auth/getuserbytoken`
      );
      if (response.data.data._id && response.data.data.role_id) {
        dispatch(
          setAuthData({
            userRoleId: response.data.data.role_id,
            userId: response.data.data._id,
          })
        );
      }
    } catch (error) {
      console.error("Error fetching user by token:", error);
    }
  };

  // Redirect logic for guest-only routes
  if (guestOnly && token) {
    if (userRoleId === Employee_Id) {
      return <Navigate to="/landingPage" replace />;
    }
  }

  // Redirect logic for protected routes
  if (!guestOnly && !token) {
    return <Navigate to="/login" replace />;
  }

  if (!guestOnly && userRoleId && requiredRole && userRoleId !== requiredRole) {
    return <Navigate to="*" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
