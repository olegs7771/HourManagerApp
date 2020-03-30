import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, Button} from 'react-native';

class Login extends Component {
  state = {
    email: '',
    code: '',
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
          />
          <Text style={styles.textLabel}>Code</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={code => this.setState({code})}
            name="code"
            value={this.state.code}
          />
          <View style={styles.containerButton}>
            <Button title="Submit" size={20} />
          </View>
        </View>
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 4,
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
