import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";
import AcademicInfo from "../pages/AdditionalInfoPage/AcademicInfo";
import Dashboard from "../pages/Dashboard/Dashboard";
import SignUp from "../pages/SignUp/SignUp";
import AllJobs from "../pages/AllJobs/AllJobs";
import PostJob from "../pages/PostJob/PostJob";
import Profile from "../pages/Profile/Profile";
import Landing from "../pages/Landing/Landing";
import SignIn from "../pages/SignIn/SignIn";
import MyRequests from "../pages/MyRequests/MyRequests";
import Messages from "../pages/Messages/Messages";
import DirectMessage from "../pages/Messages/DirectMessage";
import { Component } from "react";
import Settings from "../pages/Settings/SettingsWithBackend";

export const router = createBrowserRouter(
  [
    // Public routes
    { path: "/", Component: Landing },
    { path: "/signup", Component: SignUp },
    { path: "/signin", Component: SignIn },

    // Protected routes: session checked via api/me.php before rendering
    {
      path: "/messages",
      element: (
        <ProtectedRoute>
          <Messages />
        </ProtectedRoute>
      ),
    },
    {
      path: "/messages/:userId",
      element: (
        <ProtectedRoute>
          <DirectMessage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/settings",
      element: (
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      ),
    },
    {
      path: "/academic-info",
      element: (
        <ProtectedRoute>
          <AcademicInfo />
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/all-jobs",
      element: (
        <ProtectedRoute>
          <AllJobs />
        </ProtectedRoute>
      ),
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
    },
    {
      path: "/profile/:userId",
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
    },
    {
      path: "/post-job",
      element: (
        <ProtectedRoute>
          <PostJob />
        </ProtectedRoute>
      ),
    },
    {
      path: "/my-requests",
      Component: MyRequests,
    },

    {
      path: "/about-yourself",
      Component: AboutYourself,
    },

  ],

  {
    basename: import.meta.env.MODE === 'production' ? '/CSE442/2026-Spring/cse-442i/' : '/',
  },
);





    
 

