package com.sourcery.planningpoker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sourcery.planningpoker.model.Room;
import com.sourcery.planningpoker.service.RoomService;

@RestController
@CrossOrigin
@RequestMapping("api/v1/rooms")
public class RoomController {

  @Autowired
  private RoomService roomService;

  @GetMapping("/allRooms") // allrooms vs allRooms
  public ResponseEntity<?> getAllRooms() {
    ResponseEntity<?> rooms = roomService.getallRooms();
    return rooms;
  }

  @GetMapping("/{roomId}")
  public ResponseEntity<?> getRoomById(@PathVariable int roomId) {
    ResponseEntity<?> singleRoom = roomService.getRoomById(roomId);
    return singleRoom;
  }

  @PostMapping("/add")
  public ResponseEntity<?> registerNewRoom(@RequestBody Room room) {
    ResponseEntity<?> newRoomStatus = roomService.addRoom(room);
    return newRoomStatus;
  }

  @PutMapping(path = "/update/{roomId}")
  public ResponseEntity<?> updateRoom(@PathVariable("roomId") int roomId,
      @RequestParam(required = true) int userId,
      @RequestParam(required = false) String sprintName,
      @RequestParam(required = false) String teamName,
      @RequestParam(required = false) String description) {
    ResponseEntity<?> editedRoomStatus = roomService.updateRoom(
        roomId,
        userId,
        sprintName,
        teamName,
        description);
    return editedRoomStatus;
  }

  @DeleteMapping(path = "/delete/{roomId}")
  public ResponseEntity<?> deleteRoom(@PathVariable("roomId") int roomId, @RequestParam(required = true) int userId) {
    ResponseEntity<?> deleteRoomStatus = roomService.deleteRoom(roomId, userId);
    return deleteRoomStatus;
  }
}
