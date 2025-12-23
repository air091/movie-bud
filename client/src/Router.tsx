import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { protectedLoader } from "./loaders/protectedLoader";
import { unprotectedLoader } from "./loaders/unprotectedLoader";
import Dashboard from "./pages/admin/Dashboard";
import AdminLayout from "./pages/admin/AdminLayout";
import MovieManagement from "./pages/admin/MovieManagement";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: protectedLoader,
    HydrateFallback: () => <div>Checking authentication...</div>,
  },
  {
    path: "/login",
    element: <Login />,
    loader: unprotectedLoader,
    HydrateFallback: () => <div>Loading...</div>,
  },
  {
    path: "/register",
    element: <Register />,
    loader: unprotectedLoader,
    HydrateFallback: () => <div>Loading...</div>,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    loader: protectedLoader,
    HydrateFallback: () => <div>Checking authentication...</div>,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "movies",
        element: <MovieManagement />,
      },
    ],
  },
]);

export default Router;
