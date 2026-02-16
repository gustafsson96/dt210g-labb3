import { createBrowserRouter } from "react-router-dom";
import Blog from "../pages/HomePage";
import PostPage from "../pages/PostPage";
import Login from "../pages/LoginPage";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminCreatePost from "../pages/AdminCreatePost";
import AdminEditPost from "../pages/AdminEditPost";
import AdminPage from "../pages/AdminPage";

// Create router configuration for the application
export const router = createBrowserRouter([
  // Public routes
  { path: "/", element: <Blog /> },
  { path: "/posts/:id", element: <PostPage /> },
  { path: "/login", element: <Login /> },
  // Protected admin route
{ path: "/admin", element: <ProtectedRoutes><AdminPage /></ProtectedRoutes> },
{ path: "/admin/create", element: <ProtectedRoutes><AdminCreatePost /></ProtectedRoutes> },
{ path: "/admin/edit/:id", element: <ProtectedRoutes><AdminEditPost /></ProtectedRoutes> }
]);