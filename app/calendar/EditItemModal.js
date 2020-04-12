import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Modal} from 'react-native';
import Button from '../components/Button';
import NumericInput from 'react-native-numeric-input';

import {connect} from 'react-redux';

export class EditItemsModal extends Component {
  state = {
    visible: false,
    timeStart: '',
    timeEnd: '',
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.showModal !== this.props.showModal) {
      if (this.props.showModal) {
        this.setState({visible: true});
      }
    }
  }
  componentDidMount() {
    this.setState({
      timeStart: this.props.item.timeStart,
      timeEnd: this.props.item.timeEnd,
    });
  }

  _closeModal = () => {
    this.setState({visible: false});
    this.props.closeModal();
  };

  //Load

  render() {
    return (
      <Modal visible={this.state.visible}>
        <View style={styles.container}>
          <Text>Modal</Text>
        </View>
        <Button text="close" onPress={this._closeModal} />
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
    borderWidth: 3,
  },
});
