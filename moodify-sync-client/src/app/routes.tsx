import { createBrowserRouter } from "react-router";
import MainLayout from "../components/layout/MainLayout";
import Login from "../features/auth/page/Login";
import Register from "../features/auth/page/Register";

export const router = createBrowserRouter([
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <MainLayout />,
  },
]);
