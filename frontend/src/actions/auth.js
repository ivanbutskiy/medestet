import axios from 'axios';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    // PASSWORD_RESET_FAIL,
    // PASSWORD_RESET_SUCCESS,
    // PASSWORD_RESET_CONFIRM_FAIL,
    // PASSWORD_RESET_CONFIRM_SUCCESS,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    // ACTIVATION_SUCCESS,
    // ACTIVATION_FAIL,
    LOGOUT
} from './auth-types';

const API_BASE = 'http://localhost:8000';

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({token: localStorage.getItem('access')});

        try {
            const result = await axios.post(`${API_BASE}/auth/jwt/verify/`, body, config);

            if (result.data.code !== 'token_not_valid') {
                dispatch({type: AUTHENTICATED_SUCCESS});
            } else {
                dispatch({type: AUTHENTICATED_FAIL});
            };

        } catch (error) {
            dispatch({type: AUTHENTICATED_FAIL});
        };
    } else {
        dispatch({type: AUTHENTICATED_FAIL});
    };
};

export const loadUser = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const result = await axios.get(`${API_BASE}/auth/users/me/`, config);
            
            dispatch({type: USER_LOADED_SUCCESS, payload: result.data});

            return result.data;

        } catch (error) {
            dispatch({type: USER_LOADED_FAIL});
        };

    } else {
        dispatch({type: USER_LOADED_FAIL});
    };
};

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const result = await axios.post(`${API_BASE}/auth/jwt/create/`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: result.data
        });

        dispatch(loadUser());

        return result;
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL
        });
    };
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};

export const signUp = (email, first_name, last_name, password, re_password) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const body = JSON.stringify({email, first_name, last_name, password, re_password});

    try {
        const result = await axios.post(`${API_BASE}/auth/users/`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: result.data
        });

        return result;

    } catch (error) {
        dispatch({
            type: SIGNUP_FAIL
        });
        return error;
    };

};

// TODO rewrite the API_BASE