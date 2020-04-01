import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';

class LandingScreen extends Component {
  _signOutEmp = async () => {
    console.log('loggedout');
    await AsyncStorage.removeItem('user').then(() => {
      console.log('removed');
      this.props.navigation.navigate('Home');
    });
  };

  render() {
    return (
      <View>
        <Text> Landing here </Text>
        <Button title="SignOut" onPress={this._signOutEmp} />
      </View>
    );
  }
}

export default connect()(LandingScreen);
