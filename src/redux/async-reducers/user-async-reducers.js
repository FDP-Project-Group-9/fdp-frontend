import { requestHandler } from '../../utils/apiCall';
import { UMS_API_URLS, WORKSHOP_API_URLS } from '../../utils/apiUrls';
import { createQueryParamsUrl, makeParamRequestApiUrl } from '../../utils/helper';

export const fetchUserDetailsThunk = async (userId) => {
    try {
        const userDetailsResponse = await requestHandler.get(makeParamRequestApiUrl(UMS_API_URLS.USER_DETAILS, userId));
        return Promise.resolve(userDetailsResponse.data);
    }
    catch(error) {
        return Promise.reject(error);
    }
};

export const updaeUserProfileDetailsThunk = async ({ 
    data,
    userId
}) => {
    try {
        await requestHandler.put(UMS_API_URLS.UPDATE_PROFILE + "/" + userId, data);
        return Promise.resolve('Success');
    }
    catch(error) {
        return Promise.reject(error);
    }
};

export const modifyCoordinatorExtraDetailsThunk = async ({ 
    data, 
    edit, 
    updateWorkshop
}) => {
    try {
        const params = new Map();
        params.set('edit', edit);
        params.set('update_workshop', updateWorkshop);
        await requestHandler.put(createQueryParamsUrl(WORKSHOP_API_URLS.COORDINATOR_DETAILS, params), data);
    }
    catch(error) {
        return Promise.reject(error);
    }
};

export const modifyInstituteDetailsThunk = async ({
    data, 
    edit, 
    updateWorkshop
}) => {
    try {
        const params = new Map();
        params.set('edit', edit);
        params.set('update_workshop', updateWorkshop);
        await requestHandler.put(createQueryParamsUrl(WORKSHOP_API_URLS.INSTITUTE_DETAILS, params), data);
    }
    catch(error) {
        return Promise.reject(error);
    }
}