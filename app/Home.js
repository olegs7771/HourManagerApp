import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setAuth} from '../store/actions/authAction';
import AsyncStorage from '@react-native-community/async-storage';
import configureStore from '../store/store';
// import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

//Screens Unprotected
import LoaderScreen from '../app/auth/LoaderScreen';
import LoginScreen from '../app/auth/LoginScreen';
import LandingScreen from './dashboard/LandingScreen';
//Screens Protected
import DashboardScreen from './dashboard/DashboardScreen';
import SettingsScreen from '../app/dashboard/SettingsScreen';
import JobdayScreen from '../app/dashboard/JobdayScreen';
import AgendaLog from './calendar/AgendaLog';

//Nav
import DrawerContent from './navContent/DrawerContent';

const store = configureStore();
//Navigation
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TabNav = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        tabStyle: {
          backgroundColor: '#694fad',
        },
        activeTintColor: '#FFF',
      }}>
      <Tab.Screen
        name="DashBoard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => <Icon name="home" size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="Jobday"
        component={JobdayScreen}
        options={{
          tabBarLabel: 'Jobday',
          tabBarIcon: ({color}) => (
            <Icon name="briefcase" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Log"
        component={AgendaLog}
        options={{
          tabBarLabel: 'Log',
          tabBarIcon: ({color}) => (
            <Icon name="calendar" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const DrawerNav = () => {
  return (
    <Drawer.Navigator drawerContent={() => <DrawerContent />}>
      <Drawer.Screen name="DashBoard" component={TabNav} />
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
        // console.log('res', res);

        const parseObj = JSON.parse(res);
        const {name, email, uid, token} = parseObj;

        //Obj for Reducer
        const userObj = {
          name,
          email,
          uid,
        };

        this.setState({
          token,
        });

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
              name="App"
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
