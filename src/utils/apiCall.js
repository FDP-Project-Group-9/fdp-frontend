import axios from "axios";
import { openNotificationWithIcon } from "../components/Extras/Notification";
import { API_METHODS, baseAPIUrl } from "./constants";
import { getToken } from "./helper";

const RequestInstance = axios.create({
    baseURL: baseAPIUrl
});

const makeRequest = async (url, data, method) => {
    try {
        const response = await RequestInstance({
            url: url,
            method: method,
            data: data,
            headers: {
                'Authorization': 'Bearer ' + getToken()
            }
        });
        if(method != API_METHODS.GET) {
            openNotificationWithIcon("success", response.data.msg);
        }
        return response.data;
    }
    catch(error) {
        const err = new Error();
        if(error.response.status == 500) {
            err.msg = "Something went wrong!";
            err.status = 500;
            openNotificationWithIcon("error", err.msg);
        }
        else if(error.response.status == 502) {
            err.msg = "Cannot reach the servers at the moment, Please try agian later!";
            err.status = 500;
            openNotificationWithIcon("error", err.msg);
        }
        else if(error.response.data.errors){
            error.response.data.errors.forEach(error => {
                openNotificationWithIcon("error", error.msg);
                err.msg = error.msg;
                err.status = error.status;
            });
        }
        else if(error.response.status == 404) {
            err.msg = "Could not find the resource!";
            err.status = 500;
            openNotificationWithIcon("error", err.msg);
        }
        throw err;    
    }
};

export const requestHandler = {
    get: (url) => makeRequest(url, {}, API_METHODS.GET),
    post: (url, data = {}) => makeRequest(url, data, API_METHODS.POST),
    put: (url, data = {}) => makeRequest(url, data, API_METHODS.PUT),
    delete: (url, data = {}) => makeRequest(url, data, API_METHODS.DELETE)
};