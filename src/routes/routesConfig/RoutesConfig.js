import { Login } from "../login/Login";
import { SignUp } from "../login/SignUp";
import CreateRoom from "../roomList/CreateRoom";
import RoomList from "../roomList/RoomList";
import Room from "../room/Room";
import LoggedUserUI from "../LoggedUserUI";
import { Outlet, Navigate } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Logout from "../logout/Logout";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../notFound/NotFound";

const RoutesConfig = [
  { path: AppRoutes.LOGIN, element: <Login />, redirect: true },
  { path: AppRoutes.SIGN_UP, element: <SignUp /> },
  {
    path: AppRoutes.LOGGED_USER_UI,
    element: (
      <>
        <ProtectedRoute>
          <LoggedUserUI />
          <Outlet />
        </ProtectedRoute>
      </>
    ),
    children: [
      { path: AppRoutes.CREATE_ROOM, element: <CreateRoom /> },
      { path: AppRoutes.ROOM_LIST, element: <RoomList /> },
      { path: AppRoutes.LOGOUT, element: <Logout /> },
      { path: AppRoutes.ROOM, element: <Room /> },
    ],
  },
  { path: AppRoutes.DEFAULT, element: <Navigate to={AppRoutes.LOGIN} /> },
  { path: AppRoutes.NOT_FOUND, element: <NotFound /> },
];

export default RoutesConfig;
