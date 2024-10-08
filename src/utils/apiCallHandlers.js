import { requestHandler } from "./apiCall";
import { QUIZ_API_URLS, RESOURCE_PERSON_API_URLS, SPECIALIZATION_API_URLS, UMS_API_URLS, WORKSHOP_API_URLS } from "./apiUrls";
import { createQueryParamsUrl } from "./helper";

export const fetchCoordinators = async (currentPageNo, perPageSize, profileStatus) => {
    const params = new Map();
    params.set('page_no', currentPageNo);
    params.set('per_page', perPageSize);
    if(profileStatus) {
        if(profileStatus !== 'all')
            params.set('profile_status', profileStatus);
    }
    try {
        const response = await requestHandler.get(createQueryParamsUrl(UMS_API_URLS.COORDINATORS, params));
        return response.data;
    }
    catch(error) {
        throw error;
    }
};

export const fetchCoordinatorDetails = async (coordinatorId) => {
    try {
        const response = await requestHandler.get(UMS_API_URLS.USER_DETAILS + "/" + coordinatorId);
        return response.data;
    }
    catch(error) {
        throw error;
    }
};

export const getIdentificationRegistrationDocument = async (coordinatorId) => {
    try {
        const params = new Map();
        params.set('user_id', coordinatorId);
        return await requestHandler.getDocument(createQueryParamsUrl(UMS_API_URLS.GET_REGISTRATION_DOCUMENT, params));
    }
    catch(error) {
        throw error;
    }
};

export const approveRejectCoordinator = async (coordinatorId, approve) => {
    try {
        return await requestHandler.put(UMS_API_URLS.APPROVE_COORDINATOR, {
            user_id: coordinatorId,
            approve: approve
        });
    }
    catch(error) {
        throw error;
    }
};

export const approveWorkshop = async (workshopId, approve) => {
    try {
        return await requestHandler.put(WORKSHOP_API_URLS.APPROVE_APPLICATION, {
            workshop_id: workshopId,
            approve: approve
        });
    }
    catch(error) {
        throw error;
    }
};

export const fetchSpecializationAreas = async (setSpecializationAreas) => {
    try {
        const response = await requestHandler.get(SPECIALIZATION_API_URLS.GET_SPECIALIZATIONS);
        setSpecializationAreas(response.data);
    }
    catch(error) {}
};

export const fetchWorkshopSpeakers = async (searchQuery) => {
    try {
        const params = new Map();
        params.set('name', searchQuery);
        const speakersResponse = await requestHandler.get(createQueryParamsUrl(RESOURCE_PERSON_API_URLS.GET_ALL_RESOURCE_PERSONS, params));
        return speakersResponse.data;
    }
    catch(error) {
        throw error;
    }
};

export const findWorkshopSpeakerDetails = async (speakerId) => {
    try {
        const response = await requestHandler.get(RESOURCE_PERSON_API_URLS.GET_RESOURCE_PERSON_DETAILS + "/" + speakerId);
        return response.data;
    }
    catch(error) {
        throw error;
    }
};

export const modifyWorkshopSpeakerDetails = async (data, edit) => {
    try {
        const params = new Map();
        params.set('edit', edit);
        return await requestHandler.put(createQueryParamsUrl(RESOURCE_PERSON_API_URLS.MODIFY_RESOURCE_PERSON, params), data);
    }
    catch(error) {
        throw error;
    }
};

export const addWorkshopSpeaker = async (workshopId, speakersId) => {
    try {
        return await requestHandler.put(WORKSHOP_API_URLS.ADD_WORKSHOP_SPEAKER, {
            workshop_id: workshopId,
            resource_persons: speakersId
        });
    }
    catch(error) {
        throw error;
    }
};

export const removeWorkshopSpeaker = async (workshopId, speakerId) => {
    try {
        return await requestHandler.delete(WORKSHOP_API_URLS.ADD_WORKSHOP_SPEAKER, {
            workshop_id: workshopId,
            resource_person_id: speakerId
        });
    }
    catch(error) {
        throw error;
    }
};

export const getWorkshopMediaImage = async (fileId) => {
    try {
        return await requestHandler.getDocument(WORKSHOP_API_URLS.GET_WORKSHOP_MEDIA_IMAGE_URL + "/" + fileId);
    }
    catch(error) {
        throw error;
    }
};

export const getWorkshopImage = async (fileId) => {
    try {
        return await requestHandler.getDocument(WORKSHOP_API_URLS.GET_WORKSHOP_IMAGE + "/" + fileId);
    }
    catch(error) {
        throw error;
    }
};

export const getWorkshopReport = async (fileId) => {
    try{
        return await requestHandler.getDocument(WORKSHOP_API_URLS.GET_WORKSHOP_REPORT + "/" + fileId);
    }
    catch(error) {
        throw error;
    }
};

