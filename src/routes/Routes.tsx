/* eslint-disable react/react-in-jsx-scope */
// import { Navigate } from "react-router-dom";
import PageNotFound from "../components/NotFound/PageNotFound";
import { UserDashboard2 } from "../pages/dashboard";
import { UserLandingPage } from "../pages/landingPage";
import { LoginForm } from "../pages/LoginPage";
import CartPage from "../pages/CartPage/CartPage";
import { EmployeeRegistration } from "../pages/EmployeeRegistration";
import { Employee_Id } from "../constants/ROLES";
import { ProfileUpdate } from "../pages/ProfileUpdate";
import ProtectedRoute from "./ProtectedRoute";
import RetailerPage from "../pages/RetailerPage/RetailerPage";
import UserDashboard from "../pages/dashboard/UserDashboard";

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
    path: "/dashboard",
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
  },
  {
    path: "/retailerpage/:retailer_id",
    element: <RetailerPage/>,
  },
];

export default childRoutes;
