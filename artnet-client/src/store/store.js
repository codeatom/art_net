import { configureStore } from '@reduxjs/toolkit';


const postReducer = (state = { }, action) => {
    switch (action.type) {
        
    }
    return state;
}


const userReducer = (state = { }, action) => {
    switch (action.type) {

    }
    return state;
}


const parameterReducer = (state = { }, action) => {
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
