import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import StraightIcon from '@mui/icons-material/Straight';
import { useEffect, useState } from "react";

export default function RoomHistoryTable({ history, searchQuery }) {
    const [sorting, setSorting] = useState({ column: "date", direction: true })
    const [filtered, setFiltered] = useState(history)
    const setSort = (column) => {
        if (sorting.column === column)
            setSorting({ column: column, direction: !sorting.direction })
        else
            setSorting({ column: column, direction: true })
    }
    const sortIcon = (
        sorting.direction ? <StraightIcon className="room-history-table-head-icon" sx={{ transform: "rotate(180deg)" }} /> : <StraightIcon className="room-history-table-head-icon" />
    );
    useEffect(() => {
        const filteredValues = history.filter(story => searchQuery != "" ? story.name.toLowerCase().includes(searchQuery.toLowerCase()) : story);
        setFiltered(filteredValues)
    }, [searchQuery, history])
    return (
        <Table className="room-table" sx={{ height: "fit-content" }}>
            <TableHead className="room-table-head">
                <TableRow placeholder="dfdasfdas">
                    <TableCell className="room-history-table-cell" allign="center" onClick={() => setSort("name")}>Story{sorting.column === "name" ? sortIcon : null}</TableCell>
                    <TableCell className="room-history-table-cell" allign="center" onClick={() => setSort("date")}>Date{sorting.column === "date" ? sortIcon : null}</TableCell>
                    <TableCell className="room-history-table-cell" allign="center" onClick={() => setSort("estimate")}>Estimate{sorting.column === "estimate" ? sortIcon : null}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody className="room-table-body" >
                {

                    filtered.length < 1
                        ? <TableRow className="room-talbe-body-row" >
                            <TableCell className="room-history-table-cell" colSpan={3}>No stories</TableCell>
                        </TableRow>
                        : filtered.sort((a, b) => {
                            switch (sorting.column) {
                                case "date":
                                    return sorting.direction ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
                                    break;
                                case "name":
                                    return sorting.direction ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
                                    break;
                                case "estimate":
                                    return sorting.direction ? (a.estimate - b.estimate) : (b.estimate - a.estimate);
                                    break;
                                default:
                                    return sorting.direction ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
                                    break;
                            }
                        })
                            .map(story => {
                                const date = new Date(Date.parse(story.date));
                                return (
                                    <TableRow key={story.id} className="room-talbe-body-row">
                                        <TableCell className="room-history-table-cell" >{story.name}</TableCell>
                                        {/* <TableCell>{date.toISOString()}</TableCell> */}
                                        {/* <TableCell>{date.toUTCString()}</TableCell> */}
                                        <TableCell className="room-history-table-cell" >{date.toLocaleString()}</TableCell>
                                        <TableCell className="room-history-table-cell" >{story.estimate}</TableCell>
                                    </TableRow>
                                )
                            }
                            )}
            </TableBody>
        </Table >
    );
};