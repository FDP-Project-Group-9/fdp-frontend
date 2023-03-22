export const baseAPIUrl = 'http://localhost:5000';

export enum ROLE_NAMES {
    ADMINISTRATOR = 'administrator',
    COORDINATOR = 'coordinator',
    PARTICIPANT = 'participant'
};

export enum API_METHODS {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete'
};

export enum UMS_API_URLS {
    LOGIN = '/ums/login',
    SIGNUP = '/ums/signup'
};

export enum OPEN_ROUTES {
    LOGIN = '/login',
    SIGNUP = '/signup',
    NO_MATCH = '*'
};

export enum COORDINATOR_ROUTES {
    BASE = "/coordinator",
    DASHBOARD = "/coordinator/dashboard",
    PROFILE = "/coordinator/profile",
};

export enum PARTICIPANT_ROUTES {
    BASE = "/participant",
    DASHBOARD = "/participant/dashboard"
};

export enum ADMIN_ROUTES {
    BASE = "/admin",
    DASHBOARD = "/admin/dashboard"
};

export const ADMIN_NAVMENU_OPTIONS = {

};

export const COORDINATOR_NAVMENU_OPTIONS = {
    DASHBOARD: {
        label: 'Dashboard',
        key: COORDINATOR_ROUTES.DASHBOARD,
        icon: null,
    },
    PROFILE: {
        label: 'Profile',
        key: COORDINATOR_ROUTES.PROFILE,
        icon: null
    }
};

export const PARTICIPANT_NAVMENU_OPTIONS = {

};