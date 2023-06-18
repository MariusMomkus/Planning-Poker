import { Box, Typography } from "@mui/material";
import "./NotFound.css";
import notFoundImage from "./404.png";

export default function NotFound() {
  return (
    <Box className="not-found-text-container">
      <img src={notFoundImage} alt="Not Found" id="not-found-image" />
      <Typography id="not-found-404-title" class="not-found-text">
        Not Found
      </Typography>
      <Typography id="not-found-sentence" class="not-found-text">
        The page you are looking for was not found.
      </Typography>
    </Box>
  );
}
