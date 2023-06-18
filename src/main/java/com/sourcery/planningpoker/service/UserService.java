package com.sourcery.planningpoker.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sourcery.planningpoker.interfaces.service.UserServiceInterface;
import com.sourcery.planningpoker.mapper.UserMapper;
import com.sourcery.planningpoker.model.User;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService implements UserServiceInterface {

  @Autowired
  private UserMapper userMapper;

  @Override
  public ResponseEntity<?> getAllUsers() {
    try {
      List<User> users = userMapper.getAllUsers();
      return ResponseEntity
          .status(HttpStatus.OK)
          .body(users);
    } catch (Exception e) {
      return ResponseEntity
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(Collections.singletonMap("message", "Internal server error."));
    }
  }

  @Override
  public ResponseEntity<?> getUserById(int userId) {
    Optional<User> user = userMapper.getUserById(userId);
    if (user.isPresent())
      return ResponseEntity
          .status(HttpStatus.OK)
          .body(user);
    else
      return ResponseEntity
          .status(HttpStatus.NOT_FOUND)
          .body(Collections.singletonMap("message", String.format("User with id: %d not found.", userId)));
  }

  @Override
  public ResponseEntity<?> getUserByEmail(String email) {
    Optional<User> user = userMapper.getUserByEmail(email);
    if (user.isPresent())
      return ResponseEntity
          .status(HttpStatus.OK)
          .body(user);
    else
      return ResponseEntity
          .status(HttpStatus.NOT_FOUND)
          .body(Collections.singletonMap("message", "Email is incorrect."));
  }

  @Override
  public ResponseEntity<?> getUserByEmailAndPassword(String email, String password) {
    Optional<User> user = userMapper.getUserByEmailAndPassword(email, password);
    if (user.isPresent())
      return ResponseEntity
          .status(HttpStatus.OK)
          .body(user);
    else
      return ResponseEntity
          .status(HttpStatus.NOT_FOUND)
          .body(Collections.singletonMap("message", "Email or password is incorrect."));
  }

  @Override
  public ResponseEntity<?> addUser(User user) {
    Optional<User> userById = userMapper.getUserById(user.getUserId());
    Optional<User> userByUserName = userMapper.getUserByUserName(user.getUserName());
    Optional<User> userByEmail = userMapper.getUserByEmail(user.getEmail());

    if (userById.isPresent())
      return ResponseEntity
          .status(HttpStatus.CONFLICT)
          .body(Collections.singletonMap("message", "Do not provide id."));

    if (userByUserName.isPresent())
      return ResponseEntity
          .status(HttpStatus.CONFLICT)
          .body(Collections.singletonMap("message", "User name is already taken."));

    if (userByEmail.isPresent())
      return ResponseEntity
          .status(HttpStatus.CONFLICT)
          .body(Collections.singletonMap("message", "Email already taken."));

    userMapper.addUser(user);

    return ResponseEntity
        .status(HttpStatus.OK)
        .body(user);
  }

  @Transactional
  public ResponseEntity<?> updateUser(int userId, String userName, String email, String password) {

    Optional<User> user = userMapper.getUserById(userId);
    if (user.isEmpty())
      return ResponseEntity
          .status(HttpStatus.NOT_FOUND)
          .body(Collections.singletonMap("message", String.format("User with id: %d is not found.", userId)));

    if (userName != null
        && !userName.trim().isEmpty()
        && !Objects.equals(user.get().getUserName(), userName)) {
      Optional<User> userByUserName = userMapper.getUserByUserName(userName);
      if (userByUserName.isPresent())
        return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(Collections.singletonMap("message", String.format("User name: %s is already taken.", userName)));
      else
        user.get().setUserName(userName);
    }

    if (email != null
        && !email.trim().isEmpty()
        && !Objects.equals(user.get().getEmail(), email)) {
      Optional<User> userByEmail = userMapper.getUserByEmail(email);
      if (userByEmail.isPresent())
        return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(Collections.singletonMap("message", String.format("Email: %s is already taken.", email)));
      else
        user.get().setEmail(email);
    }

    if (password != null && !password.trim().isEmpty()) {
      if (Objects.equals(user.get().getPassword(), password))
        return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(Collections.singletonMap("message", "New password must differ from the old password."));
      else
        user.get().setPassword(password);
    }
    userMapper.updateUser(user.get());
    return ResponseEntity
        .status(HttpStatus.OK)
        .body(user);
  }

  public ResponseEntity<?> deleteUser(int userId) {
    Optional<User> user = userMapper.getUserById(userId);

    if (user == null) {
      return ResponseEntity
          .status(HttpStatus.NOT_FOUND)
          .body(Collections.singletonMap("message", String.format("Error 404. User with id %does not exist.", userId)));
    }

    userMapper.deleteUser(userId);
    return ResponseEntity
        .status(HttpStatus.OK)
        .body(Collections.singletonMap("message", "User deleted."));
  }
}
