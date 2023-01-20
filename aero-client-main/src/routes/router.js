import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import Main from "../layout/Main";
import Blogs from "../Pages/Blogs/Blogs";
import AllSellers from "../Pages/Dashboard/AllSellers";
import AllBuyers from "../Pages/Dashboard/AllBuyers";
import Welcome from "../Pages/Dashboard/Welcome";
import Categories from "../Pages/Home/Categories/Categories";
import CategoryServices from "../Pages/Home/CategoryServices/CategoryServices";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Login/SignUp";
import ErrorPage from "../Pages/Shared/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import AllReports from "../Pages/Dashboard/AllReports";
import MyOrders from "../Pages/Dashboard/MyOrders";
import AddProduct from "../Pages/Dashboard/AddProduct";
import MyProducts from "../Pages/Dashboard/MyProducts";
import AdminRoute from "./AdminRoute";
import SellerRoute from "./SellerRoute";
import Payment from "../Pages/Dashboard/Payment/Payment";



export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/categories',
        element: <Categories />
      },
      {
        path: '/category/:id',
        element: <PrivateRoute><CategoryServices /></PrivateRoute>
      },
      {
        path: '/blogs',
        element: <Blogs />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/sign-up',
        element: <SignUp />
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        path: '',
        element: <Welcome />
      },
      {
        path: '/dashboard/all-buyers',
        element: <AdminRoute><AllBuyers /></AdminRoute>
      },
      {
        path: '/dashboard/all-sellers',
        element: <AdminRoute><AllSellers /></AdminRoute>
      },
      {
        path: '/dashboard/all-reports',
        element: <AdminRoute><AllReports /></AdminRoute>
      },
      {
        path: '/dashboard/my-orders',
        element: <MyOrders />
      },
      {
        path: '/dashboard/add-product',
        element: <SellerRoute><AddProduct /></SellerRoute>
      },
      {
        path: '/dashboard/my-products',
        element: <SellerRoute><MyProducts /></SellerRoute>
      },
      {
        path: '/dashboard/payment/:id',
        element: <PrivateRoute><Payment /></PrivateRoute>
      },
    ]
  }
])