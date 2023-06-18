package com.sourcery.planningpoker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sourcery.planningpoker.service.RoleService;

@RestController
@CrossOrigin
@RequestMapping("api/v1/roles")
public class RoleController {

  @Autowired
  private RoleService roleService;

  @GetMapping("/allRoles")
  public ResponseEntity<?> getAllRoles() {

    ResponseEntity<?> roleStatus = roleService.getallRoles();
    return roleStatus;

  }
}





