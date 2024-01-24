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
import EditCarPage from "../pages/EditCarPage";
import Authenticated from "../features/auth/RedirectIfNotAuthenticated";
import CheckOutPage from "../pages/CheckOutPage";
import BookSuccessPage from "../pages/BookSuccessPage";
import UserBookCarPage from "../pages/UserBookCarPage";
import AdminBookCarPage from "../pages/AdminBookCarPage";
import RedirectIfNotAdmin from "../features/auth/RedirectIfNotAdmin";
import AdminPendingCarPage from "../pages/AdminPendingCarPage";

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
      {
        path: "allcars",
        element: (
          <Authenticated>
            <AllCarsPage />
          </Authenticated>
        ),
      },
      {
        path: "allcars/:carId",
        element: (
          <Authenticated>
            <DetailCarPage />
          </Authenticated>
        ),
      },
      {
        path: "sellcar",
        element: (
          <RedirectIfNotAdmin>
            <SellCarPage />
          </RedirectIfNotAdmin>
        ),
      },
      {
        path: "editcar/:carId",
        element: (
          <RedirectIfNotAdmin>
            <EditCarPage />
          </RedirectIfNotAdmin>
        ),
      },
      {
        path: "checkout/:carId",
        element: (
          <Authenticated>
            <CheckOutPage />
          </Authenticated>
        ),
      },
      {
        path: "booksuccess/:carId",
        element: (
          <Authenticated>
            <BookSuccessPage />
          </Authenticated>
        ),
      },
      {
        path: "bookcar",
        element: (
          <Authenticated>
            <UserBookCarPage />
          </Authenticated>
        ),
      },
      {
        path: "adminbookcar",
        element: (
          <RedirectIfNotAdmin>
            <AdminBookCarPage />
          </RedirectIfNotAdmin>
        ),
      },
      {
        path: "adminpendingcar",
        element: (
          <RedirectIfNotAdmin>
            <AdminPendingCarPage />
          </RedirectIfNotAdmin>
        ),
      },
    ],
  },
]);

export default function Route() {
  return <RouterProvider router={router} />;
}
