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
    timeStart: '00:00',
    timeEnd: '00:00',

    startH1: 0,
    startH2: 0,
    startM1: 0,
    startM2: 0,
    endH1: 0,
    endH2: 0,
    endM1: 0,
    endM2: 0,
    showConfirmButton: false,
    confirmEdit: false,
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

  _timeEndSubmit = () => {
    const {endH1, endH2, endM1, endM2} = this.state;
    const editedTimeEnd = `${endH1}${endH2}:${endM1}${endM2}`;

    this.setState({timeEnd: editedTimeEnd, showConfirmButton: true});
  };
  _confirmEditEnd = () => {
    this.setState({confirmEdit: true});
  };

  render() {
    return (
      <Modal visible={this.state.visible}>
        <View style={styles.container}>
          <Text style={styles.textTitle}>Edit Job Time</Text>

          {/* {Start} */}
          {this.state.timeStart ? ( //If timeStart exist Employee can't edit it
            <View //Header Start
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                marginVertical: 20,
                justifyContent: 'space-between',
                alignSelf: 'center',
                width: '60%',
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginVertical: 10,
                }}>
                Job day started at :{' '}
              </Text>
              <View style={{paddingTop: 10}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {this.state.timeStart}
                </Text>
              </View>
            </View>
          ) : (
            // {After Edit Confir Buton apears}
            <View style={styles.start}>
              <View //Header Start
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  marginBottom: 10,
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                  width: '40%',
                  paddingHorizontal: 20,
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
                <View style={{paddingTop: 10}}>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>
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
                  value={this.state.startH1}
                  onChange={startH1 => this.setState({startH1})}
                  type="up-down"
                />
                <NumericInput
                  value={this.state.startH2}
                  onChange={startH2 => this.setState({startH2})}
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
                  value={this.state.startM1}
                  onChange={startM1 =>
                    this.setState({
                      startM1,
                    })
                  }
                  type="up-down"
                />
                <NumericInput
                  value={this.state.startM2}
                  onChange={startM2 => this.setState({startM2})}
                  type="up-down"
                />
              </View>
              <View style={{marginVertical: 5, alignItems: 'center'}}>
                <Button text="Submit" onPress={this._timeStart} />
              </View>
            </View>
          )}

          {/* {End} */}
          <View style={styles.end}>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 20,
                alignSelf: 'center',
              }}>
              <View //Header End
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,

                  justifyContent: 'space-between',
                  alignSelf: 'center',
                  width: '40%',
                  paddingHorizontal: 20,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginVertical: 10,
                  }}>
                  End :
                </Text>
                <View style={{paddingHorizontal: 10, paddingTop: 10}}>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    {this.state.timeEnd}
                  </Text>
                </View>
              </View>
              {this.state.showConfirmButton && (
                <View //Confirm Button after editing.changed to V and Update DB
                  style={{marginLeft: 10}}>
                  {this.state.confirmEdit ? (
                    <View
                      style={{
                        backgroundColor: '#106605',
                        borderRadius: 50,
                        padding: 5,
                      }}>
                      <Icon name="check" size={20} color="#FFF" />
                    </View>
                  ) : (
                    <Button
                      text="Confirm"
                      styleCont={{borderRadius: 5, backgroundColor: '#5a9e51'}}
                      onPress={this._confirmEditEnd}
                    />
                  )}
                </View>
              )}
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
                value={this.state.endH1}
                onChange={endH1 => this.setState({endH1})}
                type="up-down"
              />
              <NumericInput
                value={this.state.endH2}
                onChange={endH2 => this.setState({endH2})}
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
                value={this.state.endM1}
                onChange={endM1 => this.setState({endM1})}
                type="up-down"
              />
              <NumericInput
                value={this.state.endM2}
                onChange={endM2 => this.setState({endM2})}
                type="up-down"
              />
            </View>
            <View style={{marginVertical: 5, alignItems: 'center'}}>
              <Button text="Submit" onPress={this._timeEndSubmit} />
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
