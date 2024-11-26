import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutClient from "./components/client/layout.client";
import NotFound from "./components/share/not.found";
import HomePage from "./pages/home";
import ShopPage from "./pages/shop";
import DashboardPage from "./pages/admin/dashboard";
import RegisterPage from "./pages/auth/register";
import LoginPage from "./pages/auth/login";
import LayoutAdmin from "./components/admin/layout.admin";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutClient />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "shop", element: <ShopPage /> },
      ],
    },

    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <DashboardPage />,
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
