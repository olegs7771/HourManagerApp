import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, Button} from 'react-native';
import {conect, connect} from 'react-redux';
import {loginEmployee} from '../../store/actions/authAction';

class LoginScreen extends Component {
  state = {
    email: '',
    code: '',
    errors: {},
  };

  _loginEmployee = () => {
    //Validation
    if (this.state.email.length === 0)
      return this.setState({errors: {email: 'Provide Email'}});

    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!regex.test(this.state.email))
      return this.setState({errors: {email: 'Email invalid format'}});

    if (this.state.code.length === 0)
      return this.setState({errors: {code: 'Provide Code'}});

    const data = {
      email: this.state.email,
      code: this.state.code,
    };

    console.log('data', data);
    this.props.loginEmployee(data);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}> Login Here </Text>

        <View style={styles.containerForm}>
          <Text style={styles.textLabel}>Email</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={email => this.setState({email})}
            name="email"
            value={this.state.email}
            keyboardType="email-address"
          />
          {this.state.errors ? <View>{}</View> : null}
          <Text style={styles.textLabel}>Code</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={code => this.setState({code})}
            name="code"
            value={this.state.code}
            keyboardType="numeric"
          />
          <View style={styles.containerButton}>
            <Button title="Submit" size={20} onPress={this._loginEmployee} />
          </View>
        </View>
      </View>
    );
  }
}

export default connect(null, {loginEmployee})(LoginScreen);

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
