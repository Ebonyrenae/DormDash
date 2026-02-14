import { createBrowserRouter } from 'react-router-dom';
import Landing from '../pages/Landing/Landing';
import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';
import Dashboard from '../pages/Dashboard/Dashboard';
import Home from '../pages/Home/Home';
import BrowseJobs from '../pages/BrowseJobs/BrowseJobs';
import AllJobs from '../pages/AllJobs/AllJobs';
import MyJobs from '../pages/MyJobs/MyJobs';
import PostJob from '../pages/PostJob/PostJob';
import MyRequests from '../pages/MyRequests/MyRequests';
import Messages from '../pages/Messages/Messages';
import DirectMessage from '../pages/Messages/DirectMessage';
import Settings from '../pages/Settings/Settings';
import NotFound from '../pages/NotFound/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Landing,
  },
  {
    path: '/signin',
    Component: SignIn,
  },
  {
    path: '/signup',
    Component: SignUp,
  },
  {
    path: '/dashboard',
    Component: Dashboard,
  },
  {
    path: '/home',
    Component: Home,
  },
  {
    path: '/jobs',
    Component: BrowseJobs,
  },
  {
    path: '/all-jobs',
    Component: AllJobs,
  },
  {
    path: '/my-jobs',
    Component: MyJobs,
  },
  {
    path: '/post-job',
    Component: PostJob,
  },
  {
    path: '/my-requests',
    Component: MyRequests,
  },
  {
    path: '/messages',
    Component: Messages,
  },
  {
    path: '/messages/:id',
    Component: DirectMessage,
  },
  {
    path: '/settings',
    Component: Settings,
  },
  {
    path: '*',
    Component: NotFound,
  },
]);