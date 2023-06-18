import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

export default function RoomUsers({ users, showVote, average, setAverage }) {
  return (
    <Table className="room-table">
      <TableHead className="room-table-head">
        <TableRow>
          <TableCell> User</TableCell>
          <TableCell>Estimate</TableCell>
        </TableRow>
      </TableHead>
      <TableBody className="room-table-body">
        {users.map((user) => {
          let userVote = null;
          if (showVote) userVote = user.voteStatus ? user.vote : <>?</>;
          else userVote = user.voteStatus ? <DoneIcon /> : <></>;
          return (
            <TableRow key={user.userId} className="room-talbe-body-row">
              <TableCell>{user.username}</TableCell>
              <TableCell>{userVote}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
