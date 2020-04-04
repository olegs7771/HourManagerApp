import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

class LoaderScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>Please Wait..</Text>
        <ActivityIndicator size={50} color="#636363" />
      </View>
    );
  }
}

export default LoaderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
  },
});
