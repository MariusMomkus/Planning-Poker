package com.sourcery.planningpoker.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sourcery.planningpoker.interfaces.service.RoomServiceInterface;
import com.sourcery.planningpoker.mapper.RoomMapper;
import com.sourcery.planningpoker.model.Room;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
public class RoomService implements RoomServiceInterface {

  @Autowired
  private RoomMapper roomMapper;

  @Autowired
  UserRoomService userRoomService;

  @Override
  public ResponseEntity<?> getallRooms() {
    Map<String, String> message = new HashMap<>();
    try {
      List<Room> rooms = roomMapper.getAllRooms();
      return ResponseEntity
          .status(HttpStatus.OK)
          .body(rooms);
    } catch (Exception e) {
      message.put("message", "Internal server error.");
      return ResponseEntity
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(message);
    }
  }

  @Override
  public ResponseEntity<?> getRoomById(int roomId) {
    Optional<Room> room = roomMapper.getRoomById(roomId);
    if (room.isPresent()) {
      return ResponseEntity
          .status(HttpStatus.OK)
          .body(room);
    } else {
      Map<String, String> message = new HashMap<>();
      message.put("message", "Room not found.");
      return ResponseEntity
          .status(HttpStatus.NOT_FOUND)
          .body(message);
    }
  }

  @Override
  public ResponseEntity<?> addRoom(Room room) {
    Map<String, String> message = new HashMap<>();
    Optional<Room> existingRoom = roomMapper.getRoomById(room.getRoomId());

    if (existingRoom.isPresent()) {
      message.put("message", "Room already exists");
      return ResponseEntity
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(message);
    }

    if (room.getRoomName() == null
        || room.getRoomName().length() == 0
        || room.getTeamName() == null
        || room.getTeamName().length() == 0
        || room.getSprintName() == null
        || room.getSprintName().length() == 0) {
      message.put("message", "Only field \"Description\" is optional");
      return ResponseEntity
          .status(HttpStatus.BAD_REQUEST)
          .body(message);
    }

    roomMapper.addRoom(room);

    ResponseEntity<Map<String, String>> userRoomStatus = userRoomService.addUserRoom(room);
    String userRoomMessage = "";
    Map<String, String> userRoomStatusBody = userRoomStatus.getBody();
    if (userRoomStatusBody != null && userRoomStatusBody.containsKey("message")) {
      userRoomMessage = userRoomStatusBody.get("message");
    }

    message.put("message", "Room created. " + userRoomMessage);
    return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(message);
  }

  @Override
  @Transactional
  public ResponseEntity<?> updateRoom(int roomId,
                                      int userId,
                                      String sprintName,
                                      String teamName,
                                      String description) {
    Room foundRoom = roomMapper.getRoomById(roomId).orElse(null);
    Map<String, String> message = new HashMap<>();
    if (foundRoom == null) {
      message.put("message", "The room is not found.");
      return ResponseEntity
          .status(HttpStatus.NOT_FOUND)
          .body(message);
    }

    if (userId != foundRoom.getCreatorId()) {
      message.put("message", "You don't have rights to edit the room.");
      return ResponseEntity
          .status(HttpStatus.FORBIDDEN)
          .body(message);
    }

    if (sprintName != null
        && sprintName.length() > 0
        && !Objects.equals(sprintName, foundRoom.getSprintName())) {
      foundRoom.setSprintName(sprintName);
    } else if (Objects.equals(sprintName, foundRoom.getSprintName())) {
      message.put("message", "Sprint name must differ.");
      return ResponseEntity
          .status(HttpStatus.CONFLICT)
          .body(message);
    }

    if (teamName != null
        && teamName.length() > 0
        && !Objects.equals(teamName, foundRoom.getTeamName())) {
      foundRoom.setTeamName(teamName);
    } else if (Objects.equals(teamName, foundRoom.getTeamName())) {
      message.put("message", "Team name must differ.");
      return ResponseEntity
          .status(HttpStatus.CONFLICT)
          .body(message);
    }

    if (description != null
        && description.length() > 0
        && !Objects.equals(description, foundRoom.getDescription())) {
      foundRoom.setDescription(description);
    } else if (Objects.equals(description, foundRoom.getDescription())) {
      message.put("message", "Description must differ.");
      return ResponseEntity
          .status(HttpStatus.CONFLICT)
          .body(message);
    }

    roomMapper.updateRoom(foundRoom);
    return ResponseEntity
        .status(HttpStatus.OK)
        .body(roomMapper.getRoomById(roomId));
  }

  @Override
  @Transactional
  public ResponseEntity<?> deleteRoom(int roomId, int userId) {
    Optional<Room> room = roomMapper.getRoomById(roomId);
    Map<String, String> message = new HashMap<>();

    if (room.isEmpty()) {
      message.put("message", "The room is not found.");
      return ResponseEntity
          .status(HttpStatus.NOT_FOUND)
          .body(message);
    }

    if (room.get().getCreatorId() != userId) {
      message.put("message", "You don't have rights to delete this room.");
      return ResponseEntity
          .status(HttpStatus.FORBIDDEN)
          .body(message);
    }
    roomMapper.deleteRoom(roomId);
    message.put("message", "Room deleted.");
    return ResponseEntity
        .status(HttpStatus.OK)
        .body(message);
  }

}
