import React, {Component} from 'react';
import {View, Text, StyleSheet, Modal, ScrollView} from 'react-native';
import Button from '../components/Button';

import {connect} from 'react-redux';
import EditStartTime from './EditStartTime';
import EditEndTime from './EditEndTime';

export class EditItemsModal extends Component {
  state = {
    visible: false,
    start: '',
    end: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.showModal !== this.props.showModal) {
      if (this.props.showModal) {
        this.setState({
          visible: true,
          start: this.props.start,
          end: this.props.end,
        });
      }
    }
  }

  _closeModal = () => {
    this.props.closeModal();
    this.setState({visible: false});
  };

  render() {
    return (
      <Modal visible={this.state.visible}>
        <ScrollView>
          <EditStartTime start={this.state.start} />
          <EditEndTime end={this.state.end} />
        </ScrollView>
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
