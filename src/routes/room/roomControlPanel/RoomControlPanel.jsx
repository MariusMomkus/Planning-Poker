import { Box, Button, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ReplayIcon from "@mui/icons-material/Replay";
import { useState } from "react";
import { storiesUrl, wsTargetUrl } from "../../../api/ApiUrls";
import axios from "axios";
import HistorySaveForm from "./historySaveData/HistorySaveForm";

export default function RoomControlPanel({
  stompClient,
  userRole,
  showVote,
  average,
  roomId,
  storyName,
  setCurrentCard,
}) {
  const [estimate, setEstimate] = useState("");

  const reveal = () => {
    if (!!storyName) {
      stompClient.send(
        wsTargetUrl + "/result/" + roomId,
        {},
        JSON.stringify(true)
      );
    }
    setCurrentCard(null);
  };
  const revote = () => {
    stompClient.send(
      wsTargetUrl + "/revote/" + roomId,
      {},
      JSON.stringify(false)
    );
    setCurrentCard(null);
  };
  const saveSession = () => {
    const todaysDate = new Date();
    const story = {
      name: storyName,
      date: todaysDate.toJSON(),
      estimate: estimate,
      roomId: roomId,
    };
    axios
      .post(storiesUrl + "/add", story)
      .then((res) => {
        stompClient.send(
          wsTargetUrl + "/reset/" + roomId,
          {},
          JSON.stringify("")
        );
        setEstimate("");
      })
      .catch((error) => console.log("No estimate"));
  };

  const revealButton = !!storyName ? (
    <Button
      className="room-control-panel-button-active"
      variant="contained"
      onClick={reveal}
    >
      reveal
    </Button>
  ) : (
    <Button
      className="room-control-panel-button-inactive"
      variant="contained"
      onClick={reveal}
    >
      reveal
    </Button>
  );
  const saveButton = !!estimate ? (
    <SaveIcon onClick={saveSession} className="room-icons-active" />
  ) : (
    <SaveIcon className="room-icons-inactive" />
  );
  const revoteButton = (
    <ReplayIcon onClick={revote} className="room-icons-active" />
  );
  const averageTitle = (
    <Box className="room-control-panel-stats">
      {
        !!storyName && !!average ? (
          <Typography>Average: {average}</Typography>
        ) : (
          <Typography className="room-control-panel-average-title-inactive"></Typography>
        )
        // : <Typography className="room-control-panel-average-title-inactive">Average: {average}</Typography>
      }
    </Box>
  );
  const estimateInput = (event) => {
    setEstimate(event.target.value);
  };
  if (userRole < 3) {
    return (
      <Box>
        <Box className="room-control-panel">
          {!showVote ? revealButton : null}
          {showVote ? (
            <HistorySaveForm estimate={estimate} setEstimate={setEstimate} />
          ) : null}
          {showVote ? saveButton : null}
          {showVote ? revoteButton : null}
        </Box>
        {averageTitle}
      </Box>
    );
  } else {
    return <></>;
  }
}
