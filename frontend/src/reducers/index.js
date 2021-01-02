import { combineReducers } from 'redux';
import authReducer from './auth';
import basketReducer from './basket';

export default combineReducers({
    authReducer,
    basketReducer
});