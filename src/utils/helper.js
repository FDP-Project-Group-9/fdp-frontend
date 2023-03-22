import jwt_decode from 'jwt-decode';

const LOCAL_STORAGE_ITEMS = {
    TOKEN: "token",
    PROFILE_APPROVED: "profile_approved"
};

export const getToken = () => {
    let token = localStorage.getItem(LOCAL_STORAGE_ITEMS.TOKEN)
    return token;
};

export const getJWTData = () => {
    const token = getToken();
    return jwt_decode(token);
};

export const setJwtToken = (token) => localStorage.setItem(LOCAL_STORAGE_ITEMS.TOKEN, token); 

export const setProfileStatus = () => { 
    const status = getJWTData().profile_approved;
    localStorage.setItem(LOCAL_STORAGE_ITEMS.PROFILE_APPROVED, status);
}

export const isLoggedIn = () => {
    return !!getToken();
};

export const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_ITEMS.TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_ITEMS.PROFILE_APPROVED);
};