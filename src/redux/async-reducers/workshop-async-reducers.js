import { requestHandler } from "../../utils/apiCall";
import { WORKSHOP_API_URLS } from "../../utils/apiUrls";
import { createQueryParamsUrl } from "../../utils/helper";
import { selectPageNo, selectPerPage } from "../slices/workshop-slice";

export const fetchCoordinatorWorkshopsThunk = async ( _, { getState }) => {
    try {
        const pageNo = selectPageNo(getState());
        const perPage = selectPerPage(getState());
        const params = new Map();
        params.set('page_no', pageNo);
        params.set('per_page', perPage);
        const workshopsResponse = await requestHandler.get(createQueryParamsUrl(WORKSHOP_API_URLS.USER_WORKSHOPS, params));
        return Promise.resolve(workshopsResponse.data);
    }
    catch(error) {
        return Promise.reject(error);
    }
};