import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {logoutEmp} from '../../store/actions/authAction';
import UpCase from '../utils/UpCase';

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
          <View style={{marginVertical: 20}}>
            <Text style={styles.textTitle}>Profile</Text>
          </View>
          <View style={styles.containerProfileBody}>
            <View style={styles.containerName}>
              <View style={styles.containerIcon}>
                <Icon name="user" size={25} color="#3c6cb5" />
              </View>
              <View style={styles.containerTextField}>
                <Text style={{fontSize: 16, fontStyle: 'italic'}}>
                  {UpCase(this.state.name)}
                </Text>
              </View>
            </View>
            <View style={styles.containerName}>
              <View style={styles.containerIcon}>
                <Icon name="envelope" size={20} color="#3c6cb5" />
              </View>
              <View style={styles.containerTextField}>
                <Text style={{fontSize: 16, fontStyle: 'italic'}}>
                  {this.state.email}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.containerSignout}
          onPress={this._signOutEmp}>
          <View style={{paddingVertical: 10}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#FFF'}}>
              SignOut
            </Text>
          </View>
          <View style={styles.containerSignoutIcon}>
            <Icon size={30} name="sign-out" color="#FFF" />
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
    // justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#dff4f7',
  },
  containerProfile: {
    width: '100%',
    padding: 5,
    paddingBottom: 20,
  },
  containerName: {
    flexDirection: 'row',

    paddingVertical: 10,
    paddingLeft: 10,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#FFF',
  },
  containerIcon: {
    width: '7%',
    backgroundColor: '#FFF',
  },
  containerTextField: {
    paddingLeft: 5,
  },

  textTitle: {
    textAlign: 'center',
    fontSize: 30,
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
    backgroundColor: '#3c6cb5',
    borderRadius: 5,
  },
  containerSignoutIcon: {
    padding: 5,
    borderRadius: 50,
  },
});
