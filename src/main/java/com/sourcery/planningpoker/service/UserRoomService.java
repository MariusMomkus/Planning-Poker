package com.sourcery.planningpoker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sourcery.planningpoker.interfaces.service.UserRoomServiceInterface;
import com.sourcery.planningpoker.mapper.RoleMapper;
import com.sourcery.planningpoker.mapper.UserMapper;
import com.sourcery.planningpoker.mapper.UserRoomMapper;
import com.sourcery.planningpoker.model.Role;
import com.sourcery.planningpoker.model.Room;
import com.sourcery.planningpoker.model.User;
import com.sourcery.planningpoker.model.UserRoom;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserRoomService implements UserRoomServiceInterface {

  @Autowired
  private UserRoomMapper userRoomMapper;

  @Autowired
  private UserMapper userMapper;

  @Autowired
  private RoleMapper roleMapper;

  @Override
  public ResponseEntity<Map<String, String>> addUserRoom(Room room) {
    // TODO @autowired
    UserRoom userRoom = new UserRoom();
    userRoom.setRoom(room);

    Map<String, String> message = new HashMap<>();

    Optional<Role> ownerRole = roleMapper.findByRoleType("owner");
    Optional<User> creator = userMapper.getUserById(room.getCreatorId());

    if (creator.isPresent() && ownerRole.isPresent()) {
      userRoom.setUser(creator.get());
      userRoom.setRole(ownerRole.get());

      userRoomMapper.addUserRoom(userRoom);

      message.put("message", "Created room is assigned to you and you are the owner.");
      return ResponseEntity
          .status(HttpStatus.CREATED)
          .body(message);
    }
    if (creator.isEmpty() && ownerRole.isPresent()) {
      message.put("message", "User with provided id or not found.");
      return ResponseEntity
          .status(HttpStatus.NOT_FOUND)
          .body(message);
    }
    if (creator.isPresent()) {
      message.put("message", "Role owner not found");
      return ResponseEntity
          .status(HttpStatus.NOT_FOUND)
          .body(message);
    }
    message.put("message", "Bad request.");
    return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(message);
  }

  @Override
  public List<Room> getOwnedRooms(int userId) {
    List<Room> foundRooms = userRoomMapper.findOwnedRoomsById(userId, 1);
    if (foundRooms.isEmpty()) {
      return null;
    }
    return foundRooms;
  }
}
