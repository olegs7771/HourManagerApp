import React from 'react';
import {View, Text} from 'react-native';

const UpCase = value => {
  if (typeof value !== 'string') {
    throw new Error('Not string provided');
  } else {
    return value
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
};

export default UpCase;
