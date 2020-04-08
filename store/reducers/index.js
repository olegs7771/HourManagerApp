import {combineReducers} from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import jobdayReducer from './jobdayReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  jobday: jobdayReducer,
});
