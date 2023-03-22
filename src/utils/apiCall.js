import axios from "axios";
import { openNotificationWithIcon } from "../components/Extras/Notification";
import { API_METHODS, baseAPIUrl } from "./constants";
import { getToken } from "./helper";

const RequestInstance = axios.create({
    baseURL: baseAPIUrl,
    headers: {
        'Authorization': getToken()
    }
});

const makeRequest = async (url, data, method) => {
    try {
        const response = await RequestInstance({
            url: url,
            method: method,
            data: data
        });
        if(method != API_METHODS.GET) {
            openNotificationWithIcon("success", response.data.msg);
        }
        return response.data;
    }
    catch(error) {
        error.response.data.errors.forEach(error => {
            openNotificationWithIcon("error", error.msg);
        });
        throw error;    
    }
};

export const requestHandler = {
    get: (url) => makeRequest(url, {}, API_METHODS.GET),
    post: (url, data) => makeRequest(url, data, API_METHODS.POST),
    put: (url, data) => makeRequest(url, data, API_METHODS.PUT),
    delete: (url, data) => makeRequest(url, data, API_METHODS.DELETE)
};