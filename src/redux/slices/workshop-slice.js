import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_STATUS_ENUM } from "../../utils/constants";
import { fetchAllWorkshopsThunk, fetchCoordinatorWorkshopsThunk, fetchWorkshopDetailsThunk, modifyWorkshopDetailsThunk } from "../async-reducers/workshop-async-reducers";
import { WORKSHOP_ASYNC_THUNK_ACTION_TYPE_PREFIX_ENUM } from "../constants";

const initialState = {
    //array to contain all the user workshops
    userWorkshopsData: [],
    // array to store all workshops data
    allWorkshopsData: [],
    //object to contain the details of a single workshop
    singleWorkshopData: {
         //object to store coordinator details
         coordinatorDetails: {},
         //object to store institute details
         instituteDetails: {},
         //object to store workshop details
         workshopDetails: {},
         //array to store the details of workshop speakers
         workshopSpeakers: [],
         //object to store co-coordinator details
         coCoordinatorDetails: {},
         //object to store files url's
         files: {},
         //key to store the draft state of workshop 
         draft: null,
         //key to store the otp verification status
         otpVerified: null
    },
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

// reducer thunk function to fetch coordinator workshops using pagination
export const fetchCoordinatorWorkshops = createAsyncThunk(WORKSHOP_ASYNC_THUNK_ACTION_TYPE_PREFIX_ENUM.FETCH_USER_WORKSHOPS, fetchCoordinatorWorkshopsThunk);

// reducer thunk function to fetch all the workshops using pagination
export const fetchAllWorkshops = createAsyncThunk(WORKSHOP_ASYNC_THUNK_ACTION_TYPE_PREFIX_ENUM.FETCH_ALL_WORKSHOPS, fetchAllWorkshopsThunk);

// reducer thunk function to fetch workshop details
export const fetchWorkshopDetails = createAsyncThunk(WORKSHOP_ASYNC_THUNK_ACTION_TYPE_PREFIX_ENUM.FETCH_WORKSHOP_DETAILS, fetchWorkshopDetailsThunk);

// reducer thunk function to modify workshop details
export const modifyWorkshopDetails = createAsyncThunk(WORKSHOP_ASYNC_THUNK_ACTION_TYPE_PREFIX_ENUM.MODIFY_WORKSHOP_DETAILS, modifyWorkshopDetailsThunk);

const workshopSlice = createSlice({
    name: 'workshop',
    initialState,
    reducers: {
        nextPage: (state, action) => {
            state.paginationObj.pageNo++;
        },
        changeNoOfItemsPerPage: (state, action) => {
            state.paginationObj.perPage = action.payload;
        },
        resetUserWorkshopData: (state, action) => {
            state.userWorkshopsData = [];
        },
        resetPaginationObj: (state, action) => {
            state.paginationObj = {
                pageNo: 1,
                perPage: 10,
                totalWorkshopsCount: 0,
            };
        },
        resetAllWorkshopsData: (state, action) => {
            state.allWorkshopsData = [];
        }
    },
    extraReducers(builders) {
        builders
        //reducers for fetching coordinator workshops
        .addCase(fetchCoordinatorWorkshops.pending, (state, action) => {
            state.status = API_STATUS_ENUM.LOADING;
        })
        .addCase(fetchCoordinatorWorkshops.fulfilled, (state, action) => {
            state.userWorkshopsData = [...state.userWorkshopsData, ...action.payload.workshops];
            state.paginationObj.totalWorkshopsCount = action.payload.total_workshops_count || 0;
            state.status = API_STATUS_ENUM.SUCCESS;
        })
        .addCase(fetchCoordinatorWorkshops.rejected, (state, action) => {
            state.status = API_STATUS_ENUM.FAILED;
        })
        //reducers for fetching workshop details
        .addCase(fetchWorkshopDetails.pending, (state, action) => {
            state.status = API_STATUS_ENUM.LOADING;
        })
        .addCase(fetchWorkshopDetails.fulfilled, (state, action) => {
            state.singleWorkshopData.coordinatorDetails = action.payload.coordinator_details;
            state.singleWorkshopData.coCoordinatorDetails = action.payload.co_coordinator_details;
            state.singleWorkshopData.instituteDetails = action.payload.institute_details;
            state.singleWorkshopData.workshopDetails = action.payload.workshop_details;
            state.singleWorkshopData.workshopSpeakers = action.payload.resource_persons;
            state.singleWorkshopData.files = action.payload.files_url;
            state.singleWorkshopData.draft = action.payload.draft;
            state.singleWorkshopData.otpVerified = action.payload.otp_verified;
            state.status = API_STATUS_ENUM.SUCCESS;
        })
        .addCase(fetchWorkshopDetails.rejected, (state, action) => {
            state.status = API_STATUS_ENUM.FAILED;
        })
        //reducers for fetching all workshops
        .addCase(fetchAllWorkshops.pending, (state, action) => {
            state.status = API_STATUS_ENUM.LOADING;
        })
        .addCase(fetchAllWorkshops.fulfilled, (state, action) => {
            state.allWorkshopsData = [...state.allWorkshopsData, ...action.payload.workshops];
            state.paginationObj.totalWorkshopsCount = action.payload.total_workshops_count || 0;
            state.status = API_STATUS_ENUM.SUCCESS;
        })
        .addCase(fetchAllWorkshops.rejected, (state, action) => {
            state.status = API_STATUS_ENUM.FAILED;
        })
        //reducers for modifying workshop details
        .addCase(modifyWorkshopDetails.pending, (state, action) => {
            state.status = API_STATUS_ENUM.LOADING;
        })
        .addCase(modifyWorkshopDetails.fulfilled, (state, action) => {
            state.status = API_STATUS_ENUM.SUCCESS;
        })
        .addCase(modifyWorkshopDetails.rejected, (state, action) => {
            state.status = API_STATUS_ENUM.FAILED;
        })
    }
});

// selector function to select workshop api call status
export const selectWorkshopApiCallStatus = state => state.workshop.status;

//selector function to select user workshop data
export const selectUserWorkshopsData = state => state.workshop.userWorkshopsData;

//selector function to select all workshops data
export const selectAllWorkshopsData = state => state.workshop.allWorkshopsData;

//selector function to select single workshop data
export const selectSingleWorkshopData = state => state.workshop.singleWorkshopData;

//selector function to select total workshops count
export const selectTotalWorkshopsCountData = state => state.workshop.paginationObj.totalWorkshopsCount;

//selector function to select current page no
export const selectPageNo = state => state.workshop.paginationObj.pageNo;

//selector function to select per page items no
export const selectPerPage = state => state.workshop.paginationObj.perPage;

//selector function to select workshop coordinator details
export const selectWorkshopCoordinatorDetails = state => state.workshop.singleWorkshopData.coordinatorDetails;

//selector function to select workshop co-coordinator-details
export const selectWorkshopCoCoordinatorDetails = state => state.workshop.singleWorkshopData.coCoordinatorDetails;

//selector function to select workshop institute details
export const selectWorkshopInstituteDetails = state => state.workshop.singleWorkshopData.instituteDetails;

//selector function to select workshop speakers details
export const selectWorkshopSpeakersDetails = state => state.workshop.singleWorkshopData.workshopSpeakers;

//selector function to select workshop details
export const selectWorkshopDetails = state => state.workshop.singleWorkshopData.workshopDetails;

//selector funtion to select workshop files details
export const selectWorkshopFilesDetails = state => state.workshop.singleWorkshopData.files;

//selector function to select workshop draft details
export const selectWorkshopDraftStatus = state => state.workshop.singleWorkshopData.draft;

//selector function to select workshop otp verification details
export const selectWorkshopOTPVerificationStatus = state => state.workshop.singleWorkshopData.otpVerified;

//exporting reducers
export const { 
    changeNoOfItemsPerPage, 
    nextPage, 
    resetUserWorkshopData,
    resetPaginationObj,
    resetAllWorkshopsData
} = workshopSlice.actions;

export default workshopSlice.reducer;