import { createBrowserRouter } from "react-router";
import Login from "../pages/LoginPage/Login";
import SignUp from "../pages/SignUp/SignUp";
import HomePage from "../pages/HomePage/HomePage";
import Profile from "../pages/Profile/Profile";
import Upload from "../pages/Upload/Upload";
import Notifications from "../pages/Notifications/Notifications";
import Management from "../pages/Management";
import ProtectedRoute from "./ProtectedRoute";
import Detail from "../pages/Detail/Detail";
import Section from "../pages/Section/Section";
import AddArea from "../pages/AddArea";
import Statistics from "../pages/Statistics";
import AreaDetail from "../pages/AreaDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  { 
    path: "/signup", 
    element: <SignUp /> 
  },
  { 
    path: "/login", 
    element: <Login /> 
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
    path: "/upload",
    element: (
      <ProtectedRoute>
        <Upload />
      </ProtectedRoute>
    ),
  },
  {
    path: "/notifications",
    element: (
      <ProtectedRoute>
        <Notifications />
      </ProtectedRoute>
    ),
  },
  {
    path: "/management",
    element: <Management />,
  },
  {
    path: "/noti/:postId",
    element: (
      <ProtectedRoute>
        <Detail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/section/:sectionId",
    element: (
      <ProtectedRoute>
        <Section />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addarea",
    element: <AddArea />,
  },
  {
    path: "/stat",
    element: <Statistics />,
  },
  {
    path: "/areadetail",
    element: <AreaDetail />,
  },
]);

export default router;
