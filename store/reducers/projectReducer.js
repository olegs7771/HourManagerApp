import {GET_PROJECT} from '../actions/type';
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

    default:
      return state;
  }
};
