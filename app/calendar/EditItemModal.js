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
    apiMessageStart: null,
    apiMessageEnd: null,
    loadingStart: false,
    loadingEnd: false,
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
      if (this.props.apiMessage) {
        const str = this.props.apiMessage;
        if (str.includes('Start')) {
          return this.setState({apiMessageStart: this.props.apiMessage});
        } else {
          this.setState({apiMessageEnd: this.props.apiMessage});
        }
      }
    }
    if (prevProps !== this.props) {
      this.setState({loadingEnd: this.props.loadingEnd});
      this.setState({loadingStart: this.props.loadingStart});
    }
  }

  _closeModal = () => {
    this.props.closeModal(); //from renderItem.js
    this.setState({visible: false, apiMessageStart: null, apiMessageEnd: null});
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
            apiMessage={this.state.apiMessageStart}
            loading={this.state.loadingStart}
            navigation={this.props.navigation}
            closeModal={this._closeModal}
            currentDate={this.props.currentDate}
            selectedDate={this.props.selectedDate}
          />
          <EditEndTime
            end={this.state.end}
            apiMessage={this.state.apiMessageEnd}
            loading={this.state.loadingEnd}
            navigation={this.props.navigation}
            closeModal={this._closeModal}
            currentDate={this.props.currentDate}
            selectedDate={this.props.selectedDate}
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
  loadingStart: state.message.loadingStart,
  loadingEnd: state.message.loadingEnd,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditItemsModal);
