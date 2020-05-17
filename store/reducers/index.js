import {combineReducers} from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import messageReducer from './messageReducer';
import jobdayReducer from './jobdayReducer';
import projectReducer from './projectReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  jobday: jobdayReducer,
  message: messageReducer,
  project: projectReducer,
});
