import {GET_MONTH, LOADING_MONTH} from '../actions/type';

const initialState = {
  month: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_MONTH:
      return {
        ...state,
        loading: true,
      };
    case GET_MONTH:
      return {
        ...state,
        month: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
