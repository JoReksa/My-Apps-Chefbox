import {combineReducers} from 'redux';
import auth from './auth';
import fetch from './fetch';

export default combineReducers({
  auth,
  fetch,
});
