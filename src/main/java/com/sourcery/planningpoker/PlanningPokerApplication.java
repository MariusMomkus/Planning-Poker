package com.sourcery.planningpoker;


import org.apache.ibatis.type.MappedTypes;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.sourcery.planningpoker.model.Role;
import com.sourcery.planningpoker.model.Room;
import com.sourcery.planningpoker.model.User;

@MappedTypes({Room.class, Role.class, User.class})
@MapperScan("com.sourcery.planningpoker.mapper")
@SpringBootApplication
public class PlanningPokerApplication {

  public static void main(String[] args) {
    SpringApplication.run(PlanningPokerApplication.class, args);
  }

}
