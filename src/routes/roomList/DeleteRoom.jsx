import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
} from "@mui/material";
import { deleteRoomUrl } from "../../api/ApiUrls";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteRoom({ room, setLastUpdate }) {
  const [open, setOpen] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleYes = () => {
    axios
      .delete(`${deleteRoomUrl}/${room.roomId}?userId=${loggedUserId}`)
      .then((res) => setLastUpdate(Date.now()))
      .catch((error) => console.error(error));
    setOpen(false);
  };

  const handleNo = () => {
    setOpen(false);
  };

  useEffect(() => {
    const sessionUserId = sessionStorage.getItem("loggedUserId");
    setLoggedUserId(sessionUserId);
  }, []);

  return (
    <>
      <DeleteForeverIcon
        className="delete-room-icon"
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="delete-room-context-description">
          {`Do you really want to delete room`}{" "}
          <Box component="span" className="delete-room-room-name">
            {room.roomName}
          </Box>
          {`?`}
        </DialogTitle>
        <DialogActions className="delete-room-action-buttons">
          <Button onClick={handleYes} variant="contained" color="error">
            Yes
          </Button>
          <Button onClick={handleNo}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
