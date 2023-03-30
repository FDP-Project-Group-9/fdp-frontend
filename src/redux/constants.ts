export enum USER_ASYNC_THUNK_ACTION_TYPE_PREFIX_ENUM {
    FETCH_USER = 'user/fetchUser',
    EDIT_USER = 'user/editUser',
    UPDATE_USER_DETAILS = 'user/user-details',
    MODIFY_COORDINATOR_EXTRA_DETAILS = 'user/coordinator/modify-extra-details',
    MODIFY_INSTITUTE_DETAILS = 'user/institute/modify-details'
};

export enum WORKSHOP_ASYNC_THUNK_ACTION_TYPE_PREFIX_ENUM {
    FETCH_USER_WORKSHOPS = 'workshop/user-workshops',
    FETCH_WORKSHOP_DETAILS = 'workshop/details',
    MODIFY_WORKSHOP_DETAILS = 'workshop/modify-workshop-details'
};

export const LOGOUT_ACTION_TYPE = 'logout';