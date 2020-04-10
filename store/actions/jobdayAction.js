import {
  GET_MONTH,
  LOADING_MONTH,
  CREATE_JOBDAY_CHECKIN_AUTOMATIC,
  CREATE_JOBDAY_CHECKOUT_AUTOMATIC,
  GET_CURRENT_START,
} from './type';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

//Get All jobdays for logged Employee
export const getSelectedMonth = () => dispatch => {
  dispatch(loadingMonth());

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        // We have data!!

        const parsedData = JSON.parse(value);
        // console.log('parsedData', parsedData);
        //Send Request to API
        //Create payload for HTTP request
        const payload = {
          token: parsedData.token,
          id: parsedData.uid,
        };
        // console.log('payload', payload);

        axios
          .post('http://192.168.1.24:5000/api/rnapp/fetch_jobdays', payload)
          .then(res => {
            // console.log('res.data', res.data);
            //Adapt res.data for Agenda items={{'2020-04-06':[{key:value,key:value}]}}
            const mapped = res.data.map(item => ({
              [moment(item.date).format('YYYY-MM-DD')]: [{item}],
            }));
            const dateObj = Object.assign({}, ...mapped);
            // console.log('dateObj', dateObj);
            //Send to Reducer
            dispatch({
              type: GET_MONTH,
              payload: dateObj,
            });
          })
          .catch(err => {
            console.log('http request error:', err.response.data);
          });
      }
    } catch (error) {
      console.log('error:', error);
    }
  };
  _retrieveData();
};

//Create Jobday CheckIN Automatic. Employee clicks checkIn
export const createCheckInAuto = data => dispatch => {
  console.log('data in action', data);
  dispatch(loadingMonth());

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        const parsedData = JSON.parse(value);
        console.log('parsedData', parsedData);
        //Send Request to API
        //Create payload for HTTP request
        const payload = {
          token: parsedData.token,
          id: parsedData.uid,
          timeStart: data.timeStart,
        };

        axios
          .post('http://192.168.1.24:5000/api/rnapp/checkIn_automatic', payload)
          .then(res => {
            console.log('res.data', res.data);
            //Get timeStart to Redux
            dispatch({
              type: GET_CURRENT_START,
              payload: res.data.timeStart,
            });
          })
          .catch(err => {
            console.log('http request error:', err.response.data);
          });
      }
    } catch (error) {
      console.log('error:', error);
    }
  };
  _retrieveData();
};

export const createCheckOutAuto = data => dispatch => {
  console.log('data in action', data);
  dispatch(loadingMonth());

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        const parsedData = JSON.parse(value);
        console.log('parsedData', parsedData);
        //Send Request to API
        //Create payload for HTTP request
        const payload = {
          token: parsedData.token,
          id: parsedData.uid,
          timeEnd: data.timeStart,
        };

        axios
          .post(
            'http://192.168.1.24:5000/api/rnapp/checkOut_automatic',
            payload,
          )
          .then(res => {
            console.log('res.data', res.data);
          })
          .catch(err => {
            console.log('http request error:', err.response.data);
          });
      }
    } catch (error) {
      console.log('error:', error);
    }
  };
  _retrieveData();
};

export const loadingMonth = () => {
  return {
    type: LOADING_MONTH,
  };
};
