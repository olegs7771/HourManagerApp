import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {logoutEmp} from '../../store/actions/authAction';

const DrawerContent = (props) => {
  _signOutEmp = async () => {
    await AsyncStorage.removeItem('user').then(() => {
      console.log('removed');
      props.logoutEmp();
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerProfile}>
        <Text style={styles.textTitle}>Profile</Text>
        <View style={styles.containerProfileBody}>
          <View
            style={{
              marginBottom: 10,
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Name </Text>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              {props.auth.user.name}{' '}
            </Text>
          </View>
          <View>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Email </Text>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              {props.auth.user.email}{' '}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.containerSignout} onPress={_signOutEmp}>
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
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {logoutEmp})(DrawerContent);

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
  },
  containerProfile: {
    width: '100%',
    padding: 5,
    paddingBottom: 20,
  },
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
