import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import Button from '../components/Button';

class Message extends Component {
  state = {
    message: '',
    isValid: '',
    errors: {},
  };

  _setTimeEnd = () => {
    if (!this.state.isValid) {
      return this.setState({
        errors: {
          error: 'Please write at least 20 chars comment',
        },
      });
    }
    console.log('can send');
    //create payload body: message
    this.props.submit();
  };
  _onChange = e => {
    this.setState({errors: {}, message: e});
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.message !== this.state.message) {
      if (this.state.message.length >= 20) {
        this.setState({isValid: true});
        //If isValid we send message to Parent
        this.props.message(this.state.message);
      } else {
        this.setState({isValid: false});
      }
    }
  }
  _resetState = () => {
    this.props.resetState();
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.errors && (
          <Text style={{color: 'red'}}>{this.state.errors.error}</Text>
        )}
        <TextInput
          multiline={true}
          numberOfLines={3}
          placeholder="Please add comment what was a reason for manual editing of time. Min 20 chars"
          fontSize={16}
          onChangeText={this._onChange}
          style={{marginTop: -30}}
        />
        <View
          style={{
            flexDirection: 'row',

            justifyContent: 'space-between',
            width: '60%',
            marginVertical: 5,
          }}>
          <Button
            text="Set Time"
            onPress={this._setTimeEnd}
            styleCont={{
              borderRadius: 5,
              backgroundColor: this.state.isValid ? 'green' : 'grey',
              paddingVertical: 5,
              paddingHorizontal: 15,
            }}
          />
          <Button
            text="Cancel"
            onPress={this._resetState}
            styleCont={{
              borderRadius: 5,
              backgroundColor: 'grey',

              paddingVertical: 5,
              paddingHorizontal: 15,
            }}
            styleText={{fontSize: 16}}
          />
        </View>
      </View>
    );
  }
}

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0.5,
    width: '90%',
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: '#ffffff',
  },
});
