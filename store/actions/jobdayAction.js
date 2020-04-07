import {GET_MONTH} from './type';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

//Get Selected Month
export const getSelectedMonth = data => dispatch => {
  console.log('data in action', data);

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        // We have data!!

        const parsedData = JSON.parse(value);
        console.log('parsedData', parsedData);
        //Send Request to API
        //Create payload for HTTP request
        const payload = {
          token: parsedData.token,
          date: data,
        };
        console.log('payload', payload);

        axios
          .post('http://192.168.43.14:5000/api/rnapp/test', payload)
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
