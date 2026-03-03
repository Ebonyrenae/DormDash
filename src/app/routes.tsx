import { createBrowserRouter } from "react-router-dom";



import Dashboard from "../pages/Dashboard/Dashboard";
import SignUp from "../pages/SignUp/SignUp";
import PostJob from "../pages/PostJob/PostJob";
import Landing from "../pages/Landing/Landing";
import SignIn from "../pages/SignIn/SignIn";
import AllJobs from "../pages/AllJobs/AllJobs";
import MyRequests from "../pages/MyRequests/MyRequests";
import Messages from "../pages/Messages/Messages";
import DirectMessage from "../pages/Messages/DirectMessage";

import { Component } from "react";
import Settings from "../pages/Settings/SettingsWithBackend";
import Profile from "../pages/Profile/Profile";
import { Add } from "@mui/icons-material";
import AcademicInfo from "../pages/AdditionalInfoPage/AcademicInfo";

import AboutYourself from "../pages/AdditionalInfoPage/AboutYourself";

export const router = createBrowserRouter(
  
  
  [ 
    
    {path: "/",
      Component: SignUp,
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
      path: "/academic-info",
      Component: AcademicInfo, 
    },

   
    {
      path: "/profile/:id?", // The '?' makes the ID optional so your own profile still works!
      Component: Profile,
    },
  ],

  {
    basename: import.meta.env.MODE === 'production' ? '/CSE442/2026-Spring/cse-442i/' : '/',
  },
);





    
    
  



  

