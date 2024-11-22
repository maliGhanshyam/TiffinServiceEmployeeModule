// import { Navigate } from "react-router-dom";
import PageNotFound from "../components/NotFound/PageNotFound";
import { UserDashboard2 } from "../pages/dashboard";
import { UserLandingPage } from "../pages/landingPage";
import { LoginForm } from "../pages/LoginPage";

const childRoutes = [
  {
    path: "login",
    element: <LoginForm />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "",
    element: <UserDashboard2 />,
  },
  {
    path: "/landingPage",
    element: <UserLandingPage />,
  },
];

export default childRoutes;
