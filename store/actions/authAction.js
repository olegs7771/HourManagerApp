import {GET_AUTH, LOADING_AUTH, LOGOUT_AUTH} from './type';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export const loginEmployee = data => dispatch => {
  console.log('data', data);
  dispatch(loading());
  Axios.post(
    'https://glacial-crag-30370.herokuapp.com/api/employee/employee_login',
    data,
  )
    .then(res => {
      console.log('res.data', res.data);
      //Create payload for AsyncStorage
      const payload = {
        name: res.data.name,
        email: res.data.email,
        token: res.data.token,
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
