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
    apiMessage: null,
    loading: false,
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
    //Response apiMessage from timeStart manually
    if (prevProps.apiMessage !== this.props.apiMessage) {
      this.setState({apiMessage: this.props.apiMessage});
    }
    if (prevProps.loading !== this.props.loading) {
      this.setState({loading: this.props.loading});
    }
  }

  _closeModal = () => {
    this.props.closeModal();
    this.setState({visible: false});
  };

  componentWillUnmount() {
    console.log('modal closed');
  }

  render() {
    return (
      <Modal visible={this.state.visible}>
        <ScrollView>
          <EditStartTime
            start={this.state.start}
            apiMessage={this.state.apiMessage}
            loading={this.state.loading}
            navigation={this.props.navigation}
            closeModal={this._closeModal}
          />
          <EditEndTime
            end={this.state.end}
            apiMessage={this.state.apiMessage}
            loading={this.state.loading}
            navigation={this.props.navigation}
            closeModal={this._closeModal}
          />
        </ScrollView>
        <Button text="Close" onPress={this._closeModal} />
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  jobTime: state.jobday.jobTime,
  apiMessage: state.message.message.message,
  loading: state.message.loading,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditItemsModal);
