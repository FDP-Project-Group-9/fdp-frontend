export enum UMS_API_URLS {
    LOGIN = '/ums/login',
    SIGNUP = '/ums/signup',
    USER_DETAILS = '/ums/user-details',
    UPLOAD_REGISTRATION_DOC = '/ums/upload/registration-doc',
    UPDATE_PROFILE = '/ums/update-profile',
    COORDINATORS = '/ums/coordinators',
    GET_REGISTRATION_DOCUMENT = '/ums/view/registration-doc',
    APPROVE_COORDINATOR = '/ums/approve-registration'
};

export enum WORKSHOP_API_URLS {
    COORDINATOR_DETAILS = '/workshop/create-workshop/coordinator-details',
    INSTITUTE_DETAILS = '/workshop/create-workshop/institute-details',
    USER_WORKSHOPS = '/workshop/user-workshops',
    CREATE_WORKSHOP_DRAFT = '/workshop/create-workshop/draft',
    WORKSHOP_DETAILS = '/workshop',
    MODIFY_WORKSHOP_DETAILS = '/workshop/create-workshop/workshop-details',
    GET_WORKSHOP_APPLICATION_SUBMIT_OTP = '/workshop/create-workshop/otp',
    VERIFY_WORKSHOP_APPLICATION_SUBMIT_OTP = '/workshop/create-workshop/verify-otp',
    SUBMIT_WORKSHOP_APPLICATION = '/workshop/create-workshop',
    APPROVE_APPLICATION = '/workshop/approve-application',
    GET_WORKSHOP_MEDIA_IMAGE_URL = '/workshop/view/media-image',
    GET_WORKSHOP_IMAGE = '/workshop/view/image'
};

export enum SPECIALIZATION_API_URLS {
    GET_SPECIALIZATIONS = '/workshop/specializations',
    ADD_SPECIALIZATION = '/workshop/specialization'
};