import Home from "../pages/Home";
import PostList from "../pages/PostList";
import Post from "../pages/Post";
import Login from "../pages/Login";

export const PublicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/posts", element: <PostList /> },
  { path: "/posts/:id", element: <Post /> },
  { path: "/login", element: <Login /> },
];