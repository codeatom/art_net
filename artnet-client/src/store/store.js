import { configureStore } from '@reduxjs/toolkit';


const UPDATE_USER_IMG = 'UPDATE_USER_IMG';
const UPDATE_USER_NAME = 'UPDATE_USER_NAME';
const UPDATE_USER_POST_ARRAY = 'UPDATE_USER_POST_ARRAY';


const postReducer = (state = { userPostArray: [] }, action) => {
    switch (action.type) {
        case UPDATE_USER_POST_ARRAY: return {
            ...state,
            userPostArray: action.userPostList
        };
    }
    return state;
}


const userReducer = (state = { userImage: "", userName: "" }, action) => {
    switch (action.type) {
        case UPDATE_USER_IMG: return {
            ...state,
            userImage: action.userImage
        };
        case UPDATE_USER_NAME: return {
            ...state,
            userName: action.userName
        };
        default: { };
    }
    return state;
}


const parameterReducer = (state = {}, action) => {
    switch (action.type) {

    }
    return state;
}


export const store = configureStore({
    reducer: {
        post: postReducer,
        user: userReducer,
        parameter: parameterReducer,
    }
});
