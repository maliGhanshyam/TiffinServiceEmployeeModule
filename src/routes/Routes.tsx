/* eslint-disable react/react-in-jsx-scope */
// import { Navigate } from "react-router-dom";
import PageNotFound from "../components/NotFound/PageNotFound";
import AllTiffins from "../pages/AllTiffins/AllTiffins";
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
import Order from "../pages/Order/Order";
import LandingPageTiffins from "../pages/LandingPageTiffins/LandingPageTiffins";
import { Payment } from "../pages/PaymentPage";
import OrderConfirmation from "../pages/OrderConfirmationPage/OrderConfirmation";
import { Navigate } from "react-router-dom";

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
    path: "register",
    element: <EmployeeRegistration />,
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
    path: "payment",
    element: (
      <ProtectedRoute requiredRole={Employee_Id}>
        <Payment />
      </ProtectedRoute>
    ),
  },
  {
    path: "order-confirmation",
    element: (
      <ProtectedRoute requiredRole={Employee_Id}>
        <OrderConfirmation />
      </ProtectedRoute>
    ),
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
    path: "order",
    element: <Order />,
  },
  {
    path: "/landingPage",
    element: (
      <ProtectedRoute requiredRole={Employee_Id}>
        <UserLandingPage />
      </ProtectedRoute>
    ),
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
  },{
    path: `/allTiffins`,
    element: <AllTiffins/>
  },
  {
    path: "viewAllTiffins",
    element: <LandingPageTiffins />,
  },
  {
    path: "",
    element: <Navigate to="login" />,
  },
];

export default childRoutes;
