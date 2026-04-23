import { createBrowserRouter } from 'react-router';
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';
import Home from '../features/home/pages/Home';
import Uploadsongs from '../features/upload/pages/Uploadsongs';
import AppLayout from '../layouts/AppLayout';
import AuthLayout from '../layouts/AuthLayout';
import RootLayout from '../layouts/RootLayout';
import Protected from '../features/auth/components/Protected';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/auth/login',
            element: <Login />,
          },
          {
            path: '/auth/register',
            element: <Register />,
          },
        ],
      },
      {
        element: <AppLayout />,
        children: [
          {
            path: '/',
            element: (
              <Protected>
                <Home />
              </Protected>
            ),
          },
          {
            path: '/upload',
            element: (
              <Protected>
                <Uploadsongs />
              </Protected>
            ),
          },
        ],
      },
    ],
  },
]);
