import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import Button from '../components/Button';

class Message extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput multiline={true} />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Button
            text="Set Time"
            onPress={this._setTimeEnd}
            styleCont={{borderRadius: 5, backgroundColor: 'green'}}
          />
          <Button
            text="Cancel"
            onPress={this._resetState}
            styleCont={{
              borderRadius: 5,
              backgroundColor: 'grey',
              marginLeft: 5,
            }}
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
    marginBottom: 40,
    borderRadius: 5,
  },
});
