import {GET_PROJECT, GET_LOCATION_MATCH} from '../actions/type';
const initialState = {
  project: null,
  isLocationMatched: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECT:
      return {
        ...state,
        project: action.payload,
      };
    case GET_LOCATION_MATCH:
      return {
        ...state,
        isLocationMatched: action.payload,
      };

    default:
      return state;
  }
};
