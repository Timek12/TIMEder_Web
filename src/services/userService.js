import axios from "axios";
import AuthService from "./authService";

export const getUsers = () => {
    AuthService.setAxiosAuthHeader();
    return axios.get('/users/');
}

export const updateUser = (userId, updatedInfo, newStatus) => {
    AuthService.setAxiosAuthHeader();
    return axios.put(`/users/${userId}`, {
        id: updatedInfo.id,
        firstName: updatedInfo.firstName,
        lastName: updatedInfo.lastName,
        index: updatedInfo.index,
        email: updatedInfo.email,
        password: updatedInfo.password,
        status: (newStatus === 0) ? 'ARCHIVED' : ((newStatus === 1) ? 'BLOCKED' : ((newStatus === 2) ? 'ACTIVE' : 'TEMPORARILY_BLOCKED'))
    });
}