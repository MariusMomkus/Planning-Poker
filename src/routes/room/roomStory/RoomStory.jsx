import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { wsTargetUrl } from "../../../api/ApiUrls";

export default function RoomStory({ stompClient, roomId, userRole, setCurrentCard, storyName }) {
    const [story, setStory] = useState("");

    const saveStoryName = () => {
        stompClient.send(wsTargetUrl + "/story/" + roomId, {}, story);
        setStory("")
        setCurrentCard(null);
    }

    const storyInput = (event) => {
        setStory(event.target.value)
    }
    const storyPanel = (
        <Box className="room-room-story-wrapper">
            <Box className="room-room-story-container">
                <TextField
                    className="room-search-input"
                    onChange={storyInput}
                    variant="outlined"
                    placeholder="Add story name"
                    size="small"
                    value={story}
                />
                <Button className="room-control-panel-button" variant="contained" onClick={saveStoryName}>
                    Start session
                </Button>
            </Box>
            {!storyName
                ? <Typography className="room-story-name">Session has not been started</Typography>
                : <Typography className="room-story-name">Story: {storyName}</Typography>
            }
        </Box>
    )
    return (
        <>
            {userRole < 3 ? storyPanel : null}
        </>

    );
};