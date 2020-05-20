import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import RequestGeoLocPermission from './GeoPermission';
import Geo from '@react-native-community/geolocation';

const Geolocation = props => {
  RequestGeoLocPermission();

  useEffect(() => {
    console.log('Geo', Geo);
  });
  return null;
};

export default Geolocation;
