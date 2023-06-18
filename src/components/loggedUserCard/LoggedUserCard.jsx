import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box } from "@mui/material";
import "./LoggedUserCardStyles.css";

function LoggedUserCard() {
  const userName = sessionStorage.getItem("loggedUserName");
  return (
    <Box className="side-bar-user-card">
      <AccountCircleIcon />
      <Box className="side-bar-user-name">{userName}</Box>
    </Box>
  );
}

export default LoggedUserCard;
