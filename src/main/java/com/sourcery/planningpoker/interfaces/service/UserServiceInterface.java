package com.sourcery.planningpoker.interfaces.service;

import org.springframework.http.ResponseEntity;

import com.sourcery.planningpoker.model.User;

public interface UserServiceInterface {
  ResponseEntity<?> getAllUsers();

  ResponseEntity<?> getUserById(int userId);

  ResponseEntity<?> getUserByEmail(String email);

  ResponseEntity<?> getUserByEmailAndPassword(String email, String password);

  ResponseEntity<?> addUser(User user);

  ResponseEntity<?> updateUser(int userId, String user_name, String email, String password);

  ResponseEntity<?> deleteUser(int userId);

}
