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
} from '../actions/auth-types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresg'),
    isAuthenticated: null,
    id: '',
    firstName: '',
    lastName: '',
    patronym: '',
    email: '',
    photo: '',
    buyCount: '',
    buySum: 0,
    phone: '',
    certificate: '',
    isCertified: '',
};

const authReducer = (state = initialState, action) => {

    switch(action.type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            };
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('access', action.payload.access);
            return {
                ...state,
                isAuthenticated: true,
                access: action.payload.access,
                refresh: action.payload.refresh
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            };
        case USER_LOADED_SUCCESS:
            return {
                ...state,

                firstName: action.payload.first_name,
                lastName: action.payload.last_name,
                patronym: action.payload.patronym,
                email: action.payload.email,
                id: action.payload.id,
                photo: action.payload.photo,
                phone: action.payload.phone,
                buyCount: action.payload.buy_count,
                buySum: parseFloat(action.payload.buy_sum),
                certificate: action.payload.certificate,
                isCertified: action.payload.is_certified,
            };
        case USER_LOADED_FAIL:
            return {...state};
        case SIGNUP_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                id: '',
                firstName: '',
                lastName: '',
                patronym: '',
                email: '',
                photo: '',
                phone: '',
                buyCount: '',
                buySum: '',
                certificate: '',
                isCertified: '',
            };
        default:
            return state;
    };
};

export default authReducer;