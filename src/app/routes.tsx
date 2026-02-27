import { createBrowserRouter } from "react-router-dom";
import Gender from "../pages/AdditionalInfoPage/Gender";
import AcademicInfo from "../pages/AdditionalInfoPage/AcademicInfo";

import Dashboard from "../pages/Dashboard/Dashboard";
import SignUp from "../pages/SignUp/SignUp";
/*import Landing from "../pages/Landing/Landing";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../pages/Dashboard/Dashboard";

import AllJobs from "../pages/AllJobs/AllJobs";

import PostJob from "../pages/PostJob/PostJob";
import MyRequests from "../pages/MyRequests/MyRequests";
import Messages from "../pages/Messages/Messages";
import DirectMessage from "../pages/Messages/DirectMessage";
import Settings from "../pages/Settings/Settings";
import NotFound from "../pages/NotFound/NotFound";*/

import DOB from "../pages/AdditionalInfoPage/DOB";
import { Component } from "react";

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
  ],

  {
    basename: "/CSE442/2026-Spring/cse-442i/Onboarding/",
  },
);





    /*
      path: "/",
      Component: Landing,
    },
    {
      path: "/signin",
      Component: SignIn,
    },
    {
      path: "/signup",
      Component: SignUp,
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
      path: "/post-job",
      Component: PostJob,
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
      path: "*",
      Component: NotFound,
    },*/


   