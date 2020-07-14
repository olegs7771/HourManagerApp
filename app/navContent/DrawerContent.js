import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {logoutEmp} from '../../store/actions/authAction';

class DrawerContent extends Component {
  state = {
    name: '',
    email: '',
  };

  componentDidMount() {
    if (this.props.auth) {
      this.setState({
        name: this.props.auth.user.name,
        email: this.props.auth.user.email,
      });
    }
  }

  _signOutEmp = async () => {
    await AsyncStorage.removeItem('user').then(() => {
      console.log('removed');
      this.props.logoutEmp();
    });
  };

  render() {
    if (!this.props.auth) {
      return (
        <View>
          <Text>Loading..</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.containerProfile}>
          <Text style={styles.textTitle}>Profile</Text>
          <View style={styles.containerProfileBody}>
            <View
              style={{
                marginBottom: 10,
              }}>
              <View style={styles.containerName}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  {this.state.name}
                </Text>
              </View>
            </View>
            <View>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {this.state.email}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.containerSignout}
          onPress={this._signOutEmp}>
          <View style={{paddingTop: 10}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#FFF'}}>
              SignOut
            </Text>
          </View>
          <View style={styles.containerSignoutIcon}>
            <Icon size={20} name="sign-out" color="#FFF" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  {logoutEmp},
)(DrawerContent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerProfile: {
    width: '100%',
    padding: 5,
    paddingBottom: 20,
  },
  containerName: {},

  textTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  containerProfileBody: {
    paddingTop: 10,
  },
  containerSignout: {
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    paddingLeft: 40,
    backgroundColor: '#787deb',
    borderRadius: 5,
  },
  containerSignoutIcon: {
    padding: 10,
    borderRadius: 50,
  },
});
