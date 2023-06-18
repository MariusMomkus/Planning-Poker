import React from "react";
import "./Logout.css";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Slide,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router";
import AppRoutes from "../routesConfig/AppRoutes";
import { useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Logout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("loggedUserId");
    sessionStorage.removeItem("loggedUserName");
    navigate(AppRoutes.LOGIN);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box className="side-bar-logout-wrapper" onClick={handleClickOpen}>
        <Box className="side-bar-logout-content">
          <LogoutIcon />
          <Box>Log out</Box>
        </Box>
        <Divider />
      </Box>

      <Dialog
        className="logout-dialog-slide"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="logout-context-description">
          Do you really want to log out?
        </DialogTitle>
        <DialogActions className="logout-action-buttons">
          <Button onClick={handleLogout} variant="contained" color="error">
            Yes
          </Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
