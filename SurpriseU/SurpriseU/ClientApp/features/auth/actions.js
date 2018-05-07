import {
    LOGIN,
    LOGIN_PAGE_UNLOADED,
    REGISTER,
    LOGOUT
} from '../../actionTypes';

import api from '../../api'

export const login = (email, password, rememberMe) => ({
    type: LOGIN,
    payload: api.auth.login(email, password, rememberMe)
})

export const unload = () => ({
    type: LOGIN_PAGE_UNLOADED
})

export const register = (user) => ({
    type: REGISTER,
    payload: api.auth.register(user)
})

export const logout = () => ({
    type: LOGOUT,
    payload: api.auth.logout()
})