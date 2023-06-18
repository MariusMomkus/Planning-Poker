import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import AppRoutes from "../routesConfig/AppRoutes";

import axios from "axios";
import { useEffect, useState } from "react";
import { getSelectedDeckCardsUrl } from "../../api/ApiUrls";
import DeleteRoom from "./DeleteRoom";
import EditRoom from "./EditRoom";

export default function RoomInfo({ room, setLastUpdate, owner, creatorName }) {
  const navigate = useNavigate();
  const [openMoreDetails, setopenMoreDetails] = useState(false);
  const [deckInfo, setDeckInfo] = useState([]);

  const handleClickopenMoreDetails = () => {
    navigate(`${AppRoutes.ROOM_LIST}/${room.roomId}`);
  };

  useEffect(() => {
    if (room.deckId == null) {
      console.error("Room has no cards deck");
    } else {
      axios
        .get(`${getSelectedDeckCardsUrl}/${room.deckId}`)
        .then((response) => {
          if (response.data) {
            setDeckInfo(response.data);
          } else {
            setDeckInfo({
              deckName: "Unexpected errror occured in retrieving decks",
              cardValues: "",
            });
          }
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    }
  }, [room.deckId]);

  return (
    <>
      <TableRow key={room.id} className="room-info-row">
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setopenMoreDetails(!openMoreDetails)}
          >
            {openMoreDetails ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          onClick={handleClickopenMoreDetails}
        >
          {room.roomName}
        </TableCell>
        <TableCell align="left" onClick={handleClickopenMoreDetails}>
          {room.teamName}
        </TableCell>
        <TableCell align="left" onClick={handleClickopenMoreDetails}>
          {room.sprintName}
        </TableCell>
        {!owner ? (
          <TableCell align="left" onClick={handleClickopenMoreDetails}>
            {creatorName}
          </TableCell>
        ) : (
          <></>
        )}
        <TableCell align="center" onClick={handleClickopenMoreDetails}>
          <FiberManualRecordIcon
            className={room.active ? "room-info-active" : "room-info-inactive"}
          ></FiberManualRecordIcon>
        </TableCell>

        {owner ? (
          <>
            <TableCell align="center">
              <Box className="room-action-icon-container">
                <EditRoom
                  room={room}
                  setLastUpdate={setLastUpdate}
                  className="action-icons"
                />
                <DeleteRoom
                  room={room}
                  setLastUpdate={setLastUpdate}
                  className="action-icons"
                />
              </Box>
            </TableCell>
          </>
        ) : (
          <></>
        )}
      </TableRow>

      <TableRow>
        <TableCell className="room-info-more-details" colSpan={6}>
          <Collapse in={openMoreDetails} timeout="auto" unmountOnExit>
            <Typography>{`Description: ${room.description}`}</Typography>
            <Typography>
              {`Deck: ${deckInfo.deckName} (${deckInfo.cardValues})`}
            </Typography>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
