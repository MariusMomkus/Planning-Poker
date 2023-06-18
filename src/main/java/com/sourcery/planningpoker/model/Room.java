package com.sourcery.planningpoker.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.OneToMany;
import java.util.List;

public class Room {

  private int roomId;

  private String roomName;

  private String teamName;

  private String sprintName;

  private String description;

  private Boolean isActive;

  private int creatorId;

  @JsonIgnore
  private List<UserRoom> userRooms;

  public Room(int roomId,
              String roomName,
              String teamName,
              String sprintName,
              String description,
              Boolean isActive,
              int creatorId) {
    this.roomId = roomId;
    this.roomName = roomName;
    this.teamName = teamName;
    this.sprintName = sprintName;
    this.description = description;
    this.isActive = isActive;
    this.creatorId = creatorId;
  }

  public Room() {
  }

  public int getRoomId() {
    return roomId;
  }

  public String getRoomName() {
    return roomName;
  }

  public void setRoomName(String roomName) {
    this.roomName = roomName;
  }

  public String getTeamName() {
    return teamName;
  }

  public void setTeamName(String teamName) {
    this.teamName = teamName;
  }

  public String getSprintName() {
    return sprintName;
  }

  public void setSprintName(String sprintName) {
    this.sprintName = sprintName;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Boolean getActive() {
    return isActive;
  }

  public void setActive(Boolean active) {
    isActive = active;
  }

  public int getCreatorId() {
    return creatorId;
  }

  public void setCreatorId(int creatorId) {
    this.creatorId = creatorId;
  }

  @OneToMany(mappedBy = "room")
  public List<UserRoom> getUserRooms() {
    return userRooms;
  }

  public void setUserRooms(List<UserRoom> userRooms) {
    this.userRooms = userRooms;
  }

  @Override
  public String toString() {
    return "Room{" +
        "roomId=" + roomId +
        ", roomName='" + roomName + '\'' +
        ", teamName='" + teamName + '\'' +
        ", sprintName='" + sprintName + '\'' +
        ", description='" + description + '\'' +
        ", isActive=" + isActive +
        ", creatorId=" + creatorId + '}';
  }
}
