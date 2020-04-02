import React, {Component} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {logoutEmp} from '../../store/actions/authAction';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

class LandingScreen extends Component {
  state = {
    drawerOpen: false,
  };

  _signOutEmp = async () => {
    console.log('loggedout');
    await AsyncStorage.removeItem('user').then(() => {
      console.log('removed');
      this.props.logoutEmp();
    });
  };

  _toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
    this.setState({drawerOpen: !this.state.drawerOpen});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerButton}>
          <View
            style={
              this.state.drawerOpen
                ? styles.containerIconDrawerOpen
                : styles.containerIconDrawerClosed
            }>
            <Icon name="bars" size={50} onPress={this._toggleDrawer} />
          </View>

          <Button title="SignOut" onPress={this._signOutEmp} />
        </View>
      </View>
    );
  }
}

export default connect(null, {logoutEmp})(LandingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
  },
  //Move Menu icon If Drawer open
  containerIconDrawerClosed: {
    borderWidth: 1,
    paddingLeft: 20,
    paddingTop: 10,
  },
  containerIconDrawerOpen: {
    borderWidth: 1,
    paddingLeft: 300,
    paddingTop: 10,
  },
  containerButton: {
    alignContent: 'center',
  },
});
