import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '../components/Button';

export class LandingScreen extends Component {
  _moveToSignIn = () => {
    this.props.navigation.navigate('SignIn');
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerImage}>
          <Image
            source={require('../../assets/hourmanager.png')}
            style={{width: '90%', height: 100, alignSelf: 'center'}}
          />
        </View>
        <View style={{padding: 10, marginTop: 30}}>
          <Text style={{fontSize: 18}}>
            Dear Friend we are glad to see you! If you have Email and Code , You
            free to use it.
          </Text>
        </View>
        <View
          style={{
            padding: 10,
          }}>
          <Text style={styles.textTitle}>
            We are looking forward to working together!
          </Text>
        </View>
        <View style={styles.containerButton}>
          <Button
            text="Login"
            onPress={this._moveToSignIn}
            style={styles.containerIcon}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#d2d5d9',
  },
  containerImage: {
    // borderWidth: 1,
  },
  textTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
  containerButton: {
    marginTop: 30,
    alignItems: 'center',
  },
  containerIcon: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#868f9c',
  },
});
