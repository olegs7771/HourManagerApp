import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Modal} from 'react-native';
import Button from '../components/Button';
import NumericInput from 'react-native-numeric-input';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import moment from 'moment';

import {connect} from 'react-redux';

export class EditItemsModal extends Component {
  state = {
    visible: false,
    hours: '00',
    minutes: '00',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.showModal !== this.props.showModal) {
      if (this.props.showModal) {
        this.setState({visible: true});
      }
    }
  }
  _closeModal = () => {
    this.props.closeModal();
    this.setState({visible: false});
  };
  render() {
    const {hours, minutes} = this.state;
    return (
      <Modal visible={this.state.visible}>
        <View style={styles.container}>
          <Text style={styles.textTitle}>Edit End Time</Text>
          <View style={styles.showTime}>
            <Text style={{fontSize: 20}}>{`${hours}:${minutes}`}</Text>
          </View>

          <View style={styles.editTime}>
            <View style={styles.hours}>
              <Text
                style={{textAlign: 'center', fontSize: 18, marginVertical: 5}}>
                Hours
              </Text>
              <NumericInput
                value={this.state.value}
                onChange={this._hoursEdit}
              />
            </View>
            <View style={styles.minutes}>
              <Text
                style={{textAlign: 'center', fontSize: 18, marginVertical: 5}}>
                Minutes
              </Text>
              <NumericInput
                value={this.state.value}
                onChange={this._minutesEdit}
              />
            </View>
          </View>
        </View>
        <Button text="Close" onPress={this._closeModal} />
      </Modal>
    );
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
    paddingTop: 10,
    alignContent: 'center',
    paddingTop: 20,
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  editTime: {
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'space-between',
    marginVertical: 20,
    width: '60%',
  },
  showTime: {
    borderWidth: 1,
    borderColor: 'green',
    marginVertical: 10,
    alignSelf: 'center',
  },
  hours: {
    borderWidth: 1,
    borderColor: 'red',
  },
  minutes: {
    borderWidth: 1,
    borderColor: 'red',
  },
});
