package com.sourcery.planningpoker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sourcery.planningpoker.interfaces.service.RoleServiceInterface;
import com.sourcery.planningpoker.mapper.RoleMapper;
import com.sourcery.planningpoker.model.Role;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RoleService implements RoleServiceInterface {

  @Autowired
  RoleMapper roleMapper;

  @Override
  public ResponseEntity<?> getallRoles() {

    Map<String, String> message = new HashMap<>();
    try {
      List<Role> roles = roleMapper.getAllRoles();
      return ResponseEntity.ok(roles);
    } catch (Exception e) {
      message.put("message", e.toString());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(message);
    }
  }

}
