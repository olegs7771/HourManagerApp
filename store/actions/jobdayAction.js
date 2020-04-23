import {
  GET_JOBDAYS,
  LOADING_JOBDAYS,
  GET_CURRENT_START,
  GET_CURRENT_END,
  GET_CURRENT_TIME,
  // SET_ENDTIME_MANUALLY,
  GET_SELECTED_DAY,
  GET_MESSAGES,
  MESSAGE_LOADING,
  MESSAGE_LOADING_START,
  MESSAGE_LOADING_END,
  CLEAR_MESSAGE,
} from './type';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

//Get All jobdays for logged Employee
export const getJobdays = () => dispatch => {
  dispatch(loadingJobdays());

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
          .post('http://192.168.1.11:5000/api/rnapp/fetch_jobdays', payload)
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
              type: GET_JOBDAYS,
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

//Get Selected Day to Redux

export const getSelectedDay = data => dispatch => {
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
        dispatch({
          type: GET_SELECTED_DAY,
          payload: data.day,
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
  dispatch(loadingJobdays());

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
          .post('http://192.168.1.11:5000/api/rnapp/checkIn_automatic', payload)
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
  dispatch(loadingJobdays());

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
            'http://192.168.1.11:5000/api/rnapp/checkOut_automatic',
            payload,
          )
          .then(res => {
            console.log('res.data', res.data);
            dispatch({
              type: GET_CURRENT_END,
              payload: res.data,
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

//Get Today cheakIn checkOut Time for JobdayScreen if day created

export const getTime = () => dispatch => {
  dispatch(loadingJobdays());

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
          date: moment().format('YYYY-MM-DD'),
        };

        axios
          .post('http://192.168.1.11:5000/api/rnapp/get_today_time', payload)
          .then(res => {
            console.log('res.data', res.data);
            dispatch({
              type: GET_CURRENT_TIME,
              payload: res.data,
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

//Set timeStart Mannualy by Employee
export const setStartTimeMan = data => dispatch => {
  console.log('data in set start time manually', data);

  dispatch(loadingMessagesStart());

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
          date: data.selectedDay,
          timeStart: data.timeStart, //manually set by Employee
          message: data.message,
        };

        axios
          .post(
            'http://192.168.1.11:5000/api/rnapp/startTime_manually',
            payload,
          )
          .then(res => {
            console.log('res.data', res.data);
            dispatch({
              type: GET_MESSAGES,
              payload: res.data,
            });
            //Clear Message after 5sec
            setTimeout(() => {
              dispatch({
                type: CLEAR_MESSAGE,
              });
            }, 5000);
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

//Set timeEnd manually by Employee
export const setEndTimeMan = data => dispatch => {
  console.log('data in set end time manually', data);

  dispatch(loadingMessagesEnd());

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
          date: data.selectedDay,
          timeEnd: data.timeEnd, //manually set by Employee
          message: data.message,
        };

        axios
          .post('http://192.168.1.11:5000/api/rnapp/endTime_manually', payload)
          .then(res => {
            console.log('res.data', res.data);
            dispatch({
              type: GET_MESSAGES,
              payload: res.data,
            });
            setTimeout(() => {
              dispatch({
                type: CLEAR_MESSAGE,
              });
            }, 5000);
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

//Confirm Employee
//Employee pressed V icon to confirm that jobday hours pair ready
export const confirmEmployee = data => dispatch => {
  console.log('data in cinfirm', data);

  dispatch(loadingMessages());

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
          date: data.date,
        };

        axios
          .post('http://192.168.1.11:5000/api/rnapp/confirmEmployee', payload)
          .then(res => {
            console.log('res.data', res.data);
            dispatch({
              type: GET_MESSAGES,
              payload: res.data.message,
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

export const loadingJobdays = () => {
  return {
    type: LOADING_JOBDAYS,
  };
};
export const loadingMessages = () => {
  return {
    type: MESSAGE_LOADING,
  };
};
export const loadingMessagesStart = () => {
  return {
    type: MESSAGE_LOADING_START,
  };
};
export const loadingMessagesEnd = () => {
  return {
    type: MESSAGE_LOADING_END,
  };
};
