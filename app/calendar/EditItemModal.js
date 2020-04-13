import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Modal} from 'react-native';
import Button from '../components/Button';
import NumericInput from 'react-native-numeric-input';
// import Icon from 'react-native-vector-icons/dist/FontAwesome';
import moment from 'moment';

import {connect} from 'react-redux';

export class EditItemsModal extends Component {
  state = {
    visible: false,
    timeStart: '00:00',
    timeEnd: '00:00',
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
      timeStart: this.props.item.timeStart
        ? moment(this.props.item.timeStart).format('HH:mm')
        : '00:00',
      timeEnd: this.props.item.timeEnd ? this.props.item.timeEnd : '00:00',
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
          <Text style={styles.textTitle}>Edit Job Time</Text>

          <View style={styles.start}>
            <View //Header Start
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                marginBottom: 10,
                justifyContent: 'space-between',
                alignSelf: 'center',
                width: '30%',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginVertical: 10,
                }}>
                Start :
              </Text>
              <View
                style={{borderWidth: 1, paddingHorizontal: 10, paddingTop: 10}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  {this.state.timeStart}
                </Text>
              </View>
            </View>
            <View //Hours Start
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                alignSelf: 'center',
                marginBottom: 10,
              }}>
              <Text style={{fontSize: 18, marginRight: 16}}>Hours</Text>
              <NumericInput
                value={this.state.value}
                onChange={value => this.setState({value})}
                type="up-down"
              />
              <NumericInput
                value={this.state.value}
                onChange={value => this.setState({value})}
                type="up-down"
              />
            </View>
            <View //Minutes Start
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                alignSelf: 'center',
              }}>
              <Text style={{fontSize: 18}}>Minutes</Text>
              <NumericInput
                value={this.state.value}
                onChange={value => this.setState({value})}
                type="up-down"
              />
              <NumericInput
                value={this.state.value}
                onChange={value => this.setState({value})}
                type="up-down"
              />
            </View>
            <View style={{marginVertical: 5, alignItems: 'center'}}>
              <Button text="Submit" onPress={this._timeStart} />
            </View>
          </View>
          <View style={styles.end}>
            <View //Header Start
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                marginBottom: 10,
                justifyContent: 'space-between',
                alignSelf: 'center',
                width: '30%',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginVertical: 10,
                }}>
                End:
              </Text>
              <View
                style={{borderWidth: 1, paddingHorizontal: 10, paddingTop: 10}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  {this.state.timeEnd}
                </Text>
              </View>
            </View>
            <View //Hours Start
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                alignSelf: 'center',
                marginBottom: 10,
              }}>
              <Text style={{fontSize: 18, marginRight: 16}}>Hours</Text>
              <NumericInput
                value={this.state.value}
                onChange={value => this.setState({value})}
                type="up-down"
              />
              <NumericInput
                value={this.state.value}
                onChange={value => this.setState({value})}
                type="up-down"
              />
            </View>
            <View //Minutes Start
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                alignSelf: 'center',
              }}>
              <Text style={{fontSize: 18}}>Minutes</Text>
              <NumericInput
                value={this.state.value}
                onChange={value => this.setState({value})}
                type="up-down"
              />
              <NumericInput
                value={this.state.value}
                onChange={value => this.setState({value})}
                type="up-down"
              />
            </View>
            <View style={{marginVertical: 5, alignItems: 'center'}}>
              <Button text="Submit" onPress={this._timeEnd} />
            </View>
          </View>
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
    paddingTop: 10,
    alignContent: 'center',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  start: {
    borderWidth: 1,
    borderColor: 'green',
    paddingVertical: 20,
  },
  end: {
    borderWidth: 1,
    borderColor: 'green',
    paddingVertical: 20,
  },
});
