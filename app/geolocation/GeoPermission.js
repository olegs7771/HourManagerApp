import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  PermissionsAndroid,
  Button,
} from 'react-native';

const RequestGeoLocPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message:
          'HourManager App needs access to your geololocation ' +
          'so you can checkin and checkout.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Your device can use the geolocation');
    } else {
      console.log('Geolocation denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

export default RequestGeoLocPermission;
