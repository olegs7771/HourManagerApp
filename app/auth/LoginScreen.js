import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, Button} from 'react-native';
import {conect, connect} from 'react-redux';
import {loginEmployee} from '../../store/actions/authAction';

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
        <Text style={styles.textTitle}> Login Here </Text>
        {/* Email */}
        <View style={styles.containerForm}>
          <Text style={styles.textLabel}>Email</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={email =>
              this.setState({email: email.toLowerCase(), errors: {}})
            }
            name="email"
            value={this.state.email}
            keyboardType="email-address"
            placeholder="john@example.com"
          />
          {this.state.errors.email ? (
            <View style={{marginTop: -10}}>
              <Text style={{color: 'red'}}>{this.state.errors.email}</Text>
            </View>
          ) : null}
          {/* Project Code */}
          <Text style={styles.textLabel}> Project Code</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={projectCode =>
              this.setState({projectCode, errors: {}})
            }
            name="projectCode"
            value={this.state.projectCode}
            keyboardType="numeric"
            placeholder="123456"
          />
          {this.state.errors.projectCode ? (
            <View style={{marginTop: -10}}>
              <Text style={{color: 'red'}}>
                {this.state.errors.projectCode}
              </Text>
            </View>
          ) : null}
          {/* App Code */}
          <Text style={styles.textLabel}> App Code</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={appCode => this.setState({appCode, errors: {}})}
            name="appCode"
            value={this.state.appCode}
            keyboardType="numeric"
            placeholder="123456"
          />
          {this.state.errors.appCode ? (
            <View style={{marginTop: -10}}>
              <Text style={{color: 'red'}}>{this.state.errors.appCode}</Text>
            </View>
          ) : null}

          <View style={styles.containerButton}>
            <Button title="Submit" size={20} onPress={this._loginEmployee} />
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
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth: 1,
    alignSelf: 'center',
    padding: 5,
    borderRadius: 5,
  },
  containerForm: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
  },
  textLabel: {
    fontSize: 18,
    marginBottom: 5,
    marginLeft: 10,
  },
  containerButton: {
    alignSelf: 'center',
  },
});
