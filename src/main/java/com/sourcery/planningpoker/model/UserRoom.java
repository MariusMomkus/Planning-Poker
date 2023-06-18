package com.sourcery.planningpoker.model;

public class UserRoom {

  private int userRoomId;
  private Room room;
  private User user;
  private Role role;

  public UserRoom(int userRoomId, Room room, User user, Role role) {
    this.userRoomId = userRoomId;
    this.room = room;
    this.user = user;
    this.role = role;
  }

  public UserRoom() {
  }

  public int getUserRoomId() {
    return userRoomId;
  }

  public void setUserRoomId(int userRoomId) {
    this.userRoomId = userRoomId;
  }

  public Room getRoom() {
    return room;
  }

  public void setRoom(Room room) {
    this.room = room;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Role getRole() {
    return role;
  }

  public void setRole(Role role) {
    this.role = role;
  }

  @Override
  public String toString() {
    return "UserRoom{"
        + "userRoomId=" + userRoomId
        + ", room=" + room
        + ", user=" + user
        + ", role=" + role
        + '}';
  }
}
