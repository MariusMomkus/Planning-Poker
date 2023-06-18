import * as React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { Link } from "react-router-dom";
import appRoutes from "./routesConfig/AppRoutes.js";

import "./LoggedUserUI.css";
import logo from "./icons/appIcon.png";
import { useState } from "react";
import LoggedUserCard from "../components/loggedUserCard/LoggedUserCard";
import Logout from "./logout/Logout";

// const drawerWidth = 230;

export default function LoggedUserUI(props) {
  const isAppWidthLessThan750px = useMediaQuery(
    (theme) => `(max-width: 770px)`
  );
  const drawerWidth = isAppWidthLessThan750px ? 150 : 230;

  const { window } = props;
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box className="side-nav-bar">
      <Toolbar />
      <Divider />
      <List>
        <LoggedUserCard />
        <Divider />
        <ListItem key={"Create room"} disablePadding>
          <ListItemButton
            component={Link}
            to={appRoutes.CREATE_ROOM}
            selected={location.pathname === appRoutes.CREATE_ROOM}
          >
            <ListItemText primary={"Create Room"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"My Rooms"} disablePadding>
          <ListItemButton
            component={Link}
            to={appRoutes.ROOM_LIST}
            selected={location.pathname === appRoutes.ROOM_LIST}
          >
            <ListItemText primary={"My Rooms"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Logout />
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box className="box-flex">
      <CssBaseline />
      <AppBar
        className="app-header"
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar className="toolbar-color">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            className="header-wrapper"
            noWrap
            component="div"
          >
            <img className="app-logo" src={logo} alt="App logo " />
            Planning Poker
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {/* <RouteRenderer /> */}
    </Box>
  );
}

LoggedUserUI.propTypes = {
  window: PropTypes.func,
};
