import {
  GET_JOBDAYS,
  LOADING_JOBDAYS,
  GET_CURRENT_START,
  GET_CURRENT_TIME,
  GET_CURRENT_END,
} from '../actions/type';

const initialState = {
  jobdays: null,
  loading: false,
  jobTime: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_JOBDAYS:
      return {
        ...state,
        loading: true,
      };
    case GET_JOBDAYS:
      return {
        ...state,
        jobdays: action.payload,
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
    case GET_CURRENT_END:
      return {
        ...state,
        jobTime: {
          timeStart: action.payload.timeStart,
          timeEnd: action.payload.timeEnd,
        },
        loading: false,
      };
    case GET_CURRENT_TIME:
      return {
        ...state,
        jobTime: {
          timeStart: action.payload.timeStart,
          timeEnd: action.payload.timeEnd,
        },
        loading: false,
      };
    default:
      return state;
  }
};
