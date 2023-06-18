import { Box, TextField } from "@mui/material";

export default function HistorySaveForm({ estimate, setEstimate }) {
  const estimateInput = (event) => {
    if (!isNaN(+event.target.value)) setEstimate(event.target.value);
  };
  return (
    <Box className="room-room-story-container">
      <TextField
        className="room-search-input"
        onChange={estimateInput}
        variant="outlined"
        placeholder="Estimate"
        size="small"
        value={estimate}
      />
    </Box>
  );
}
