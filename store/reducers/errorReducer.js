import {GET_ERRORS} from '../actions/type';

const initialState = {
  errors: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };

    default:
      return state;
  }
};
