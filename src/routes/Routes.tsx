import { Navigate } from "react-router-dom";
import PageNotFound from "../components/NotFound/PageNotFound";
import { UserDashboard } from "../pages/dashboard";
import { UserLandingPage } from "../pages/landingPage";
import { LoginForm } from "../pages/LoginPage";
import CartPage from "../pages/CartPage/CartPage";
import { EmployeeRegistration } from "../pages/EmployeeRegistration";
import { Employee_Id } from "../constants/ROLES";
import { ProfileUpdate } from "../pages/ProfileUpdate";
import ProtectedRoute from "./ProtectedRoute";

const childRoutes = [
  {
    path: "login",
    element: <LoginForm />,
  },
  {
    path: "register",
    element: <EmployeeRegistration />,
  },
  {
    path: "cart",
    element: <CartPage />,
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
    element: <UserLandingPage />,
  },
  {
    path: "update-profile",
    element: (
    <ProtectedRoute requiredRole={Employee_Id}><ProfileUpdate/></ProtectedRoute>
    )
  }
];

export default childRoutes;
