import { Navigate } from "react-router-dom";
import PageNotFound from "../components/NotFound/PageNotFound";
import { UserDashboard } from "../pages/dashboard";
import { UserLandingPage } from "../pages/landingPage";
import { LoginForm } from "../pages/LoginPage";
import CartPage from "../pages/CartPage/CartPage";
import ProtectedRoute from "./ProtectedRoute";
import { Employee_Id } from "../constants/ROLES";

const childRoutes = [
  {
    path: "login",
    element: (
      <ProtectedRoute guestOnly={true}>
        <LoginForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "cart",
    element: (
      <ProtectedRoute requiredRole={Employee_Id}>
        <CartPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "",
    element: <UserDashboard />,
  },
  {
    path: "/landingPage",
    element: (
      <ProtectedRoute requiredRole={Employee_Id}>
        <UserLandingPage />
      </ProtectedRoute>
    ),
  },
];

export default childRoutes;
