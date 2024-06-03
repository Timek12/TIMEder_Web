import axios from "axios";
import AuthService from "./authService";

export const getEvents = () => {
    AuthService.setAxiosAuthHeader();
    return axios.get('/events/');
}

export const createEvent = (inputValues, userId) => {
    AuthService.setAxiosAuthHeader();
    return axios.post('/events/', {
        name: inputValues.name,
        location: inputValues.location,
        date: inputValues.date,
        startTime: inputValues.startTime,
        description: inputValues.description,
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
