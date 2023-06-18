import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

function SelectParticipants({
  availableUsers,
  invitedUsers,
  setInvitedUsers,
  currentInvitedUsers,
}) {
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    if (currentInvitedUsers) {
      const defaultSelectedUsers = availableUsers.filter((user) =>
        currentInvitedUsers.includes(user.userId)
      );
      setSelectedUsers(defaultSelectedUsers);
      setInvitedUsers(currentInvitedUsers);
    }
  }, [availableUsers, currentInvitedUsers, setInvitedUsers]);

  function handleSelectUsers(event, value) {
    setSelectedUsers(value);
    // Create a new array with already invited users
    const selectedUserIds = value.map((user) => user.userId);
    // Update the state with the new array
    setInvitedUsers(selectedUserIds);
  }

  return (
    <div>
      <Autocomplete
        className="select-invited-users"
        multiple
        id="tags-standard"
        options={availableUsers}
        value={selectedUsers}
        getOptionLabel={(option) => option.userName}
        isOptionEqualToValue={(option, value) => option.userId === value.userId}
        onChange={(event, value) => handleSelectUsers(event, value)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Invite users"
            placeholder={invitedUsers.length > 0 ? "" : "Search by typing"}
          />
        )}
      />
    </div>
  );
}

export default SelectParticipants;
