package com.sourcery.planningpoker.model;

public class Role {

  private int roleId;

  private String roleType;

  public Role(int roleId, String roleType) {
    this.roleId = roleId;
    this.roleType = roleType;
  }

  public Role() {
  }

  public int getRoleId() {
    return roleId;
  }

  public void setRoleId(int roleId) {
    this.roleId = roleId;
  }

  public String getRoleType() {
    return roleType;
  }

  public void setRoleType(String roleType) {
    this.roleType = roleType;
  }

  @Override
  public String toString() {
    return "Role{" +
        "roleId=" + roleId +
        ", roleType='" + roleType + '\'' +
        '}';
  }
}
