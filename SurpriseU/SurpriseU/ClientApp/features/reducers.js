import {
    APP_LOAD,
    REDIRECT,
    LOGOUT,
    SETTINGS_SAVED,
    LOGIN,
    REGISTER,
    EDITOR_PAGE_UNLOADED,
    DELETE_PRESENT,
    EDIT_PRESENT,
    ADD_PRESENT
} from '../actionTypes';

const defaultState = {
    appName: 'SurpriseU',
    cookies: null,
    viewChangeCounter: 0
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case APP_LOAD:
            return {
                ...state,
                cookies: action.cookies || null,
                appLoaded: true,
                currentUser: action.payload ? action.payload.user : null
            };
        case REDIRECT:
            return { ...state, redirectTo: null };
        case LOGOUT:
            return { ...state, redirectTo: '/', token: null, currentUser: null };
        case SETTINGS_SAVED:
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                currentUser: action.error ? null : action.payload.user
            };
        case LOGIN:
            return {
                ...state,
                redirectTo: action.error ? null : `/id${action.payload.id}`,
                token: action.error ? null : action.payload.id,
                currentUser: action.error ? null : action.payload
        };
        case REGISTER:
            return {
                ...state,
                redirectTo: action.error ? null : `/id${action.payload.id}`,
                token: action.error ? null : action.payload.id,
                currentUser: action.error ? null : action.payload
            };
        case DELETE_PRESENT:
            return { ...state, redirectTo: '/' };
        case ADD_PRESENT:
            return { ...state, redirectTo: '/' };        
        case EDIT_PRESENT:
            return { ...state, redirectTo: '/' };
        case EDITOR_PAGE_UNLOADED:
        default:
            return state;
    }
};