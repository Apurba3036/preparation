import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Main from "./Layout/Main";
import Home from "./Pages/Home";


import Listings from "./Pages/Listing/All/Listings";
import CreateListing from "./Pages/Listing/Create/CreateListing";
import LoginPage from "./Pages/LoginPage";
import RoomDetails from "./Pages/RoomDetails";
import Signup from "./Pages/Signup";
import AuthProvider from "./Providers/AuthProvider";
import Mapinput from "./Pages/Map/Mapinput";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <LoginPage></LoginPage>,
      },
      {
        path: "/details/:id",
        element: <RoomDetails />,
      },
 
      {
        path: "/listing/new",
        element: <CreateListing />,
      },
      {
        path: "/listing",
        element: <Listings />,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/heat",
        element: <Mapinput></Mapinput>
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="mx-auto">
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>
  </div>
);
