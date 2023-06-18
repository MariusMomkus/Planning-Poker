package com.sourcery.planningpoker.mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.sourcery.planningpoker.model.Room;

import java.util.List;
import java.util.Optional;

@Mapper
public interface RoomMapper {
        // GET
        @Results({
                        @Result(property = "roomId", column = "room_id"),
                        @Result(property = "creatorId", column = "creator_id"),
                        @Result(property = "active", column = "is_active"),
                        @Result(property = "roomName", column = "room_name"),
                        @Result(property = "sprintName", column = "sprint_name"),
                        @Result(property = "teamName", column = "team_name")
        })
        @Select("SELECT * FROM room")
        List<Room> getAllRooms();

        @Results({
                        @Result(property = "roomId", column = "room_id"),
                        @Result(property = "creatorId", column = "creator_id"),
                        @Result(property = "active", column = "is_active"),
                        @Result(property = "roomName", column = "room_name"),
                        @Result(property = "sprintName", column = "sprint_name"),
                        @Result(property = "teamName", column = "team_name")
        })
        @Select("SELECT * FROM room WHERE room_id=#{roomId}")
        Optional<Room> getRoomById(int roomId);

        // List<Integer> getUserRoomIdsByRoomId(@Param("roomId") int roomId);
        // @Select("SELECT * FROM user")
        // POST
        @Results({
                        @Result(property = "roomId", column = "room_id"),
                        @Result(property = "creatorId", column = "creator_id"),
                        @Result(property = "active", column = "is_active"),
                        @Result(property = "roomName", column = "room_name"),
                        @Result(property = "sprintName", column = "sprint_name"),
                        @Result(property = "teamName", column = "team_name")
        })
        @Options(useGeneratedKeys = true, keyProperty = "roomId", keyColumn = "room_id")
        @Insert("INSERT INTO "
                        + "room(creator_id, description, is_active, room_name, sprint_name, team_name)"
                        + "VALUES("
                        + "#{room.creatorId}, "
                        + "#{room.description}, "
                        + "#{room.isActive}, "
                        + "#{room.roomName}, "
                        + "#{room.sprintName}, "
                        + "#{room.teamName}"
                        + ")")
        void addRoom(@Param("room") Room room);

        // PUT
        @Results({
                        @Result(property = "roomId", column = "room_id"),
                        @Result(property = "creatorId", column = "creator_id"),
                        @Result(property = "active", column = "is_active"),
                        @Result(property = "roomName", column = "room_name"),
                        @Result(property = "sprintName", column = "sprint_name"),
                        @Result(property = "teamName", column = "team_name")
        })
        @Update("UPDATE room SET "
                        + "room_name=#{room.roomName},"
                        + "team_name=#{room.teamName},"
                        + "sprint_name=#{room.sprintName},"
                        + "description = #{room.description},"
                        + "is_active = #{room.isActive} "
                        + "WHERE room_id = #{room.roomId}")
        void updateRoom(@Param("room") Room room);

        // DELETE
        @Results({
                        @Result(property = "roomId", column = "room_id"),
                        @Result(property = "creatorId", column = "creator_id"),
                        @Result(property = "active", column = "is_active"),
                        @Result(property = "roomName", column = "room_name"),
                        @Result(property = "sprintName", column = "sprint_name"),
                        @Result(property = "teamName", column = "team_name")
        })
        @Delete("DELETE FROM room WHERE room_id = #{roomId}")
        void deleteRoom(@Param("roomId") int roomId);
}
