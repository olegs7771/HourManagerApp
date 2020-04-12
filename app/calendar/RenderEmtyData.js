//Employee Can Manually edit checkIn and checkOut, submit explanation

import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {connect} from 'react-redux';
import NumericInput from 'react-native-numeric-input';

class RenderEmtyData extends Component {
  render() {
    return (
      <View>
        <View style={styles.tableHead}>
          <View //CheckIn Manually
            style={styles.checkIn}>
            <Text>Start</Text>
          </View>
          <View //CheckOut Manually
            style={styles.checkOut}>
            <Text>End</Text>
          </View>
          <View //Explanation Message
            style={styles.message}>
            <Text>Message</Text>
          </View>
          <View //Icon V
            style={styles.icon}>
            <Text>Submit</Text>
          </View>
        </View>

        <View style={styles.tableData}>
          <View //CheckIn Manually
            style={styles.checkIn}>
            <TextInput />
          </View>
          <View //CheckOut Manually
            style={styles.checkOut}>
            <TextInput />
          </View>
          <View //Explanation Message
            style={styles.message}>
            <TextInput />
          </View>
          <View //Icon V
            style={styles.icon}>
            <Text>V</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
  tableHead: {
    flexDirection: 'row',
  },
  tableData: {
    flexDirection: 'row',
  },
  checkIn: {
    borderWidth: 1,
    width: '25%',
  },
  checkOut: {
    borderWidth: 1,
    width: '25%',
  },
  message: {
    borderWidth: 1,
    width: '25%',
  },
  icon: {
    borderWidth: 1,
    width: '10%',
  },
});

export default connect()(RenderEmtyData);
