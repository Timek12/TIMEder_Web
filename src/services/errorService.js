import axios from "axios";
import AuthService from "./authService";

export const getErrorReports = () => {
    AuthService.setAxiosAuthHeader();
    return axios.get('/error-reports/');
}

export const updateErrorReportStatusService = (id, status) => {
    AuthService.setAxiosAuthHeader();
    const updateErrorReportDTO = {
        id: id,
        status: status
    };
    return axios.put('/error-reports/', updateErrorReportDTO);
}

export const deleteErrorReportService = (id) => {
    AuthService.setAxiosAuthHeader();
    return axios.delete(`/error-reports/${id}`);
}