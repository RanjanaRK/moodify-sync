import { createBrowserRouter } from "react-router";
import Login from "../features/auth/page/Login";
import Register from "../features/auth/page/register";
import MainLayout from "../components/layout/MainLayout";

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
