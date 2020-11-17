import { combineReducers } from 'redux'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import roomReducer from './roomReducer';
import contactReducer from './contactReducer';

export default combineReducers({
   errors: errorReducer,
   auth: authReducer,
   room: roomReducer,
   contact: contactReducer
});