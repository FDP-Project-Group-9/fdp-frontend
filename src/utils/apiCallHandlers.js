import { requestHandler } from "./apiCall";
import { UMS_API_URLS } from "./apiUrls";
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
}