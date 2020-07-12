import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, Button} from 'react-native';
import {conect, connect} from 'react-redux';
import {loginEmployee} from '../../store/actions/authAction';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

class LoginScreen extends Component {
  state = {
    email: '',
    appCode: '',
    projectCode: '',
    errors: {},
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({errors: this.props.errors});
    }
  }

  _loginEmployee = () => {
    //Validation
    if (this.state.email.length === 0)
      return this.setState({errors: {email: 'Provide Email'}});

    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!regex.test(this.state.email))
      return this.setState({errors: {email: 'Email invalid format'}});

    if (this.state.appCode.length === 0)
      return this.setState({errors: {appCode: 'Provide  App Code'}});
    if (this.state.projectCode.length === 0)
      return this.setState({errors: {projectCode: 'Provide Project Code'}});

    const data = {
      email: this.state.email,
      appCode: this.state.appCode,
      projectCode: this.state.projectCode,
    };

    console.log('data', data);
    this.props.loginEmployee(data);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Text style={styles.textTitle}> Welcome! </Text>
          <Text style={{fontSize: 16, color: '#3c6cb5', marginLeft: 10}}>
            SignIn using your credentials
          </Text>
        </View>
        <View style={styles.containerForm}>
          {/* Email */}
          <View style={styles.containerInputField}>
            <View style={styles.containerIcon}>
              <Icon name="user" size={30} color="#3c6cb5" />
            </View>
            <TextInput
              style={styles.textInput}
              onChangeText={email =>
                this.setState({email: email.toLowerCase(), errors: {}})
              }
              name="email"
              value={this.state.email}
              keyboardType="email-address"
              placeholder="Email Address"
            />
          </View>
          {this.state.errors.email ? (
            <View style={{marginTop: -5, marginLeft: 20}}>
              <Text style={{color: 'red'}}>{this.state.errors.email}</Text>
            </View>
          ) : null}

          {/* App Code */}
          <View style={styles.containerInputField}>
            <View style={styles.containerIcon}>
              <Icon name="key" size={30} color="#3c6cb5" />
            </View>
            <TextInput
              style={styles.textInput}
              onChangeText={appCode => this.setState({appCode, errors: {}})}
              name="appCode"
              value={this.state.appCode}
              keyboardType="numeric"
              placeholder="App Code"
            />
          </View>
          {this.state.errors.appCode ? (
            <View style={{marginTop: -5, marginLeft: 20}}>
              <Text style={{color: 'red'}}>{this.state.errors.appCode}</Text>
            </View>
          ) : null}
          {/* Project Code */}
          <View style={styles.containerInputField}>
            <View style={styles.containerIcon}>
              <Icon name="key" size={30} color="#3c6cb5" />
            </View>
            <TextInput
              style={styles.textInput}
              onChangeText={projectCode =>
                this.setState({projectCode, errors: {}})
              }
              name="projectCode"
              value={this.state.projectCode}
              keyboardType="numeric"
              placeholder="Project Code"
            />
          </View>

          {this.state.errors.projectCode ? (
            <View style={{marginTop: -5, marginLeft: 20}}>
              <Text style={{color: 'red'}}>
                {this.state.errors.projectCode}
              </Text>
            </View>
          ) : null}

          <View style={styles.containerButton}>
            <Button
              title="Submit"
              size={20}
              color="#3c6cb5"
              onPress={this._loginEmployee}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors.errors,
  // isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  {loginEmployee},
)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: '#edf1f7',
    justifyContent: 'center',
  },
  containerTitle: {
    paddingLeft: 30,
  },
  textTitle: {
    fontSize: 30,
    color: '#3c6cb5',
  },
  containerForm: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  //Email Field
  containerInputField: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 10,
    // borderWidth: 1,
  },
  containerIcon: {
    width: '15%',
    alignSelf: 'center',
    paddingLeft: 15,
    backgroundColor: '#FFF',
  },

  textInput: {
    width: '80%',
    paddingLeft: 10,
    backgroundColor: '#FFF',
  },

  containerButton: {
    alignSelf: 'center',
    borderRadius: 10,
    width: 100,
    marginTop: 20,
  },
});
