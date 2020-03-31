import {GET_AUTH, LOADING_AUTH} from './type';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import jwtDecode from 'jwt-decode';

export const loginEmployee = data => dispatch => {
  console.log('data', data);
  dispatch(loading());
  Axios.post(
    'https://glacial-crag-30370.herokuapp.com/api/employee/employee_login',
    data,
  )
    .then(res => {
      console.log('res.data', res.data);
      AsyncStorage.setItem('token', res.data.token);
      const decoded = jwt_decode(res.data.token);
      console.log('decoded', decoded);
    })
    .catch(err => {
      console.log('err :', err.response.data);
    });
};

export const loading = () => {
  return {
    type: LOADING_AUTH,
  };
};
