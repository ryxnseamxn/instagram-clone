import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import App from "./App"; 
import { Navigate } from "react-router-dom";
import Profile from "./components/views/profile";
import Login from "./components/views/login";
import Logout from "./components/utils/logout";
import Feed from "./components/views/feed"; 
import NotFound from "./components/views/404";
import AddPost from "./components/views/addPost";
import User from "./components/views/user";
import SearchPage from "./components/views/search";

const router = createBrowserRouter([
  {
    path: "",
    element: <Navigate to="login" replace />,
  },
  {
    path: "profile",
    element: <Profile />
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "logout",
    element: <Logout />
  },
  {
    path:"feed",
    element: <Feed /> 
  },
  {
    path:"*",
    element: <NotFound />
  },
  {
    path:"post",
    element: <AddPost />
  }, 
  {
    path:"user/:username",
    element: <User />
  },
  {
    path:"search",
    element: <SearchPage />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);