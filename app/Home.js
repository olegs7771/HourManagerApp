import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setAuth} from '../store/actions/authAction';
import AsyncStorage from '@react-native-community/async-storage';
import configureStore from '../store/store';
// import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';

//Screens Unprotected
import LoaderScreen from '../app/auth/LoaderScreen';
import LoginScreen from '../app/auth/LoginScreen';
import LandingScreen from './dashboard/LandingScreen';
//Screens Protected
import DashboardScreen from './dashboard/DashboardScreen';
import SettingsScreen from '../app/dashboard/SettingsScreen';

//Nav
import DrawerContent from './navContent/DrawerContent';

const store = configureStore();
//Navigation
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const tabNav = () => {
  return (
    <Tab.Navigator activeColor="#FFF" barStyle={{backgroundColor: '#694fad'}}>
      <Tab.Screen
        name="DashBoard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialIcon name="dashboard" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color}) => (
            <MaterialIcon name="settings" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const DrawerNav = () => {
  return (
    <Drawer.Navigator drawerContent={() => <DrawerContent />}>
      <Drawer.Screen name="DashBoard" component={tabNav} />
    </Drawer.Navigator>
  );
};

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export class Home extends Component {
  constructor(props) {
    super(props);
    this._retieveData();
    this.state = {
      token: null,
      user: null,
      loading: false,
      isAuthenticated: false,
      errors: {},
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
    if (prevProps.errors !== this.props.errors) {
      this.setState({errors: this.props.errors, loading: false});
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
            <Stack.Screen
              name="Landing"
              component={DrawerNav}
              options={{
                headerShown: false,
              }}
            />
          ) : (
            <Stack.Screen
              name="SignIn"
              component={AppStack}
              options={{
                headerShown: false,
              }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.errors.errors,
});

const mapDispatchToProps = {setAuth};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
