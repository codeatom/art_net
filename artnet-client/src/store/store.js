import { configureStore } from '@reduxjs/toolkit';


const UPDATE_USER_IMG = 'UPDATE_USER_IMG';
const UPDATE_USER_NAME = 'UPDATE_USER_NAME';
const UPDATE_USER_POST_ARRAY = 'UPDATE_USER_POST_ARRAY';
const UPDATE_ALL_POST_ARRAY = 'UPDATE_ALL_POST_ARRAY';
const UPDATE_SINGLE_POST_ARRAY = 'UPDATE_SINGLE_POST_ARRAY';
const UPDATE_CHAT_ARRAY = 'UPDATE_CHAT_ARRAY';
const TOGGLE_MODAL = 'TOGGLE_MODAL';
const IS_POST_DETAIL = 'IS_POST_DETAIL';
const HIDE_TEXT_BOX = 'HIDE_TEXT_BOX';
const DISCONNECT_FROM_CHAT = 'DISCONNECT_FROM_CHAT';


const postReducer = (state = { allPostArray: [], userPostArray: [], singlePostArray: [] }, action) => {
    switch (action.type) {
        case UPDATE_ALL_POST_ARRAY: return {
            ...state,
            allPostArray: action.allPostList
        };
        case UPDATE_USER_POST_ARRAY: return {
            ...state,
            userPostArray: action.userPostList
        };
        case UPDATE_SINGLE_POST_ARRAY: return {
            ...state,
            singlePostArray: action.singlePostList
        };
        default: { };
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


const parameterReducer = (state = { toggleModal: false, isPostDetail: false, hideTextBox: true, disconnectChat: false }, action) => {
    switch (action.type) {
        case TOGGLE_MODAL: return { 
            ...state,
            toggleModal: action.toggleModal
        };
        case IS_POST_DETAIL: return { 
            ...state,
            isPostDetail: action.isPostDetail
        };
        case HIDE_TEXT_BOX: return { 
            ...state,
            hideTextBox: action.hideTextBox
        };
        case DISCONNECT_FROM_CHAT: return { 
            ...state,
            disconnectChat: action.disconnectChat
        };
        default: { };
    }
    return state;
}


const chatReducer = (state = { chatArray: [] }, action) => {
    switch (action.type) {
        case UPDATE_CHAT_ARRAY: return {
            ...state,
            chatArray: action.chatList
        };
        default: { };
    }
    return state;
}


export const store = configureStore({
    reducer: {
        post: postReducer,
        user: userReducer,
        parameter: parameterReducer,
        chat: chatReducer
    }
});
