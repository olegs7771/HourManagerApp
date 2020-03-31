import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//Store
import {Provider} from 'react-redux';
import configureStore from './store/store';

import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//Auth
import Login from './app/auth/Login';
//Dashboard
import LandingScreen from './app/dashboard/LandingScreen';

const store = configureStore();
//Navigation
const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this._retieveData();
    this.state = {
      token: null,
    };
  }

  _retieveData = async () => {
    await AsyncStorage.getItem('token')
      .then(token => {
        console.log('token', token);
        this.setState({
          token,
        });
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            {!this.state.token ? (
              <Stack.Screen name="Home" component={LandingScreen} />
            ) : (
              <Stack.Screen name="SignIn" component={Login} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
