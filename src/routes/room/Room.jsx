import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import {
  getUserRoomsById,
  roomsUrl,
  storiesUrl,
  usersUrl,
  wsPrefix,
  wsServerUrl,
  wsTargetUrl,
} from "../../api/ApiUrls";
import useDocumentTitle from "../../helper/useDocumentTitle";
import "./Room.css";

import Cards from "./cards/Cards";
import RoomControlPanel from "./roomControlPanel/RoomControlPanel";
import RoomHistory from "./roomHistory/RoomHistory";
import DatePieChart from "./roomHistoryChart/DatePieChart";
import EstimatePieChart from "./roomHistoryChart/EstimatePieChart";
import RoomStory from "./roomStory/RoomStory";
import RoomUsers from "./roomUsers/RoomUsers";
import RoomTitle from "./roomTitle/RoomTitle";
let stompClient = null;
export default function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [secured, setSecured] = useState(false);
  const [user, setUser] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [users, setUsers] = useState([]);
  const [storyName, setStoryName] = useState("");
  const [average, setAverage] = useState(null);
  const [history, setHistory] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [showVote, setShowVote] = useState(false);
  const [room, setRoom] = useState({
    roomId: roomId,
    roomName: "",
    creatorId: null,
    deckId: null,
    sprintName: "",
  });

  useDocumentTitle(room.roomName);

  const onReceived = (payload) => {
    console.log(payload.body);
    const payloadData = JSON.parse(payload.body);
    setUserRole(
      payloadData.users.filter((user) => user.userId == loggedUserId)[0]["role"]
    );
    setUsers(payloadData.users);
    setShowVote(payloadData.showVote);
    setAverage(payloadData.average);
    setStoryName(payloadData.storyName);
  };
  const onReceivedUser = (payload) => {
    setCurrentCard(+payload.body);
  };
  const onConnected = () => {
    stompClient.subscribe(wsPrefix + "/room/" + roomId, onReceived);
    stompClient.subscribe("/user/queue/vote", onReceivedUser, onError);
    stompClient.send(
      wsTargetUrl + "/users/" + roomId,
      {},
      JSON.stringify(loggedUserId)
    );
    stompClient.send(
      "/app/vote",
      {},
      JSON.stringify({ userId: loggedUserId, roomId: roomId })
    );
  };

  const onError = (err) => {
    console.log(err);
  };

  useEffect(() => {
    if (!roomId) return;
    const sessionUserId = sessionStorage.getItem("loggedUserId");
    if (!sessionUserId) navigate("/login");
    axios
      .get(getUserRoomsById + "/room-role/" + roomId, {
        headers: { userId: +sessionUserId },
      })
      .then((res) => {
        setSecured(true);
        setLoggedUserId(+sessionUserId);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) navigate("/loggeduserui/roomList");
        }
      });
  }, []);

  useEffect(() => {
    if (!secured) return;
    axios
      .get(roomsUrl + "/" + roomId)
      .then((res) => {
        if (!!res.data) setRoom(res.data);
      })
      .catch((error) => console.log(error));
  }, [secured]);

  useEffect(() => {
    if (!secured) return;
    axios
      .get(storiesUrl + "/room/" + roomId)
      .then((res) => (!res.data ? setHistory([]) : setHistory(res.data)))
      .catch((error) => console.log(error));
  }, [secured, storyName]);

  useEffect(() => {
    if (!secured) return;
    console.log("room id => " + roomId);
    const sock = new SockJS(wsServerUrl);
    stompClient = over(sock);
    stompClient.connect({}, onConnected, onError);
    const cleanup = () => {
      stompClient.send(
        wsTargetUrl + "/disconnect/" + roomId,
        {},
        JSON.stringify(loggedUserId)
      );
      if (stompClient.connected) stompClient.disconnect();
    };

    window.addEventListener("beforeunload", cleanup);

    return () => {
      window.removeEventListener("beforeunload", cleanup);
      cleanup();
    };
  }, [secured]);

  useEffect(() => {
    if (!secured) return;
    axios.get(usersUrl + "/" + loggedUserId).then((res) => setUser(res.data));
  }, [secured]);

  return (
    <Box className="room-container">
      <Box className="room-top-container">
        <Box className="room-room-name-container">
          <RoomTitle roomName={room.roomName} userRole={userRole} />
        </Box>
        <RoomStory
          stompClient={stompClient}
          roomId={roomId}
          userRole={userRole}
          currentCard={currentCard}
          setCurrentCard={setCurrentCard}
          storyName={storyName}
        />
      </Box>
      <Box className="room-middle-container">
        <Cards
          stompClient={stompClient}
          roomId={roomId}
          loggedUserId={loggedUserId}
          userName={user.userName}
          deckId={room.deckId}
          active={!!storyName && !showVote}
          currentCard={currentCard}
          setCurrentCard={setCurrentCard}
        />
        <Box className="room-users-container">
          <RoomUsers
            users={users}
            showVote={showVote}
            average={average}
            setAverage={setAverage}
          />
          <RoomControlPanel
            stompClient={stompClient}
            userRole={userRole}
            showVote={showVote}
            average={average}
            roomId={roomId}
            storyName={storyName}
            setCurrentCard={setCurrentCard}
          />
        </Box>
      </Box>
      {history.length > 0 ? (
        <Box className="room-chart-container">
          <EstimatePieChart history={history} />
          <DatePieChart history={history} />
        </Box>
      ) : (
        <></>
      )}

      <RoomHistory history={history} sprintName={room.sprintName} />
    </Box>
  );
}
