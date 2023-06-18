export enum UMS_API_URLS {
    LOGIN = '/ums/login',
    SIGNUP = '/ums/signup',
    USER_DETAILS = '/ums/user-details',
    UPLOAD_REGISTRATION_DOC = '/ums/upload/registration-doc',
    UPDATE_PROFILE = '/ums/update-profile',
    COORDINATORS = '/ums/coordinators',
    GET_REGISTRATION_DOCUMENT = '/ums/view/registration-doc',
    APPROVE_COORDINATOR = '/ums/approve-registration',
    UPLOAD_MANDATE_DOCS = '/ums/upload/mandate-docs',
    GET_COORDINATOR_MANDATE_FORM = '/ums/view/mandate-form',
    GET_COORDINATOR_PHOTO = '/ums/view/coordinator-photo',
    GET_COORDINATOR_SIGNATURE = '/ums/view/coordinator-signature',
    GET_INSTITUTE_LOGO = '/ums/view/institute-logo'
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
    GET_WORKSHOP_IMAGE = '/workshop/view/image',
    GET_WORKSHOP_REPORT = '/workshop/view/report',
    GET_WORKSHOP_CERTIFICATE = '/workshop/view/certificate',
    GET_WORKSHOP_STMT_EXPENDITURE = '/workshop/view/stmt-of-expenditure',
    ADD_WORKSHOP_SPEAKER = '/workshop/create-workshop/resource-persons',
    ADD_WORKSHOP_MEDIA_IMAGES = '/workshop/upload/media-images',
    ADD_WORKSHOP_IMAGES = '/workshop/upload/images',
    ADD_WORKSHOP_REPORT = '/workshop/upload/report',
    ADD_WORKSHOP_STMT_EXPENDITURE = '/workshop/upload/stmt-expenditure',
    DELETE_WORKSHOP_MEDIA_IMAGE = '/workshop/delete/media-image',
    DELETE_WORKSHOP_IMAGE = '/workshop/delete/image',
    DELETE_WORKSHOP_REPORT = '/workshop/delete/report',
    DELETE_WORKSHOP_STMT_EXPENDITURE = '/workshop/delete/stmt-expenditure',
    CREATE_WORKSHOP_BROCHURE = '/workshop/create-workshop/brochure',
    GET_WORKSHOP_BROCHURE = '/workshop/view/brochure',
    DELETE_WORKSHOP_BROCHURE = '/workshop/delete/brochure',
    APPLY_TO_WORKSHOP = '/participant/workshop/participant/apply',
    GET_APPLIED_WORKSHOPS = '/participant/workshop/participants/getWorkshops',
    GET_WORKSHOP_PARTICIPANTS = '/workshop/workshop-participants/workshop/getParticipants',
    APPROVE_PARTICIPANT_PARTICIPATION = "/workshop/workshop-participants/workshop/approve-participant",
    GET_PARTICIPANT_DETAILS = "/participant/workshop/participant/getParticipantDetailWorkshop",
    UPDATE_ATTENDANCE = "/workshop/workshop-participants/workshop/update-attendance",
    FINANCE_REPORT = "/workshop/finance/report"
};

export enum QUIZ_API_URLS {
    CREATE_QUIZ = "/workshop/quiz/create_quiz",
    GET_QUIZ_DETAILS = "/workshop/quiz/get-quizDetails",
    ADD_QUIZ_QUESTION = "/workshop/quiz/addQuestion",
    GET_QUIZ_QUESTIONS = "/workshop/quiz/getQuestions",
    DELETE_QUIZ_QUESTIONS = "/workshop/quiz/delete-question",
    QUIZ_QUESTIONS_PARTICIPANTS = "/participant/workshop/participant/getParticipantQuiz",
    EVALUATE_QUIZ = "/participant/workshop/participant/evaluateScore"
};

export enum SPECIALIZATION_API_URLS {
    GET_SPECIALIZATIONS = '/workshop/specializations',
    ADD_SPECIALIZATION = '/workshop/specialization'
};

export enum RESOURCE_PERSON_API_URLS {
    GET_ALL_RESOURCE_PERSONS = '/resource-person/fetch-details',
    GET_RESOURCE_PERSON_DETAILS = '/resource-person/fetch',
    MODIFY_RESOURCE_PERSON = '/resource-person/add'
};