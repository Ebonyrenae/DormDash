import { createBrowserRouter } from "react-router-dom";
import Gender from "../pages/AdditionalInfoPage/Gender";
import AcademicInfo from "../pages/AdditionalInfoPage/AcademicInfo";

import Dashboard from "../pages/Dashboard/Dashboard";
import SignUp from "../pages/SignUp/SignUp";
import PostJob from "../pages/PostJob/PostJob";
import Landing from "../pages/Landing/Landing";
import SignIn from "../pages/SignIn/SignIn";
import AllJobs from "../pages/AllJobs/AllJobs";
import MyRequests from "../pages/MyRequests/MyRequests";
import Messages from "../pages/Messages/Messages";
import DirectMessage from "../pages/Messages/DirectMessage";
import DOB from "../pages/AdditionalInfoPage/DOB";
import { Component } from "react";
import Settings from "../pages/Settings/SettingsWithBackend";
import Profile from "../pages/Profile/Profile";

export const router = createBrowserRouter(
  
  
  [ 
    
    {path: "/",
      Component: SignUp,
    },

    {path: "/dob",
      Component: DOB,
    },

    {path: "/gender",
      Component: Gender,
    },

    {path: "/academic-info",
      Component: AcademicInfo,
    },

    
    {
      path: "/dashboard",
      Component: Dashboard,
    },

     {
      path: "/post-job",
      Component: PostJob,
    },

     { path: "/",
      Component: Landing,
    },
    {
      path: "/signin",
      Component: SignIn,
    },
  

    {
      path: "/all-jobs",
      Component: AllJobs,
    },

   
    {
      path: "/my-requests",
      Component: MyRequests,
    },
    {
      path: "/messages",
      Component: Messages,
    },
    {
      path: "/messages/:id",
      Component: DirectMessage,
    },
    {
      path: "/settings",
      Component: Settings,
    },
    {
      path: "/profile",
      Component: Profile,
    },
  ],

  {
    basename: import.meta.env.MODE === 'production' ? '/CSE442/2026-Spring/cse-442i/' : '/',
  },
);





    
    
  

       

  
