export const baseApiUrl = "http://localhost:8081/api/v1";

export const usersUrl = `${baseApiUrl}/users`;
export const roomsUrl = `${baseApiUrl}/rooms`;
export const storiesUrl = `${baseApiUrl}/stories`;

export const getAllUsersUrl = `${baseApiUrl}/users/all-users`;
export const getUserById = `${baseApiUrl}/users`;
export const addUserUrl = `${baseApiUrl}/users/add`;
export const loginUrl = `${baseApiUrl}/users/login`;

export const addRoomUrl = `${baseApiUrl}/rooms/add`;
export const editRoomUrl = `${baseApiUrl}/rooms/update`;
export const deleteRoomUrl = `${baseApiUrl}/rooms/delete`;

export const getUserRoomsById = `${baseApiUrl}/users-rooms`;
export const getParticipationRoomsById = `${baseApiUrl}/users-rooms/get-participation-rooms`;
export const getParticipantUserIds = `${baseApiUrl}/users-rooms/get-participant-user-ids`;

export const getDeckCardsUrl = `${baseApiUrl}/deck-cards/all-deck-cards`;
export const getSelectedDeckCardsUrl = `${baseApiUrl}/deck-cards`;

export const wsServerUrl = "http://localhost:8081/ws";
export const wsTargetUrl = "/app/websocket";
export const wsPrefix = "/websocket";
