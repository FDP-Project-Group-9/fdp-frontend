import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import moment from 'moment';

import { API_STATUS_ENUM } from './constants';

const LOCAL_STORAGE_ITEMS = {
    TOKEN: "token",
    EMAIL_ID: "email_id",
    USER_ID: "user_id",
    OTP_SENT_TIME: 'otp_sent_time',
    OTP_SENT: 'otp_sent'
};

export const getToken = () => {
    let token = localStorage.getItem(LOCAL_STORAGE_ITEMS.TOKEN)
    return token;
};

export const getJWTData = () => {
    const token = getToken();
    return jwt_decode(token);
};

export const getUserId = () => localStorage.getItem(LOCAL_STORAGE_ITEMS.USER_ID);

export const getUserEmailId = () => localStorage.getItem(LOCAL_STORAGE_ITEMS.EMAIL_ID);

export const getOtpSentTime = () => localStorage.getItem(LOCAL_STORAGE_ITEMS.OTP_SENT_TIME);

export const getOtpSent = () => localStorage.getItem(LOCAL_STORAGE_ITEMS.OTP_SENT);

export const setJwtToken = (token) => localStorage.setItem(LOCAL_STORAGE_ITEMS.TOKEN, token); 

export const setUserEmail = () => {
    const emailId = getJWTData().email;
    localStorage.setItem(LOCAL_STORAGE_ITEMS.EMAIL_ID, emailId);
};

export const setUserId = () => {
    const userId = getJWTData().id;
    localStorage.setItem(LOCAL_STORAGE_ITEMS.USER_ID, userId);
};

export const setOtpSentTime = (time) => {
    localStorage.setItem(LOCAL_STORAGE_ITEMS.OTP_SENT_TIME, time);
};

export const setOtpSent = () => localStorage.setItem(LOCAL_STORAGE_ITEMS.OTP_SENT, true);

export const removeOtpSentTime = () => localStorage.removeItem(LOCAL_STORAGE_ITEMS.OTP_SENT_TIME);

export const removeOtpSent = () => localStorage.removeItem(LOCAL_STORAGE_ITEMS.OTP_SENT);

export const isLoggedIn = () => {
    return !!getToken();
};

export const initializeUserValues = () => {
    setUserEmail();
    setUserId();
};

export const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_ITEMS.TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_ITEMS.EMAIL_ID);
    localStorage.removeItem(LOCAL_STORAGE_ITEMS.USER_ID);
    removeOtpSent();
    removeOtpSentTime();
};

export const makeParamRequestApiUrl = (url, paramId) => url + '/' + paramId;

export const makeUserNameString = (title, firstName, lastName) => {
    if(title)
        return title + ' ' + firstName + ' ' + lastName;
    else
        return firstName + ' ' + lastName;
};

export const formatDate = (date) => {
    if(!date)
        return "";
    const newDate = new Date(date);
    const options = {  year: 'numeric', month: 'long', day: 'numeric' };
    return newDate.toLocaleDateString('en-in', options);
};

export const isLoading = (status) => status === API_STATUS_ENUM.LOADING;

export const apiStatusFailed = (status) => status == API_STATUS_ENUM.FAILED;

export const createQueryParamsUrl = (url, params) => {
    url += '?';
    params.forEach((value, key) => {
        url += key + '=' + value + '&';
    });
    return url.slice(0, -1);
};

export const formatDayJsDate = (date) => {
    if(date)
      return dayjs(moment(new Date(date)).format('DD-MM-YYYY'), 'DD-MM-YYYY')
    return dayjs();
};