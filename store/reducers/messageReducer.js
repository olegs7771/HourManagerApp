import {
  GET_MESSAGES,
  MESSAGE_LOADING_START,
  MESSAGE_LOADING_END,
  CLEAR_MESSAGE,
} from '../actions/type';

const initialState = {
  message: {},
  //editItemModal has 2 children for Start and End hour editing
  // we want then loading separatly
  loadingStart: false,
  loadingEnd: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_LOADING_START:
      return {
        ...state,
        loadingStart: true,
      };
    case MESSAGE_LOADING_END:
      return {
        ...state,
        loadingEnd: true,
      };
    case GET_MESSAGES:
      return {
        ...state,
        message: action.payload,
        loadingStart: false,
        loadingEnd: false,
      };
    //Clear Messages to Reload editItemModal.js
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: {},
      };

    default:
      return state;
  }
};
