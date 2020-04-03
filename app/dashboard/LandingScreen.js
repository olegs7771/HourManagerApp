import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '../components/Button';

export class LandingScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}> Welcome Screen</Text>
        <View style={styles.containerButton}>
          <Button
            text="Login"
            onPress={this.props.navigation.navigate('SignIn')}
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
    justifyContent: 'center',
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
    backgroundColor: '#3254a8',
  },
});
