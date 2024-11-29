import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutClient from "./components/client/layout.client";
import NotFound from "./components/share/not.found";
import HomePage from "./pages/home";
import ShopPage from "./pages/shop";
import DashboardPage from "./pages/admin/dashboard";
import RegisterPage from "./pages/auth/register";
import LoginPage from "./pages/auth/login";
import LayoutAdmin from "./components/admin/layout.admin";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAccount } from "./redux/slice/accountSlide";
import LayoutApp from "./components/share/layout.app";
import ProtectedRoute from "./components/share/protected-route";
import VaccinePage from "./pages/admin/vaccine";
import CenterPage from "./pages/admin/center";
import UserPage from "./pages/admin/user";
import VaccineCenterPage from "./pages/center";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    )
      return;
    dispatch(fetchAccount());
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LayoutApp>
          <LayoutClient />
        </LayoutApp>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "shop", element: <ShopPage /> },
        { path: "center", element: <VaccineCenterPage /> },
      ],
    },

    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <LayoutApp>
            <LayoutAdmin />
          </LayoutApp>
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <DashboardPage />,
        },
        {
          path: "vaccines",
          element: <VaccinePage />,
        },
        {
          path: "users",
          element: <UserPage />,
        },
        {
          path: "centers",
          element: <CenterPage />,
        },
      ],
    },

    {
      path: "/login",
      element: <LoginPage />,
    },

    {
      path: "/register",
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
