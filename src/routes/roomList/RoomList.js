import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { getParticipationRoomsById, getUserRoomsById } from "../../api/ApiUrls";
import RoomInfo from "./RoomInfo";
import "./styles/RoomListStyles.css";

export default function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [participationRooms, setParticipationRooms] = useState([]);
  const [ownedRoomsErrorMessage, setOwnedRoomsErrorMessage] = useState("");
  const [participationRoomsErrorMessage, setParticipationRoomsErrorMessage] =
    useState("");

  const [lastUpdate, setLastUpdate] = useState(Date.now());

  function checkIsOwner(creatorId) {
    return creatorId.toString() === sessionStorage.getItem("loggedUserId")
      ? true
      : false;
  }
  // GET
  useEffect(() => {
    const loggedUserId = sessionStorage.getItem("loggedUserId");
    axios
      .get(`${getUserRoomsById}/${loggedUserId}`)
      .then((res) => {
        if (res.status === 204) {
          setRooms([]);
          // setOwnedRoomsErrorMessage("You haven't created any rooms.");
        } else {
          setRooms(res.data);
        }
      })
      .catch(() =>
        setOwnedRoomsErrorMessage("Error in retrieving owned rooms. ")
      );

    axios
      .get(`${getParticipationRoomsById}/${loggedUserId}`)
      .then((res) => {
        if (res.status === 204) {
          setParticipationRooms([]);
          // setParticipationRoomsErrorMessage(
          //   "You haven't been invited to any rooms."
          // );
        } else {
          setParticipationRooms(res.data);
        }
      })
      .catch(() =>
        setParticipationRoomsErrorMessage("Error in retrieving invited rooms. ")
      );
  }, [lastUpdate, participationRoomsErrorMessage]);

  return (
    <Box className="room-list-wrapper">
      {/* <Box className="header-spacer"></Box> */}
      <Box className="room-list-container">
        <Box className="room-list-owned-rooms">
          <h1 className="room-list-header">Owned rooms</h1>
          <Box id="room-list-error-message">{ownedRoomsErrorMessage}</Box>
          <Box className="table-container">
            <Table className="table" id="main-table">
              <TableHead className="table-header">
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>RoomName</TableCell>
                  <TableCell align="left">Team name</TableCell>
                  <TableCell align="left">Sprint name</TableCell>
                  <TableCell align="center">Active</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rooms.length > 0 ? (
                  rooms.map((room) => (
                    <RoomInfo
                      key={room.roomId}
                      room={room}
                      setLastUpdate={setLastUpdate}
                      owner={checkIsOwner(room.creatorId)}
                    />
                  ))
                ) : (
                  <TableRow className="room-info-row">
                    <TableCell colSpan={6}>No data</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Box>
      <Box className="room-list-container">
        <Box className="room-list-invited-rooms">
          <h1 className="room-list-header">Invited rooms</h1>
          <Box id="room-list-error-message">
            {participationRoomsErrorMessage}
          </Box>
          <Box className="table-container">
            <Table className="table">
              <TableHead className="table-header">
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>RoomName</TableCell>
                  <TableCell align="left">Team name</TableCell>
                  <TableCell align="left">Sprint name</TableCell>
                  <TableCell align="left">Creator name</TableCell>
                  <TableCell align="center">Active</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {participationRooms.length > 0 ? (
                  participationRooms.map((participationRoom) => (
                    <RoomInfo
                      key={participationRoom.roomId}
                      room={participationRoom}
                      setLastUpdate={setLastUpdate}
                      owner={checkIsOwner(participationRoom.creatorId)}
                      creatorName={participationRoom.creatorName}
                    />
                  ))
                ) : (
                  <TableRow className="room-info-row">
                    <TableCell colSpan={6}>No data</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
