import { Navigate } from "react-router-dom";
import PageNotFound from "../components/NotFound/PageNotFound";
import { UserDashboard } from "../pages/dashboard";
import { UserLandingPage } from "../pages/landingPage";
import { LoginForm } from "../pages/LoginPage";
import CartPage from "../pages/CartPage/CartPage";

const childRoutes = [
  {
    path: "login",
    element: <LoginForm />,
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
];

export default childRoutes;
