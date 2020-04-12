import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Button from '../components/Button';
import NumericInput from 'react-native-numeric-input';
import Dialog, {DialogContent} from 'react-native-popup-dialog';

import {connect} from 'react-redux';

export class EditItemsModal extends Component {
  state = {
    visible: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.showModal !== this.props.showModal) {
      this.setState({visible: true});
    }
  }

  render() {
    return <Text>Edit</Text>;
  }
}

const mapStateToProps = state => ({
  jobTime: state.jobday.jobTime,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditItemsModal);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 3,
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
