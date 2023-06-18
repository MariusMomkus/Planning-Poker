package com.sourcery.planningpoker.interfaces.service;

import org.springframework.http.ResponseEntity;

import com.sourcery.planningpoker.model.Room;

public interface RoomServiceInterface {

  ResponseEntity<?> getallRooms();

  ResponseEntity<?> getRoomById(int roomId);

  ResponseEntity<?> addRoom(Room room);

  ResponseEntity<?> updateRoom(int roomId, int userId, String sprintName, String teamName, String description);

  ResponseEntity<?> deleteRoom(int roomId, int userId);
}
