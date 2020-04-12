import React, {Component} from 'react';
import {View, Text, Modal} from 'react-native';
import Button from '../components/Button';

import {connect} from 'react-redux';

export class EditItemsModal extends Component {
  state = {
    isVisible: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.showModal !== this.props.showModal) {
      this.setState({isVisible: true});
    }
  }

  render() {
    return (
      <Modal animationType="slide" visible={this.state.isVisible}>
        <View>
          <Text> Edit Here </Text>
          <Button
            text="Close"
            onPress={() => this.setState({isVisible: false})}
          />
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditItemsModal);
