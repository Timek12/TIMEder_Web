import axios from "axios";
import AuthService from "./authService";

export const getGroups = () => {
    AuthService.setAxiosAuthHeader();
    return axios.get('/groups/');
}

export const createGroup = (inputValues, userId) => {
    AuthService.setAxiosAuthHeader();
    return axios.post('/groups/', {
        name: inputValues.name,
        description: inputValues.description,
        currentSize: 1,
        totalSize: inputValues.totalSize,
        isPrivate: !inputValues.isPrivate,
        joinCode: inputValues.joinCode,
        ownerId: userId,
    });
}

export const deleteGroup = (groupId) => {
    AuthService.setAxiosAuthHeader();
    return axios.delete(`/groups/${groupId}`);
}

export const getMembers = (groupId) => {
    AuthService.setAxiosAuthHeader();
    return axios.get(`/groups/${groupId}/users`);
}

export const addMember = (groupId, userIndex, firstName, lastName) => {
    AuthService.setAxiosAuthHeader();
    return axios.post(`/groups/users`, {groupId: groupId, index: userIndex, firstName: firstName, lastName: lastName});
}

export const deleteMember = (groupId, userIndex) => {
    AuthService.setAxiosAuthHeader();
    return axios.delete(`/groups/users`, { data: {groupId: groupId, userIndex: userIndex}});
}