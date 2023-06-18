const AppRoutes = {
  DEFAULT: "/",
  LOGIN: "/login",
  SIGN_UP: "/signUp",
  LOGGED_USER_UI: "/loggeduserui",
  CREATE_ROOM: "/loggeduserui/createRoom",
  ROOM_LIST: "/loggeduserui/roomList",
  ROOM: "/loggeduserui/roomList/:roomId",
  LOGOUT: "/loggeduserui/logout",
  NOT_FOUND: "*",
  NOT_FOUND_LOGGED_USER: "/loggeduserui/*",
};

export default AppRoutes;
