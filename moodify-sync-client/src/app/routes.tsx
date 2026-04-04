import { createBrowserRouter } from "react-router";
import Login from "../features/auth/page/Login";
import Register from "../features/auth/page/register";

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
  },
]);
