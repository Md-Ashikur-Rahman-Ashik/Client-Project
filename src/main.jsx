import "./index.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import AuthProvider from "./components/provider/AuthProvider";
import EventDetails from "./components/EventDetails";
import Events from "./pages/Events";
import PrivateRoute from "./components/provider/PrivateRoute";
import Profile from "./pages/Profile";
import JoinedEventPage from "./pages/JoinedEvent"
import { Toaster } from "react-hot-toast";
import EventCalendar from "./pages/EventCalendar";
import CreateEvent from "./pages/CreateEventPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/events",
    element: <Events />,
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: "/create-event",
    element: (
      <PrivateRoute>
        <CreateEvent />
      </PrivateRoute>
    ),
  },
  {
    path: "/joined-events",
    element: (
      <PrivateRoute>
        <JoinedEventPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/events/:id",
    element: (
      <PrivateRoute>
        <EventDetails />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/events-calendar",
    element: (
      <PrivateRoute>
        <EventCalendar />
      </PrivateRoute>
    ),
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <AuthProvider>
    <Toaster position="top-right" />
    <RouterProvider router={router} />
  </AuthProvider>
);
