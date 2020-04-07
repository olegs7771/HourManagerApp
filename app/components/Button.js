import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Button = (props) => {
  return (
    <TouchableOpacity
      style={[styles.container, {...props.styleCont}]}
      {...props}>
      <Text
        style={[
          {fontSize: 18, fontWeight: 'bold', color: '#FFF'},
          {...props.styleText},
        ]}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#3254a8',
  },
});
