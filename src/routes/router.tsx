import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import PostList from "../pages/PostList";
import Post from "../pages/Post";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import ProtectedRoutes from "./ProtectedRoutes";

// Create router configuration for the application
export const router = createBrowserRouter([
  // Public routes
  { path: "/", element: <Home /> },
  { path: "/posts", element: <PostList /> },
  { path: "/posts/:id", element: <Post /> },
  { path: "/login", element: <Login /> },
  // Protected admin route
  { path: "/admin",
    element: (
      <ProtectedRoutes>
        <Admin />
      </ProtectedRoutes>
    )
  }
]);