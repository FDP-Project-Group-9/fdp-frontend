import { requestHandler } from "../../utils/apiCall";
import { WORKSHOP_API_URLS } from "../../utils/apiUrls";
import { createQueryParamsUrl } from "../../utils/helper";
import { selectPageNo, selectPerPage } from "../slices/workshop-slice";

export const fetchCoordinatorWorkshopsThunk = async ( {filters}, { getState }) => {
    try {
        const pageNo = selectPageNo(getState());
        const perPage = selectPerPage(getState());
        const params = new Map();
        params.set('page_no', pageNo);
        params.set('per_page', perPage);
        Object.entries(filters).forEach(([key, value]) => {
          params.set(key, value);
        });
        const workshopsResponse = await requestHandler.get(createQueryParamsUrl(WORKSHOP_API_URLS.USER_WORKSHOPS, params));
        return Promise.resolve(workshopsResponse.data);
    }
    catch(error) {
        return Promise.reject(error);
    }
};

export const fetchAllWorkshopsThunk = async ({ filters, isAdmin = false}, { getState }) => {
  try {
      const pageNo = selectPageNo(getState());
      const perPage = selectPerPage(getState());
      const params = new Map();
      params.set('page_no', pageNo);
      params.set('per_page', perPage);
      params.set('is_admin', isAdmin);
      Object.entries(filters).forEach(([key, value]) => {
        params.set(key, value);
      });
      const allWorkshopsResponse = await requestHandler.get(createQueryParamsUrl(WORKSHOP_API_URLS.WORKSHOP_DETAILS, params));
      return Promise.resolve(allWorkshopsResponse.data);
  }
  catch(error) {
    return Promise.reject(error);
  }
};

export const fetchWorkshopDetailsThunk = async (workshopId) => {
  try {
    const responseData = await requestHandler.get(WORKSHOP_API_URLS.WORKSHOP_DETAILS + '/' + workshopId);
    return responseData.data;
  } 
  catch(error) {
    return Promise.reject(error);
  } 
};

export const modifyWorkshopDetailsThunk = async ({
  edit, 
  data
}) => {
  try {
    const params = new Map();
    params.set('edit', edit);
    await requestHandler.put(createQueryParamsUrl(WORKSHOP_API_URLS.MODIFY_WORKSHOP_DETAILS, params), data);
    return Promise.resolve('Success');
  }
  catch(error) {
    return Promise.reject(error);
  }
};