import {GET_AUTH, LOADING_AUTH, LOGOUT_AUTH, GET_ERRORS} from './type';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export const loginEmployee = data => dispatch => {
  console.log('data', data);
  dispatch(loading());
  Axios.post('http://192.168.43.14:5000/api/employee/employee_login', data)
    .then(res => {
      console.log('res.data', res.data);
      //Create payload for AsyncStorage
      const payload = {
        name: res.data.name,
        email: res.data.email,
        token: res.data.token,
        uid: res.data.uid,
        projectID: res.data.projectID,
      };

      AsyncStorage.setItem('user', JSON.stringify(payload)).then(() => {
        //Token set in LocalStorage
        //Get Email and Name into Redux
        dispatch({
          type: GET_AUTH,
          payload: res.data,
        });
      });
    })
    .catch(err => {
      console.log('err :', err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//Logout Employee

export const logoutEmp = () => dispatch => {
  dispatch({
    type: LOGOUT_AUTH,
  });
};

//Set Auth every refresh without API request

export const setAuth = data => dispatch => {
  dispatch(loading());
  dispatch({
    type: GET_AUTH,
    payload: data,
  });
};

export const loading = () => {
  return {
    type: LOADING_AUTH,
  };
};
