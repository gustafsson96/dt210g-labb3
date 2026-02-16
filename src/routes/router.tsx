import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/HomePage";
import PostList from "../pages/PostListPage";
import Post from "../pages/PostPage";
import Login from "../pages/LoginPage";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminCreatePost from "../pages/AdminCreatePost";
import AdminEditPost from "../pages/AdminEditPost";
import AdminPage from "../pages/AdminPage";

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
        <AdminPage />
      </ProtectedRoutes>
    ),
    children: [
      { path: "create", element: <AdminCreatePost /> },
      { path: "edit/:id", element: <AdminEditPost />}
    ]
  }
]);