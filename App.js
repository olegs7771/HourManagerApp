import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Text, View} from 'react-native';
//Redux

import AsyncStorage from '@react-native-community/async-storage';
//Store
import {Provider} from 'react-redux';
import configureStore from './store/store';

import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//Redux
import {GET_AUTH} from './store/actions/type';
//Auth
import LoginScreen from './app/auth/LoginScreen';
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
    await AsyncStorage.getItem('user')
      .then(res => {
        console.log('token', token);

        const parseObj = JSON.parse(res);
        const {name, email, token} = parseObj;

        //Obj for Reducer
        const userObj = {
          name,
          email,
        };

        this.setState({
          token,
        });
        store.dispatch({
          type: GET_AUTH,
          payload: userObj,
        });
        this.props.navigation.navigate('Home');
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
            {this.state.token ? (
              <Stack.Screen name="Home" component={LandingScreen} />
            ) : (
              <Stack.Screen name="SignIn" component={LoginScreen} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
