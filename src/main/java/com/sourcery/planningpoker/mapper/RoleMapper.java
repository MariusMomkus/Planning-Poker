package com.sourcery.planningpoker.mapper;


import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import com.sourcery.planningpoker.model.Role;

import java.util.List;
import java.util.Optional;

@Mapper
public interface RoleMapper {

  @Select("SELECT * FROM role")
  @Results({
      @Result(property = "roleId", column = "role_id"),
      @Result(property = "roleType", column = "role_type")
  })
  List<Role> getAllRoles();

  @Select("SELECT * FROM role WHERE role_type = #{roleType}")
  @Results({
      @Result(property = "roleId", column = "role_id"),
      @Result(property = "roleType", column = "role_type")
  })
  Optional<Role> findByRoleType(@Param("roleType") String roleType);
}
