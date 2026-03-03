import { createBrowserRouter } from "react-router-dom";
<<<<<<< HEAD
import Gender from "../pages/AdditionalInfoPage/Gender";
import AcademicInfo from "../pages/AdditionalInfoPage/AcademicInfo";

import Dashboard from "../pages/Dashboard/Dashboard";
import SignUp from "../pages/SignUp/SignUp";
import AllJobs from "../pages/AllJobs/AllJobs";
import PostJob from "../pages/PostJob/PostJob";
import DOB from "../pages/AdditionalInfoPage/DOB";
import Profile from "../pages/Profile/Profile";
import { Component } from "react";
/*import Landing from "../pages/Landing/Landing";
=======
import Landing from "../pages/Landing/Landing";
>>>>>>> d03e7560571c00c1560b56fffbcc6f889a5f06c0
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../pages/Dashboard/Dashboard";

<<<<<<< HEAD
=======
import DOB from "../pages/AdditionalInfoPage/DOB";

import AllJobs from "../pages/AllJobs/AllJobs";
>>>>>>> d03e7560571c00c1560b56fffbcc6f889a5f06c0



import MyRequests from "../pages/MyRequests/MyRequests";
import Messages from "../pages/Messages/Messages";
import DirectMessage from "../pages/Messages/DirectMessage";
<<<<<<< HEAD
import Settings from "../pages/Settings/Settings";
import NotFound from "../pages/NotFound/NotFound";*/



import Settings from "../pages/Settings/SettingsWithBackend";


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






    /*
=======
import Settings from "../pages/Settings/SettingsWithBackend";
import Profile from "../pages/Profile/Profile";
import { Add } from "@mui/icons-material";
import AcademicInfo from "../pages/AdditionalInfoPage/AcademicInfo";
import Gender from "../pages/AdditionalInfoPage/Gender";

export const router = createBrowserRouter(
  [
    {
>>>>>>> d03e7560571c00c1560b56fffbcc6f889a5f06c0
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
   
<<<<<<< HEAD
=======

    {
      path: "/dob",
      Component: DOB ,
    },

    {
      path: "/academic-info",
      Component: AcademicInfo, 
    },

    {
      path: "/gender",
      Component: Gender, 
    },

    {
      path: "/profile/:id?", // The '?' makes the ID optional so your own profile still works!
      Component: Profile,
    },

    








>>>>>>> d03e7560571c00c1560b56fffbcc6f889a5f06c0
  ],
  {
        basename: import.meta.env.MODE === 'production' ? '/CSE442/2026-Spring/cse-442i/' : '/',

  },
);