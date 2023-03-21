import axios from "axios";
import {API_URL} from "./../config/config"
const getToken = () => {
    let token = localStorage.getItem("token")
    return token;

}
export const registerUser = (user) => {
    const url = `${API_URL}/ums/signup`;
    return axios(url, {
        withCredentials : true,
        method: 'post',
        data : user
    });
}

export const getUser = (user) => {
    const url = `${API_URL}/ums/user-details/${user}`;
    return axios(url, {
        withCredentials : true,
        method: 'get',
        data : user,
        headers : {
            Authorization : getToken()
        }
    });
}

export const loginUser = (user) => {
    const url = `${API_URL}/ums/login`;
    return axios(url, {
        withCredentials : true,
        method: 'post',
        data : user
    });
}

export const createWorkshop = (id) => {
    const url = `${API_URL}/workshop/create-workshop`
    return axios(url, {
        withCredentials : true,
        method: 'put',
        data : id,
        headers : {
            Authorization : getToken()
        }
    });
}

export const getWorkshopDetails = (id) => {
    const url = `${API_URL}/workshop/${id}`
    return axios(url, {
        withCredentials : true,
        method: 'get',
        headers : {
            Authorization : getToken()
        }
    });
}

export const createDraftWorkshop = () => {
    const url = `${API_URL}/workshop/create-workshop/draft`
    return axios(url, {
        withCredentials : true,
        method: 'post',
        headers : {
            Authorization : getToken()
        }
    });
}


