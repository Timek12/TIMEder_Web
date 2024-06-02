import axios from "axios";
import AuthService from "./authService";

export const getEvents = (content, dateTime) => {
    AuthService.setAxiosAuthHeader();
    return axios.get('/events');
}

export const createEvent = (inputValues, userId) => {
    AuthService.setAxiosAuthHeader();
    return axios.post('/events/', {
        name: inputValues.name,
        startDateTime: inputValues.startDateTime,
        isPrivate: !inputValues.isPrivate,
        description: inputValues.description,
        localization: inputValues.localization,
        photoFilePath: inputValues.photoFilePath,
        currentSize: 1,
        ownerId: userId,
    });
}

export const deleteEvent = (eventId) => {
    AuthService.setAxiosAuthHeader();
    return axios.delete(`/events/${eventId}`);
}

export const getMembers = (eventId) => {
    AuthService.setAxiosAuthHeader();
    return axios.get(`/events/${eventId}/users`);
}

export const addMember = (eventId, userIndex, firstName, lastName) => {
    AuthService.setAxiosAuthHeader();
    return axios.post(`/events/users`, {eventId: eventId, index: userIndex, firstName: firstName, lastName: lastName});
}

export const deleteMember = (eventId, userIndex) => {
    AuthService.setAxiosAuthHeader();
    return axios.delete(`/events/users`, { data: {eventId: eventId, userIndex: userIndex}});
}

export const getGroups = (eventId) => {
    AuthService.setAxiosAuthHeader();
    return axios.get(`/events/${eventId}/groups`);
}

export const addGroup = (eventId, groupName) => {
    AuthService.setAxiosAuthHeader();
    return axios.post(`/events/groups`, {eventId: eventId, groupName: groupName});
}

export const deleteGroup = (eventId, groupId) => {
    AuthService.setAxiosAuthHeader();
    return axios.delete(`/events/groups`, { data: {eventId: eventId, groupId: groupId}});
}
