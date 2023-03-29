import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { LOGOUT_ACTION_TYPE } from './constants';

import userSlice from './slices/user-slice';
import workshopSlice from './slices/workshop-slice';

const rootReducer = combineReducers({
    user: userSlice,
    workshop: workshopSlice
});

export default configureStore ({
    reducer: (state, action) => {
        if(action.type == LOGOUT_ACTION_TYPE)
            state = undefined;
        
        return rootReducer(state, action);
    }
});