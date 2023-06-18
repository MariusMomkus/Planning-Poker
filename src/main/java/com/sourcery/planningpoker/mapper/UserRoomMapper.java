package com.sourcery.planningpoker.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.springframework.data.repository.query.Param;

import com.sourcery.planningpoker.model.Room;
import com.sourcery.planningpoker.model.UserRoom;

import java.util.List;

@Mapper
public interface UserRoomMapper {

    @Select("SELECT DISTINCT room.room_id, room.room_name, room.team_name, room.sprint_name, room.description, room"
            + ".creator_id, room"
            + ".is_active "
            + "from `user-room` "
            + "inner join room ON `user-room`.user_id=room.creator_id "
            + "where `user-room`.user_id = #{userId} and `user-room`.role_id = #{roleId}")
    @Results({
            @Result(property = "roomId", column = "room_id"),
            @Result(property = "roomName", column = "room_name"),
            @Result(property = "teamName", column = "team_name"),
            @Result(property = "sprintName", column = "sprint_name"),
            @Result(property = "description", column = "description"),
            @Result(property = "creatorId", column = "creator_id"),
            @Result(property = "active", column = "is_active")
    })
    List<Room> findOwnedRoomsById(@Param("userId") int userId, @Param("roleId") int roleId);

    @Select("SELECT `user-room_id` FROM `user-room` ur WHERE ur.room_id = #{roomId}")
    List<Integer> findUserRoomIdByRoomIds(@Param("roomId") int roomId);

    @Options(useGeneratedKeys = true, keyProperty = "userRoomId", keyColumn = "`user-room_id`")
    @Insert("INSERT INTO `user-room` (room_id, user_id, role_id) "
            + "VALUES("
            + "#{room.roomId}, "
            + "#{user.id}, "
            + "#{role.roleId})")
    void addUserRoom(@Param("userRoom") UserRoom userRoom);
    // @Query(value = "SELECT `user-room_id` FROM `user-room` ur WHERE ur.room_id =
    // :roomId",
    // nativeQuery = true)
    // List<Integer> findUserRoomIdByRoomIds(@Param("roomId") int roomId);

}
