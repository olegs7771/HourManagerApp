import {GET_MESSAGES, MESSAGE_LOADING} from '../actions/type';

const initialState = {
  message: {},
  loading: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_MESSAGES:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