export const getWorkshopCertificate = async () => {
    try{
        return await requestHandler.getDocument(WORKSHOP_API_URLS.GET_WORKSHOP_CERTIFICATE);
    }
    catch(error) {
        throw error;
    }
};

export const getWorkshopStmtExpenditure = async (fileId) => {
    try {
        return await requestHandler.getDocument(WORKSHOP_API_URLS.GET_WORKSHOP_STMT_EXPENDITURE + "/" + fileId);
    }
    catch(error) {
        throw error;
    }
};

export const addWorkshopMediaImages = async (formData) => {
    try {
        return await requestHandler.put(WORKSHOP_API_URLS.ADD_WORKSHOP_MEDIA_IMAGES, formData);
    }
    catch(error) {
        throw error;
    }
};

export const addWorkshopImages = async (formData) => {
    try {
        return await requestHandler.put(WORKSHOP_API_URLS.ADD_WORKSHOP_IMAGES, formData);
    }
    catch(error) {
        throw error;
    }
};

export const addWorkshopReport = async (formData) => {
    try {
        return await requestHandler.put(WORKSHOP_API_URLS.ADD_WORKSHOP_REPORT, formData);
    }
    catch(error) {
        throw error;
    }
};

export const addWorkshopStmtExpenditure = async (formData) => {
    try {
        return await requestHandler.put(WORKSHOP_API_URLS.ADD_WORKSHOP_STMT_EXPENDITURE, formData);
    }
    catch(error) {
        throw error;
    }
};

export const deleteWorkshopMediaImage = async (workshopId, fileId) => {
    try {
        return await requestHandler.delete(WORKSHOP_API_URLS.DELETE_WORKSHOP_MEDIA_IMAGE, {
            workshop_id: workshopId, 
            file_id: fileId
        });
    }
    catch(error) {
        throw error;
    }
};

export const deleteWorkshopImage = async (workshopId, fileId) => {
    try {
        return await requestHandler.delete(WORKSHOP_API_URLS.DELETE_WORKSHOP_IMAGE, {
            workshop_id: workshopId, 
            file_id: fileId
        });
    }
    catch(error) {
        throw error;
    }
};

export const deleteWorkshopReport = async (workshopId, fileId) => {
    try {
        return await requestHandler.delete(WORKSHOP_API_URLS.DELETE_WORKSHOP_REPORT, {
            workshop_id: workshopId, 
            file_id: fileId
        });
    }
    catch(error) {
        throw error;
    }
};

export const deleteWorkshopStmtExpendtiure = async (workshopId, fileId) => {
    try {
        return await requestHandler.delete(WORKSHOP_API_URLS.DELETE_WORKSHOP_STMT_EXPENDITURE, {
            workshop_id: workshopId, 
            file_id: fileId
        });
    }
    catch(error) {
        throw error;
    }
};

export const uploadCoordinatorMandateDocs = async (formData) => {
    try {
        return await requestHandler.put(UMS_API_URLS.UPLOAD_MANDATE_DOCS, formData);
    }
    catch(error) {
        throw error;
    }
};

export const deleteCoordinatorMandateDocs = async (data) => {
    try {
        return await requestHandler.delete(UMS_API_URLS.UPLOAD_MANDATE_DOCS, data);
    }
    catch(error) {
        throw error;
    }
};

export const getCoordinatorMandateForm = async () => {
    try {
        return await requestHandler.getDocument(UMS_API_URLS.GET_COORDINATOR_MANDATE_FORM);
    }
    catch(error) {
        throw error;
    }
};
export const getCoordinatorPhoto = async () => {
    try {
        return await requestHandler.getDocument(UMS_API_URLS.GET_COORDINATOR_PHOTO);
    }
    catch(error) {
        throw error;
    }
};
export const getCoordinatorSignature = async () => {
    try {
        return await requestHandler.getDocument(UMS_API_URLS.GET_COORDINATOR_SIGNATURE);
    }
    catch(error) {
        throw error;
    }
};

export const getInstituteLogo = async () => {
    try {
        return await requestHandler.getDocument(UMS_API_URLS.GET_INSTITUTE_LOGO);
    }
    catch(error) {
        throw error;
    }
};

export const createWorkshopBrochure = async (workshopId) => {
    try {
        return await requestHandler.post(WORKSHOP_API_URLS.CREATE_WORKSHOP_BROCHURE, {
            workshop_id: workshopId
        });
    }
    catch(error) {
        throw error;
    }
};

export const getWorkshopBrochure = async (fileId) => {
    try {
        const response = await requestHandler.get(WORKSHOP_API_URLS.GET_WORKSHOP_BROCHURE + "/" + fileId);
        return response.data;
    }
    catch(error) {
        throw error;
    }
};

