import { createHashRouter } from "react-router-dom";

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
import AboutYourself from "../pages/AdditionalInfoPage/AboutYourself";
import Settings from "../pages/Settings/SettingsWithBackend";
import YourJobs from "../pages/YourJobs/YourJobs";
import JobDetailsPage from "../pages/JobDetailsPage/JobDetails";
import RecentActivities from "../pages/RecentActivities/RecentActivities";
import MyRequestDetails from "../pages/MyRequestDetails/myrequestdetails";
import MyJobDetail from "../pages/MyJobDetail/myjobdetails";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createHashRouter([
  // Public routes
  { path: "/", Component: Landing },
  { path: "/signup", Component: SignUp },
  { path: "/signin", Component: SignIn },

  { path: "/messages", element: (<ProtectedRoute><Messages /></ProtectedRoute>) },
  { path: "/Jobdetails/:jobId", element: (<ProtectedRoute><JobDetailsPage /></ProtectedRoute>) },
  { path: "/messages/:userId", element: (<ProtectedRoute><DirectMessage /></ProtectedRoute>) },
  { path: "/settings", element: (<ProtectedRoute><Settings /></ProtectedRoute>) },
  { path: "/academic-info", element: (<ProtectedRoute><AcademicInfo /></ProtectedRoute>) },
  { path: "/dashboard", element: (<ProtectedRoute><Dashboard /></ProtectedRoute>) },
  { path: "/recent-activities", element: (<ProtectedRoute><RecentActivities /></ProtectedRoute>) },
  { path: "/all-jobs", element: (<ProtectedRoute><AllJobs /></ProtectedRoute>) },
  { path: "/profile", element: (<ProtectedRoute><Profile /></ProtectedRoute>) },
  { path: "/profile/:userId", element: (<ProtectedRoute><Profile /></ProtectedRoute>) },
  { path: "/post-job", element: (<ProtectedRoute><PostJob /></ProtectedRoute>) },

  {path: "/my-request/:jobId", element: (<ProtectedRoute><MyRequestDetails /></ProtectedRoute>) },
  {path : "/my-job/:jobId", element: (<ProtectedRoute><MyJobDetail /></ProtectedRoute>) },
  {
    path: "/my-requests",
    element: (<ProtectedRoute><MyRequests /></ProtectedRoute>),
  },

  {
    path: "/about-yourself",
    element: (<ProtectedRoute><AboutYourself /></ProtectedRoute>),
  },
  {
    path: "/your-jobs",
    element: (<ProtectedRoute><YourJobs /></ProtectedRoute>),
  },
]);