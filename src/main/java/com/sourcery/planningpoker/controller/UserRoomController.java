package com.sourcery.planningpoker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sourcery.planningpoker.model.Room;
import com.sourcery.planningpoker.service.UserRoomService;

import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/v1/users-rooms")
public class UserRoomController {

  @Autowired
  private UserRoomService userRoomService;

  @GetMapping("/{userId}")
  public ResponseEntity<?> getCreatedRooms(@PathVariable int userId) {
    List<Room> createdRooms = userRoomService.getOwnedRooms(userId);

    if (createdRooms == null) {
      return ResponseEntity.status(HttpStatus.OK).body(Collections.emptyList());
    } else {
      return ResponseEntity.ok(createdRooms);
    }
  }
}