export const deleteWorkshopBrochure = async (workshopId, fileId) => {
    try {
        return await requestHandler.delete(WORKSHOP_API_URLS.DELETE_WORKSHOP_BROCHURE, {
            workshop_id: workshopId, 
            file_id: fileId
        });
    }
    catch(error) {
        throw error;
    }
};

export const applyToWorkshop = async (workshopId, participantId) => {
    try {
        return await requestHandler.post(WORKSHOP_API_URLS.APPLY_TO_WORKSHOP, {
            workshopId: workshopId,
            participantId: participantId,
            approvalStatus: 2
        });
    }
    catch(error) {
        throw error;
    }
};

export const getWorkshopParticipants = async (workshopId, pageNo, pageSize, approvalStatus = "") => {
    try {
        const params = new Map();
        params.set("page_no", pageNo);
        params.set("per_page", pageSize);
        params.set("workshopId", workshopId);
        params.set("approvalStatus", approvalStatus);
        const response = await requestHandler.get(createQueryParamsUrl(WORKSHOP_API_URLS.GET_WORKSHOP_PARTICIPANTS, params));
        return response.data ?? {};
    }
    catch(error) {
        throw error;
    }
};

export const approveRejectParticipation = async (workshopId, participantId, approvalStatus) => {
    try {
        return await requestHandler.put(WORKSHOP_API_URLS.APPROVE_PARTICIPANT_PARTICIPATION, {
            workshopId: workshopId,
            participantId: participantId,
            approvalStatus: approvalStatus
        });
    }
    catch(error) {
        throw error;
    }
};

export const getParticipantDetails = async (workshopId, participantId) => {
    try {
        const response = await requestHandler.get(WORKSHOP_API_URLS.GET_PARTICIPANT_DETAILS + `/${workshopId}/${participantId}`);
        return response.data;
    }
    catch(error) {
        throw error;
    }
};

export const updateAttendance = async (data) => {
    try {
        return await requestHandler.put(WORKSHOP_API_URLS.UPDATE_ATTENDANCE, data);
    }
    catch(error) {
        throw error;
    }
};

export const createQuizForWorkshop = async (data) => {
    try {
        return await requestHandler.put(QUIZ_API_URLS.CREATE_QUIZ, data);
    }
    catch(error) {
        throw error;
    }
};

export const getQuizDetails = async (workshopId) => {
    try {
        const params = new Map();
        params.set("workshopId", workshopId);
        const response = await requestHandler.get(createQueryParamsUrl(QUIZ_API_URLS.GET_QUIZ_DETAILS, params));
        return response.data;
    }
    catch(error) {
        throw error;
    }
};

export const addQuizQuestion = async (data) => {
    try {
        return await requestHandler.put(QUIZ_API_URLS.ADD_QUIZ_QUESTION, data);
    }
    catch(error) {
        throw error;
    }
};

export const getQuizQuestionsForWorkshop = async (workshopId) => {
    try {
        const params = new Map();
        params.set("workshopId", workshopId);
        params.set("page_no", 1);
        params.set("per_page", 100);
        const response = await requestHandler.get(createQueryParamsUrl(QUIZ_API_URLS.GET_QUIZ_QUESTIONS, params));
        return response.data;
    }
    catch(error) {
        throw error;
    }
};

export const getQuizQuestionsForParticipants = async (workshopId, participantId) => {
    try {
        const params = new Map();
        params.set("workshopId", workshopId);
        params.set("participantId", participantId);
        params.set("page_no", 1);
        params.set("per_page", 100);
        const response = await requestHandler.get(createQueryParamsUrl(QUIZ_API_URLS.QUIZ_QUESTIONS_PARTICIPANTS, params));
        return response.data;
    }
    catch(error) {
        throw error;
    }
};

export const deleteQuizQuestion = async (data) => {
    try {
        return await requestHandler.delete(QUIZ_API_URLS.DELETE_QUIZ_QUESTIONS, data);
    }
    catch(error) {
        throw error;
    }
};


export const evaluateQuiz = async (data) => {
    try {
        return await requestHandler.put(QUIZ_API_URLS.EVALUATE_QUIZ, data);
    }
    catch(error) {
        throw error;
    }
};

export const getWorkshopFinanceReport = async (
    coordinatorId = null,
    month = null,
    year = null, 
    maxBudget = null,
    areaSpecializationId = null
) => {
    try {
        const params = new Map();
        if(coordinatorId)
            params.set('coordinator_id', coordinatorId);

        if(month)
            params.set('month', month);

        if(year)
            params.set('year', year);

        if(areaSpecializationId)
            params.set('area_specialization_id', areaSpecializationId);

        if(maxBudget)
            params.set('max_budget', maxBudget);

        return await requestHandler.get(createQueryParamsUrl(WORKSHOP_API_URLS.FINANCE_REPORT, params));
    }
    catch(error) {
        throw error;
    }
};