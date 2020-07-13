import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '../components/Button';

export class LandingScreen extends Component {
  state = {
    errors: {},
  };

  _moveToSignIn = () => {
    this.props.navigation.navigate('SignIn');
  };

  componentDidMount() {
    this.setState({errors: this.props.errors});
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/citymap.png')}
          style={{
            width: '100%',
            height: 600,
            position: 'absolute',
          }}
        />
        <View style={styles.containerImage}>
          <Image
            source={require('../../assets/logoApp.png')}
            style={{width: '70%', height: 120, alignSelf: 'center'}}
          />
        </View>
        <View
          style={{
            paddingLeft: 40,
            paddingRight: 10,
            marginTop: 100,
            backgroundColor: '#FFF',
            // borderBottomWidth: 1,
            // borderTopWidth: 1,
            paddingVertical: 10,
            width: '90%',
            alignSelf: 'center',
            borderRadius: 10,
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            Dear Friend we are glad to see you!
          </Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            If you have Email, APP Code and Project Code , You free to use it.
          </Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            We are looking forward for working together!
          </Text>
        </View>

        {this.state.errors.error ? (
          <View
            style={{
              marginTop: 10,
              borderWidth: 1,
              borderRadius: 5,
              width: '70%',
              alignSelf: 'center',
              paddingVertical: 10,
              backgroundColor: '#cc9fae',
              borderColor: '#940635',
            }}>
            <Text
              style={{
                color: '#FFF',
                textAlign: 'center',
                marginBottom: 10,
                fontSize: 20,
              }}>
              {this.state.errors.error}
            </Text>
          </View>
        ) : null}

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

const mapStateToProps = state => ({
  errors: state.errors.errors,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LandingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#edf1f7',
  },
  containerImage: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderRadius: 10,

    width: '90%',
    alignSelf: 'center',
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#6b7068',
    width: 100,
    alignItems: 'center',
  },
});
