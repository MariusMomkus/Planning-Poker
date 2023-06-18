import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppRoutes from "../routesConfig/AppRoutes";
import { addRoomUrl, getAllUsersUrl } from "../../api/ApiUrls";
import "./styles/CreateRoomStyles.css";
import SelectCardDeck from "./createRoomComponents/SelectCardDeck";
import axios from "axios";
import SelectParticipants from "./invitedUsers/SelectParticipants";

export default function CreateRoom() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    roomName: "",
    teamName: "",
    sprintName: "",
    description: "",
    deckId: "",
    invitedUsers: [],
  });

  const [loggedUserId, setLoggedUserId] = useState(null);

  const [availableUsers, setAvailableUsers] = useState([]);
  const [invitedUsers, setInvitedUsers] = useState([]);

  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((oldData) => {
      return { ...oldData, [name]: value };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      ...formData,
      active: true,
      creatorId: loggedUserId,
      invitedUserIds: invitedUsers,
    };
    axios
      .post(addRoomUrl, data)
      .then((res) => setOpenDialog(true))
      .catch((error) => setErrorMessage(error));
  }

  function handleCloseDialog() {
    setOpenDialog(false);
    navigate(AppRoutes.ROOM_LIST);
  }

  useEffect(() => {
    const requiredFields = ["roomName", "teamName", "sprintName", "deckId"];
    const requiredFieldsFilled = requiredFields.every(
      (fieldName) => formData[fieldName].trim().length > 0
    );
    setAllFieldsFilled(requiredFieldsFilled);
  }, [formData]);

  useEffect(() => {
    const sessionLoggedUserId = sessionStorage.getItem("loggedUserId");
    setLoggedUserId(sessionLoggedUserId);
  }, []);

  useEffect(() => {
    axios
      .get(getAllUsersUrl)
      .then((res) => {
        setAvailableUsers(
          res.data.filter((user) => user.userId.toString() !== loggedUserId)
        );
      })
      .catch((error) => console.log("error -> " + error));
  }, [loggedUserId, availableUsers]);

  return (
    <Box className="create-room-wrapper">
      <Box className="create-room-container">
        <h1 className="create-room-header">Create new room</h1>
        <form className="create-room-form" onSubmit={handleSubmit}>
          <TextField
            className="create-room-field"
            placeholder="e.g. Alpha team planning poker"
            name="roomName"
            type="text"
            label="Room name"
            variant="outlined"
            size="normal"
            fullWidth
            onChange={handleChange}
            value={formData.roomName}
            required
          />

          <TextField
            className="create-room-field"
            placeholder="e.g. Alpha"
            name="teamName"
            type="text"
            label="Team name"
            variant="outlined"
            size="normal"
            fullWidth
            onChange={handleChange}
            value={formData.teamName}
            required
          />

          <TextField
            className="create-room-field"
            placeholder="e.g. S1SR1"
            name="sprintName"
            type="text"
            label="Sprint name"
            variant="outlined"
            size="normal"
            fullWidth
            onChange={handleChange}
            value={formData.sprintName}
            required
          />

          <TextField
            className="create-room-field"
            placeholder="e.g. Deciding points for user stories."
            name="description"
            type="text"
            label="Description"
            variant="outlined"
            size="normal"
            fullWidth
            onChange={handleChange}
            value={formData.description}
          />

          <SelectCardDeck
            deckId={formData.deckId}
            handleSelectDeck={handleChange}
            fullWidth
            variant="outlined"
          />

          <SelectParticipants
            availableUsers={availableUsers}
            invitedUsers={invitedUsers}
            setInvitedUsers={setInvitedUsers}
            invitedUserIds={[]}
            fullWidth
          />
          <Button
            variant="contained"
            className="create-room-button"
            type="submit"
            disabled={!allFieldsFilled}
          >
            Create room
          </Button>
        </form>
        {errorMessage}

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          className="create-room-success-popup"
        >
          <DialogContent>
            <DialogContentText className="create-room-success-popup-description">
              The room has been created successfully!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>OK</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
