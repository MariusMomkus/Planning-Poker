package com.sourcery.planningpoker.interfaces.service;

import org.springframework.http.ResponseEntity;

import com.sourcery.planningpoker.model.Room;

import java.util.List;
import java.util.Map;

public interface UserRoomServiceInterface {

  ResponseEntity<Map<String, String>> addUserRoom(Room room);

  List<Room> getOwnedRooms(int userId);

}
