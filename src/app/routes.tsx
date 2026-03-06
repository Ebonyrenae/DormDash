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

export const router = createHashRouter([
  // Public routes
  { path: "/", Component: Landing },
  { path: "/signup", Component: SignUp },
  { path: "/signin", Component: SignIn },

  { path: "/messages", Component: Messages },
  { path: "/messages/:userId", Component: DirectMessage },
  { path: "/settings", Component: Settings },
  { path: "/academic-info", Component: AcademicInfo },
  { path: "/dashboard", Component: Dashboard },
  { path: "/all-jobs", Component: AllJobs },
  { path: "/profile", Component: Profile },
  { path: "/profile/:userId", Component: Profile },
  { path: "/post-job", Component: PostJob },
  {
    path: "/my-requests",
    Component: MyRequests,
  },

  {
    path: "/about-yourself",
    Component: AboutYourself,
  },
]);
