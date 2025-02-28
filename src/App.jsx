import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import LayoutClient from './components/client/layout.client';
import NotFound from './components/share/not.found';
import HomePage from './pages/home';
import ShopPage from './pages/shop';
import DashboardPage from './pages/admin/dashboard';
import RegisterPage from './pages/auth/register';
import LoginPage from './pages/auth/login';
import LayoutAdmin from './components/admin/layout.admin';
import { fetchAccount } from './redux/slice/accountSlide';
import LayoutApp from './components/share/layout.app';
import ProtectedAdminRoute from './components/share/protected-route';
import VaccinePage from './pages/admin/vaccine';
import AppointmentPage from './pages/admin/appointment';
import CenterPage from './pages/admin/center';
import UserPage from './pages/admin/user';
import MySchedulePage from './pages/admin/my-schedule';
import ProfilePage from './pages/auth/profile';
import ProtectedUserRoute from './components/share/protected-route/user-protected';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      window.location.pathname === '/login' ||
      window.location.pathname === '/register'
    )
      return;
    dispatch(fetchAccount());
  });

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <LayoutApp>
          <LayoutClient />
        </LayoutApp>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'shop', element: <ShopPage /> },
        {
          path: 'profile', element:
            <ProtectedUserRoute>
              <ProfilePage />
            </ProtectedUserRoute>
        },
      ],
    },

    {
      path: '/admin',
      element: (
        <ProtectedAdminRoute>
          <LayoutApp>
            <LayoutAdmin />
          </LayoutApp>
        </ProtectedAdminRoute>
      ),
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <DashboardPage />,
        },
        {
          path: 'vaccines',
          element: <VaccinePage />,
        },
        {
          path: 'users',
          element: <UserPage />,
        },
        {
          path: 'centers',
          element: <CenterPage />,
        },
        {
          path: 'appointments',
          element: <AppointmentPage />,
        },
        {
          path: 'my-schedule',
          element: <MySchedulePage />,
        },
      ],
    },

    {
      path: '/login',
      element: <LoginPage />,
    },

    {
      path: '/register',
      element: <RegisterPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
