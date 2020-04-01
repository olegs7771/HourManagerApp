import {GET_AUTH, LOADING_AUTH} from '../actions/type';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_AUTH:
      return {
        ...state,
        loading: true,
      };

    case GET_AUTH:
      return {
        ...state,
        user: {
          email: action.payload.email,
          name: action.payload.name,
        },
        isAuthenticated: true,
        loading: false,
      };
    // case LOGOUT_USER:
    //   return {
    //     ...state,
    //     user: null,
    //     isAuthenticated: false,
    //   };

    default:
      return state;
  }
};
