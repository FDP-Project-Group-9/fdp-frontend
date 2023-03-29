import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_STATUS_ENUM } from "../../utils/constants";
import { fetchCoordinatorWorkshopsThunk } from "../async-reducers/workshop-async-reducers";
import { WORKSHOP_ASYNC_THUNK_ACTION_TYPE_PREFIX_ENUM } from "../constants";

const initialState = {
    //array to contain all the user workshops
    UserWorkshopsData: [],
    //object to contain the details of a single workshop
    singleWorkshopData: {},
    //object to store the filters
    filters: {},
    //status of api call
    status: API_STATUS_ENUM.IDLE,
    //object to contain details for pagination
    paginationObj: {
        pageNo: 1,
        perPage: 10,
        totalWorkshopsCount: 0,
    }
};

export const fetchCoordinatorWorkshops = createAsyncThunk(WORKSHOP_ASYNC_THUNK_ACTION_TYPE_PREFIX_ENUM.FETCH_USER_WORKSHOPS, fetchCoordinatorWorkshopsThunk);

const workshopSlice = createSlice({
    name: 'workshop',
    initialState,
    reducers: {
        nextPage: (state, action) => {
            state.paginationObj.pageNo++;
        },
        changeNoOfItemsPerPage: (state, action) => {
            state.paginationObj.perPage = action.payload;
        }
    },
    extraReducers(builders) {
        builders
        .addCase(fetchCoordinatorWorkshops.pending, (state, action) => {
            state.status = API_STATUS_ENUM.LOADING;
        })
        .addCase(fetchCoordinatorWorkshops.fulfilled, (state, action) => {
            state.UserWorkshopsData = [...state.UserWorkshopsData, ...action.payload.workshops];
            state.paginationObj.totalWorkshopsCount = action.payload.total_workshops_count || 0;
            state.status = API_STATUS_ENUM.SUCCESS;
        })
        .addCase(fetchCoordinatorWorkshops.rejected, (state, action) => {
            state.status = API_STATUS_ENUM.FAILED;
        })
    }
});

// selector function to select workshop api call status
export const selectWorkshopApiCallStatus = state => state.workshop.status;

//selector function to select multiple workshop data
export const selectUserWorkshopsData = state => state.workshop.UserWorkshopsData;

//selector function to select single workshop data
export const selectSingleWorkshopData = state => state.workshop.singleWorkshopData;

//selector function to select total workshops count
export const selectTotalWorkshopsCountData = state => state.workshop.paginationObj.totalWorkshopsCount;

//selector function to select current page no
export const selectPageNo = state => state.workshop.paginationObj.pageNo;

//selector function to select per page items no
export const selectPerPage = state => state.workshop.paginationObj.perPage;

//exporting reducers
export const { changeNoOfItemsPerPage, nextPage } = workshopSlice.actions;

export default workshopSlice.reducer;