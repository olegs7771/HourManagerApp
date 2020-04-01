import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setAuth} from '../store/actions/authAction';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//Screens
import LoaderScreen from '../app/auth/LoaderScreen';
import LoginScreen from '../app/auth/LoginScreen';
import LandingScreen from '../app/dashboard/LandingScreen';
import configureStore from '../store/store';

const store = configureStore();
const Stack = createStackNavigator();
export class Home extends Component {
  constructor(props) {
    super(props);
    this._retieveData();
    this.state = {
      token: null,
      user: null,
      loading: false,
      isAuthenticated: false,
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
        console.log('userObj', userObj);

        this.props.setAuth(userObj);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  //Change state
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        isAuthenticated: this.props.isAuthenticated,
        loading: this.props.loading,
      });
    }
  }

  render() {
    if (this.state.loading) {
      return <LoaderScreen />;
    }
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {this.state.isAuthenticated ? (
            <Stack.Screen name="Home" component={LandingScreen} />
          ) : (
            <Stack.Screen name="SignIn" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {setAuth};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
