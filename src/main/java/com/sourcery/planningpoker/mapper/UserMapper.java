package com.sourcery.planningpoker.mapper;

import java.util.List;
import java.util.Optional;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.sourcery.planningpoker.model.User;

import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {

  // GET
  @Results({ @Result(property = "userName", column = "user_name") })
  @Select("SELECT * FROM user")
  List<User> getAllUsers();

  @Results({ @Result(property = "userName", column = "user_name") })
  @Select("SELECT * FROM user WHERE id = #{userId}")
  Optional<User> getUserById(@Param("userId") int userId);

  @Results({ @Result(property = "userName", column = "user_name") })
  @Select("SELECT * FROM user WHERE user_name =#{userName}")
  Optional<User> getUserByUserName(@Param("userName") String userName);

  @Results({ @Result(property = "userName", column = "user_name") })
  @Select("SELECT * FROM user WHERE email = #{email}")
  Optional<User> getUserByEmail(@Param("email") String email);

  @Results({ @Result(property = "userName", column = "user_name") })
  @Select("SELECT * FROM user WHERE email =#{email} AND password = #{password}")
  Optional<User> getUserByEmailAndPassword(@Param("email") String email, @Param("password") String password);

  // POST
  @Results({ @Result(property = "userName", column = "user_name") })
  @Options(useGeneratedKeys = true, keyColumn = "id", keyProperty = "id")
  @Insert("INSERT INTO user(user_name, email, password) VALUES(#{userName}, #{email}, #{password})")
  void addUser(User user);

  // PUT
  @Results({ @Result(property = "userName", column = "user_name") })
  @Update("UPDATE user SET "
      + "user_name = #{user.userName}, "
      + "email = #{user.email}, "
      + "password = #{user.password} "
      + "WHERE id = #{user.userId}")
  void updateUser(@Param("user") User user);

  // @Results({@Result(property = "userName", column = "user_name")})
  // @Update("UPDATE user SET user_name = #{userName} WHERE id = #{userId}")
  // void updateUserName(@Param("userId") int userId, @Param("userName") String
  // userName);

  // @Results({@Result(property = "userName", column = "user_name")})
  // @Update("UPDATE user SET email = #{email} WHERE id = #{userId}")
  // void updateEmail(@Param("userId") int userId, @Param("email") String email);

  // @Results({@Result(property = "userName", column = "user_name")})
  // @Update("UPDATE user SET password = #{password} WHERE id = #{userId}")
  // void updatePassword(@Param("userId") int userId, @Param("password") String
  // password);

  // DELETE
  @Results({ @Result(property = "userName", column = "user_name") })
  @Delete("DELETE FROM user WHERE id = #{userId}")
  void deleteUser(@Param("userId") int userId);
}
