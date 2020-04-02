import React, {Component} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {logoutEmp} from '../../store/actions/authAction';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

class LandingScreen extends Component {
  _signOutEmp = async () => {
    console.log('loggedout');
    await AsyncStorage.removeItem('user').then(() => {
      console.log('removed');
      this.props.logoutEmp();
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerButton}>
          <View>
            <Icon name="glass" size={30} />
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
  },
  containerButton: {
    alignContent: 'center',
    borderWidth: 1,
    paddingHorizontal: 60,
  },
});
