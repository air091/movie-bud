import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { protectedLoader } from "./loaders/protectedLoader";
import { unprotectedLoader } from "./loaders/unprotectedLoader";

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
]);

export default Router;
