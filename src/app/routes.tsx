import { createBrowserRouter } from "react-router-dom";

import AcademicInfo from "../pages/AdditionalInfoPage/AcademicInfo";

import Dashboard from "../pages/Dashboard/Dashboard";
import SignUp from "../pages/SignUp/SignUp";
import AllJobs from "../pages/AllJobs/AllJobs";
import PostJob from "../pages/PostJob/PostJob";
import DOB from "../pages/AdditionalInfoPage/DOB";
import Profile from "../pages/Profile/Profile";
import { Component } from "react";
import Landing from "../pages/Landing/Landing";
import SignIn from "../pages/SignIn/SignIn";
import MyRequests from "../pages/MyRequests/MyRequests";
import Messages from "../pages/Messages/Messages";
import DirectMessage from "../pages/Messages/DirectMessage";
import Settings from "../pages/Settings/SettingsWithBackend";


export const router = createBrowserRouter(
  
  
  [ 


    
    {path: "/",
      Component: SignUp,
    },

    {path: "/dob",
      Component: DOB,
    },

    {path: "/signin",
      Component: SignIn,
    },




    
    {path: "/settings",
      Component: Settings,
    },

    {path: "/academic-info",
      Component: AcademicInfo,
    },

    
    {
      path: "/dashboard",
      Component: Dashboard,
    },
    {
      path: "/all-jobs",
      Component: AllJobs,
    },

     {
      path: "/profile",
      Component: Profile,
    },

     {
      path: "/post-job",
      Component: PostJob,
    },

  ],

  {
    // The (import.meta as any) fix bypasses the TS error
    basename: (import.meta as any).env?.MODE === 'production' ? '/CSE442/2026-Spring/cse-442i/' : '/',
  }
);




