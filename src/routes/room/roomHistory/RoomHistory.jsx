import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { ExportToCsv } from "export-to-csv";
import { useState } from "react";
import RoomHistoryTable from "./roomHistoryTable/RoomHistoryTable";

export default function RoomHistory({ history, sprintName }) {
  const [searchQuery, setSearchQuery] = useState("");

  /*CSV exporting*/
  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    filename: sprintName, // Set the file name
    useKeysAsHeaders: false,
    headers: ["Story", "Date", "Estimate"],
  };

  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportData = () => {
    csvExporter.generateCsv(
      history.map((story) => [
        story.name,
        new Date(story.date)
          .toLocaleString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
          .replace(",", ""),
        story.estimate,
      ])
    );
  };

  return (
    <Box className="room-history-container">
      <Box className="room-search-export-container">
        <TextField
          className="room-search-input"
          onInput={(e) => {
            setSearchQuery(e.target.value);
          }}
          // label="Enter story name"
          variant="outlined"
          placeholder="Enter story name"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fill: "gray" }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          color="primary"
          className="room-csv-export-button"
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
          variant="contained"
        >
          Export
        </Button>
      </Box>
      <RoomHistoryTable history={history} searchQuery={searchQuery} />
    </Box>
  );
}
