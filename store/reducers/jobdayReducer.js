import {GET_MONTH, LOADING_MONTH, GET_CURRENT_START} from '../actions/type';

const initialState = {
  month: null,
  loading: false,
  jobTime: null,
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
    case GET_CURRENT_START:
      return {
        ...state,
        jobTime: {
          timeStart: action.payload,
        },
        loading: false,
      };
    default:
      return state;
  }
};
