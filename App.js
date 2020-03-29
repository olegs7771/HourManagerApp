import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
//Auth
import Login from './app/auth/Login';

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <View>
          <Text> textInComponent </Text>
        </View>
      </NavigationContainer>
    );
  }
}

export default App;
