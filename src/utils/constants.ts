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
    PARENT_ROUTE = '',
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

export enum ROUTES {
    // BASE = "/coordinator",
    My_WORKSHOP = "/workshop",
    ALL_WORKSHOPS = "/all-workshops",
    CREATE_WORKSHOP = "/create-workshop",
    RESOURCE_PERSON = "/workshop/resource-person",
    PARTICIPANTS = "/workshop/participants",
    FEEDBACK = "/workshop/feedback",
    CERTIFICATE = "/workshop/certificate",
    ATTENDANCE = "/workshop/attendance",
    MY_PROFILE = "/my-profile",
    MANDATE_DOCS = "/mandate-docs",
    FINANCES = "/finances"
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
        label: 'All Workshops',
        key: ROUTES.ALL_WORKSHOPS,
        icon: null,
        children: null
    },
    {
        label: 'My Workshops',
        key: ROUTES.My_WORKSHOP,
        icon: null,
        children: null
    },
    {
        label: 'Create Workshop',
        key: ROUTES.CREATE_WORKSHOP,
        icon: null,
        children: null
    },
    {
        label: 'Finances',
        key: ROUTES.FINANCES,
        icon: null,
        children: null
    },
    // {
    //     label: 'Resource Person',
    //     key: ROUTES.RESOURCE_PERSON,
    //     icon: null,
    //     children: null
    // },
    // {
    //     label: 'Participants',
    //     key: ROUTES.PARTICIPANTS,
    //     icon: null,
    //     children: null
    // },
    // {
    //     label: 'Feedback',
    //     key: ROUTES.FEEDBACK,
    //     icon: null,
    //     children: null
    // },
    // {
    //     label: 'Certificate',
    //     key: ROUTES.CERTIFICATE,
    //     icon: null,
    //     children: null
    // },
    // {
    //     label: 'Attendance',
    //     key: ROUTES.ATTENDANCE,
    //     icon: null,
    //     children: null
    // }
];

const COORDINATOR_PROFILE_NAV_OPTIONS = [
    {
        label: 'My Profile',
        key: ROUTES.MY_PROFILE,
        icon: null,
        children: null
    },
    {
        label: 'Mandate Documents',
        key: ROUTES.MANDATE_DOCS,
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