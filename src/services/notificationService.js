import axios from "axios";
import AuthService from "./authService";

export const getNotifications = (content, dateTime) => {
    AuthService.setAxiosAuthHeader();
    return axios.post('/notifications/sendToAll', {content: content, dateTime: dateTime});
}
