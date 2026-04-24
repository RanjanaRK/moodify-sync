import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router';

import Protected from '../features/auth/components/Protected';
import AppLayout from '../layouts/AppLayout';
import AuthLayout from '../layouts/AuthLayout';
import RootLayout from '../layouts/RootLayout';
import { Loader } from 'lucide-react';

// lazy loading

const Login = lazy(() => import('../features/auth/pages/Login'));
const Register = lazy(() => import('../features/auth/pages/Register'));
const Home = lazy(() => import('../features/home/pages/Home'));
const Uploadsongs = lazy(() => import('../features/upload/pages/Uploadsongs'));

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/auth/login',
            element: (
              <Suspense fallback={<Loader />}>
                <Login />
              </Suspense>
            ),
          },
          {
            path: '/auth/register',
            element: (
              <Suspense fallback={<Loader />}>
                <Register />
              </Suspense>
            ),
          },
        ],
      },
      {
        element: <AppLayout />,
        children: [
          {
            path: '/',
            element: (
              <Suspense fallback={<Loader />}>
                {/* <Protected> */}
                <Home />
                {/* </Protected> */}
              </Suspense>
            ),
          },
          {
            path: '/upload',
            element: (
              <Suspense fallback={<Loader />}>
                <Protected>
                  <Uploadsongs />
                </Protected>
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);
