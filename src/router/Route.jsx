import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import Layout from "../layout/Layout";
import RegisterPage from "../pages/RegisterPage";
import AllCarsPage from "../pages/AllCarsPage";
import RedirectIfAuthenticated from "../features/auth/RedirectIfAuthenticated";
import DetailCarPage from "../pages/DetailCarPage";
import SellCarPage from "../pages/SellCarPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "login",
        element: (
          <RedirectIfAuthenticated>
            <LoginPage />
          </RedirectIfAuthenticated>
        ),
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      { path: "allcars", element: <AllCarsPage /> },
      { path: "detailcar", element: <DetailCarPage /> },
      { path: "sellcar", element: <SellCarPage /> },
    ],
  },
]);

export default function Route() {
  return <RouterProvider router={router} />;
}
