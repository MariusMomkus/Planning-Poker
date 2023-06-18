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

import com.sourcery.planningpoker.model.User;
import com.sourcery.planningpoker.service.UserService;

@RestController
@CrossOrigin
@RequestMapping("api/v1/users")
public class UserController {
  //TODO error when /allusers vs /allUsers
  @Autowired
  private UserService userService;

  @GetMapping("/allUsers")
  public ResponseEntity<?> getAllUsers() {
    return userService.getAllUsers();
  }

  @GetMapping("/{userId}")
  public ResponseEntity<?> getUserById(@PathVariable int userId) {
    return userService.getUserById(userId);
  }

  @GetMapping("/login")
  public ResponseEntity<?> getUserByEmailAndPassword(@RequestParam String email, @RequestParam String password) {
    return userService.getUserByEmailAndPassword(email, password);
  }
  @PostMapping("/add")
  public ResponseEntity<?> addUser(@RequestBody User user) {
    return userService.addUser(user);
  }

  @PutMapping(path = "/update/{id}")
  public ResponseEntity<?> updateUser(@PathVariable("id") int id,
      @RequestParam(required = false) String userName,
      @RequestParam(required = false) String email,
      @RequestParam(required = false) String password) {
    return userService.updateUser(id, userName, email, password);
  }

  @DeleteMapping(path = "/delete/{userId}")
  public ResponseEntity<?> deleteStudent(@PathVariable("userId") int userId) {
    return userService.deleteUser(userId);
  }
}
