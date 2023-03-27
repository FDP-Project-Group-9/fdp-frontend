export const baseAPIUrl = 'http://localhost:5000';

export enum API_STATUS_ENUM {
    IDLE = "idle",
    LOADING = "loading",
    SUCCESS = "success",
    FAILED = "failed"
};

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

export enum OPEN_ROUTES {
    LOGIN = '/login',
    SIGNUP = '/signup',
    UPLOAD_DOCS = '/upload-docs',
    NO_MATCH = '*'
};

/*
    Coordinator Routes :-
        - Workshop :-
            - My Workshops -- Show all the created/draft workshops of the coordinator
            - Create Workshop -- Create a workshop
            - Resource Persons -- Resource Persons for the workshop
            - Participants
            - Feedback
            - Certificate 
            - Attendance 

*/

export enum COORDINATOR_ROUTES {
    BASE = "/coordinator",
    My_WORKSHOP = "/coordinator/workshops",
    CREATE_WORKSHOP = "/coordinator/workshop/create-workshop",
    RESOURCE_PERSON = "/coordinator/workshop/resource-person",
    PARTICIPANTS = "/coordinator/workshop/participants",
    FEEDBACK = "/coordinator/workshop/feedback",
    CERTIFICATE = "/coordinator/workshop/certificate",
    ATTENDANCE = "/coordinator/workshop/attendance",
    MY_PROFILE = "/coordinator/my-profile",
    MANDATE_DOCS = "/coordinator/mandate-docs",
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

const COORDINATOR_WORKSHOP_NAV_OPTIONS = [
    {
        label: 'My Workshops',
        key: COORDINATOR_ROUTES.My_WORKSHOP,
        icon: null,
        children: null
    },
    {
        label: 'Create Workshop',
        key: COORDINATOR_ROUTES.CREATE_WORKSHOP,
        icon: null,
        children: null
    },
    {
        label: 'Resource Person',
        key: COORDINATOR_ROUTES.RESOURCE_PERSON,
        icon: null,
        children: null
    },
    {
        label: 'Participants',
        key: COORDINATOR_ROUTES.PARTICIPANTS,
        icon: null,
        children: null
    },
    {
        label: 'Feedback',
        key: COORDINATOR_ROUTES.FEEDBACK,
        icon: null,
        children: null
    },
    {
        label: 'Certificate',
        key: COORDINATOR_ROUTES.CERTIFICATE,
        icon: null,
        children: null
    },
    {
        label: 'Attendance',
        key: COORDINATOR_ROUTES.ATTENDANCE,
        icon: null,
        children: null
    }
];

const COORDINATOR_PROFILE_NAV_OPTIONS = [
    {
        label: 'My Profile',
        key: COORDINATOR_ROUTES.MY_PROFILE,
        icon: null,
        children: null
    },
    {
        label: 'Mandate Documents',
        key: COORDINATOR_ROUTES.MANDATE_DOCS,
        icon: null,
        children: null
    },
];

export const COORDINATOR_NAVMENU_OPTIONS = {
    WORKSHOP: {
        label: 'Workshop',
        key: 'workshop_menu',
        icon: null,
        children: COORDINATOR_WORKSHOP_NAV_OPTIONS
    },
    PROFILE: {
        label: 'Profile',
        key: 'profile_menu',
        icon: null,
        children: COORDINATOR_PROFILE_NAV_OPTIONS
    }
};

export const PARTICIPANT_NAVMENU_OPTIONS = {

};