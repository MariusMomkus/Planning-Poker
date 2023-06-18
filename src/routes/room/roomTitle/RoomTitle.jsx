import { Box, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Person4Icon from "@mui/icons-material/Person4";

export default function RoomTitle({ roomName, userRole }) {
  const roleIcon = (userRole) => {
    switch (+userRole) {
      case 1:
        return (
          <Typography className="">
            You are moderator <Person4Icon />
          </Typography>
        );
        break;
      default:
        return (
          <Typography className="">
            You are particiapnt <PersonIcon />
          </Typography>
        );
        break;
    }
  };
  return (
    <Box className="room-room-name-container">
      <Typography className="room-room-name">{roomName}</Typography>
      {roleIcon(userRole)}
    </Box>
  );
}
