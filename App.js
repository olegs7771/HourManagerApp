import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Text, View} from 'react-native';
//Store
import {Provider} from 'react-redux';
import configureStore from './store/store';

import {NavigationContainer} from '@react-navigation/native';
//Auth
import Login from './app/auth/Login';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Login />
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
