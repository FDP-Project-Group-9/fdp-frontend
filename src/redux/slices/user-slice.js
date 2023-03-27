import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_STATUS_ENUM } from "../../utils/constants";
import { fetchUserDetailsThunk, modifyCoordinatorExtraDetailsThunk, modifyInstituteDetailsThunk, updaeUserProfileDetailsThunk } from "../async-reducers/user-async-reducers";
import { USER_ASYNC_THUNK_ACTION_TYPE_PREFIX_ENUM } from "../constants";

const initialState = {
    data: {},
    status: API_STATUS_ENUM.IDLE
};

//async thunk creator for fetching user details
export const fetchUserDetails = createAsyncThunk(USER_ASYNC_THUNK_ACTION_TYPE_PREFIX_ENUM.FETCH_USER, fetchUserDetailsThunk);

//async thunk creator for updating user profile
export const updateUserDetails = createAsyncThunk(USER_ASYNC_THUNK_ACTION_TYPE_PREFIX_ENUM.UPDATE_USER_DETAILS, updaeUserProfileDetailsThunk);

// async thunk creator for modifying coordinator extra details
export const modifyCoordinatorExtraDetails = createAsyncThunk(USER_ASYNC_THUNK_ACTION_TYPE_PREFIX_ENUM.MODIFY_COORDINATOR_EXTRA_DETAILS, modifyCoordinatorExtraDetailsThunk);

// async thunk creator for modifying insitute details
export const modifyInstituteDetails = createAsyncThunk(USER_ASYNC_THUNK_ACTION_TYPE_PREFIX_ENUM.MODIFY_INSTITUTE_DETAILS, modifyInstituteDetailsThunk);

//initializing the slice for state
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            //fetch user details reducers...
            .addCase(fetchUserDetails.pending, (state, action) => {
                state.status = API_STATUS_ENUM.LOADING;
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.status = API_STATUS_ENUM.SUCCESS;
                state.data = {...action.payload};
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.status = API_STATUS_ENUM.FAILED;
            })
            //update user details reducers....
            .addCase(updateUserDetails.pending, (state, action) => {
                state.status = API_STATUS_ENUM.LOADING;
            })
            .addCase(updateUserDetails.fulfilled, (state, action) => {
                state.status = API_STATUS_ENUM.SUCCESS;
            })
            .addCase(updateUserDetails.rejected, (state, action) => {
                state.status = API_STATUS_ENUM.FAILED;
            })
            //update coordinator extra details reducers...
            .addCase(modifyCoordinatorExtraDetails.pending, (state, action) => {
                state.status = API_STATUS_ENUM.LOADING;
            })
            .addCase(modifyCoordinatorExtraDetails.fulfilled, (state, action) => {
                state.status = API_STATUS_ENUM.SUCCESS;
            })
            .addCase(modifyCoordinatorExtraDetails.rejected, (state, action) => {
                state.status = API_STATUS_ENUM.FAILED;
            })
            //update institute details reducers...
            .addCase(modifyInstituteDetails.pending, (state, action) => {
                state.status = API_STATUS_ENUM.LOADING;
            })
            .addCase(modifyInstituteDetails.fulfilled, (state, action) => {
                state.status = API_STATUS_ENUM.SUCCESS;
            })
            .addCase(modifyInstituteDetails.rejected, (state, action) => {
                state.status = API_STATUS_ENUM.FAILED;
            })
    }
});

// selector function to get user data from the state
export const selectUserData = (state) => state.user.data;
// selector function to get the status of user details
export const selectUserApiCallStatus = (state) => state.user.status;

//exporting the reducer
export default userSlice.reducer;