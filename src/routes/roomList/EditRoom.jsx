import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import SelectCardDeck from "./createRoomComponents/SelectCardDeck";
import axios from "axios";
import {
  editRoomUrl,
  getParticipantUserIds,
  getAllUsersUrl,
} from "../../api/ApiUrls";
import SelectParticipants from "./invitedUsers/SelectParticipants";

export default function EditRoom({ room, setLastUpdate }) {
  // const navigate = useNavigate();
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [currentInvitedUsers, setCurrentInvitedUsers] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [teamErrorMessage, setTeamErrorMessage] = useState(false);
  const [sprintErrorMessage, setSprintErrorMessage] = useState(false);
  const getParticiapantUserIdsUrl = `${getParticipantUserIds}/${parseInt(
    room.roomId
  )}`;

  const [formData, setFormData] = useState({
    roomId: room.roomId,
    teamName: room.teamName,
    sprintName: room.sprintName,
    description: room.description,
    deckId: +room.deckId,
  });

  const handleClickOpen = () => {
    setOpen(true);
    axios
      .get(getAllUsersUrl)
      .then((res) =>
        setAvailableUsers(
          res.data.filter((user) => user.userId.toString() !== loggedUserId)
        )
      );
    axios
      .get(getParticiapantUserIdsUrl)
      .then((res) => setCurrentInvitedUsers(res.data));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateTeamName = () => {
    if (formData.teamName.length > 0) {
      setTeamErrorMessage(false);
      return true;
    } else {
      setTeamErrorMessage(true);
      return false;
    }
  };

  const validateSprintName = () => {
    if (formData.sprintName.length > 0) {
      setSprintErrorMessage(false);
      return true;
    } else {
      setSprintErrorMessage(true);
      return false;
    }
  };

  const handleUpdate = () => {
    if (validateTeamName() && validateSprintName()) {
      let params = {
        userId: loggedUserId,
        teamName: room.teamName !== formData.teamName ? formData.teamName : "",
        sprintName:
          room.sprintName !== formData.sprintName ? formData.sprintName : "",
        description:
          room.description !== formData.description ? formData.description : "",
        deckId: room.deckId !== formData.deckId ? formData.deckId : null,
        participantIdList: invitedUsers.join(","),
      };
      axios
        .put(`${editRoomUrl}/${room.roomId}`, null, {
          params,
        })
        .then((res) => setLastUpdate(Date.now()))
        .catch((error) => console.error("Error updating data:", error));
      setOpen(false);
    }
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((oldData) => {
      return { ...oldData, [name]: value };
    });
  }

  useEffect(() => {
    const sessionUserId = sessionStorage.getItem("loggedUserId");
    setLoggedUserId(sessionUserId);
  }, []);
  return (
    <>
      <EditIcon className="edit-room-icon" onClick={handleClickOpen} />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="edit-room-title">
          Edit room{" "}
          <Box component="span" className="edit-room-room-name">
            {room.roomName}
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="edit-room-context-description">
            Edit selected room by entering details into given fields.
          </DialogContentText>
          <TextField
            error={teamErrorMessage}
            label="Team name"
            name="teamName"
            value={formData.teamName}
            size="normal"
            onChange={handleChange}
            type="text"
            fullWidth
            variant="outlined"
            helperText={teamErrorMessage ? "Team name cannot be empty." : <></>}
            className="edit-room-input-field"
          />
          <TextField
            error={sprintErrorMessage}
            label="Sprint name"
            name="sprintName"
            value={formData.sprintName}
            size="normal"
            onChange={handleChange}
            type="text"
            fullWidth
            variant="outlined"
            helperText={
              sprintErrorMessage ? "Sprint name cannot be empty." : <></>
            }
            className="edit-room-input-field"
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            size="normal"
            onChange={handleChange}
            type="text"
            fullWidth
            variant="outlined"
            className="edit-room-input-field"
          />
          <SelectCardDeck
            deckId={formData.deckId}
            handleSelectDeck={handleChange}
            variant="outlined"
          />
          <SelectParticipants
            availableUsers={availableUsers}
            invitedUsers={invitedUsers}
            setInvitedUsers={setInvitedUsers}
            handleSelectUsers={handleChange}
            currentInvitedUsers={currentInvitedUsers}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
