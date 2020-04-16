import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Button from '../components/Button';
import NumericInput from 'react-native-numeric-input';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {connect} from 'react-redux';
import {setEndTimeMan} from '../../store/actions/jobdayAction';
import Message from './Message';

export class EditEndTime extends Component {
  state = {
    hours: 0,
    minutes: 0,
    isDoubleDIgitHours: false,
    isDoubleDIgitMinutes: false,
    submitted: false,
    confirmed: false,
    message: '',
    selectedDay: null,
  };
  //Hide 0 if double digit
  _hoursEdit = e => {
    if (e > 8) {
      this.setState({isDoubleDIgitHours: true});
    }
    if (e < 10) {
      this.setState({isDoubleDIgitHours: false});
    }
    this.setState({hours: e});
  };
  _minutesEdit = e => {
    if (e > 8) {
      this.setState({isDoubleDIgitMinutes: true});
    }
    if (e < 10) {
      this.setState({isDoubleDIgitMinutes: false});
    }
    this.setState({minutes: e});
  };

  componentDidMount() {
    if (this.props.selectedDay) {
      this.setState({selectedDay: this.props.selectedDay});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.hours !== this.state.hours) {
      this.setState({hours: this.state.hours});
    }
    if (prevState.minutes !== this.state.minutes) {
      this.setState({minutes: this.state.minutes});
    }
  }

  _submitEdit = () => {
    this.setState({submitted: true});
  };

  //Send (timeEnd set manually by Employee ) to Action
  _setTimeEnd = () => {
    const {hours, minutes, message} = this.state;
    //Prepare time format for DB
    let Hours;
    let Mins;
    Hours = hours < 10 ? `0${hours}` : hours;
    Mins = minutes < 10 ? `0${minutes}` : minutes;

    console.log('time end', `${Hours}:${Mins}`);
    const payload = {
      timeEnd: `${Hours}:${Mins}`,
      message,
      selectedDay: this.state.selectedDay,
    };
    this.props.setEndTimeMan(payload);
  };
  _resetState = () => {
    this.setState({
      hours: 0,
      minutes: 0,
      confirmed: false,
      submitted: false,
    });
  };

  //get message from Message.js
  _getMessage = message => {
    this.setState({message});
  };

  render() {
    const {hours, minutes} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>Edit End Time</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.showTime}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              {this.state.isDoubleDIgitHours ? `${hours}` : `0${hours}`}:
              {this.state.isDoubleDIgitMinutes ? `${minutes}` : `0${minutes}`}
            </Text>
          </View>
          {this.state.submitted && !this.state.confirmed && (
            <TouchableOpacity //Show Icon if submitted
              onPress={() => this.setState({confirmed: true})}
              style={{
                backgroundColor: 'green',
                borderRadius: 50,
                marginLeft: 20,
                padding: 20,
              }}>
              <Icon name="check" size={20} color="#FFF" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.editTime}>
          <View style={styles.hours}>
            <View style={{borderWidth: 1, marginBottom: 20}}>
              <Text style={{textAlign: 'center', fontSize: 18}}>Hours</Text>
            </View>
            <NumericInput
              value={this.state.hours}
              onChange={this._hoursEdit}
              maxValue={23}
              minValue={0}
              onLimitReached={(isMax, msg) => console.log(isMax, msg)}
              rounded={true}
              totalHeight={50}
              totalWidth={150}
            />
          </View>
          <View style={styles.minutes}>
            <View style={{borderWidth: 1, marginBottom: 20}}>
              <Text style={{textAlign: 'center', fontSize: 18}}>Minutes</Text>
            </View>
            <NumericInput
              value={this.state.value}
              onChange={this._minutesEdit}
              maxValue={59}
              minValue={0}
              rounded={true}
              totalHeight={50}
              totalWidth={150}
            />
          </View>
        </View>
        {this.state.confirmed ? (
          <Message
            resetState={this._resetState}
            message={this._getMessage}
            submit={this._setTimeEnd}
          />
        ) : (
          <View>
            <Button text="Submit" onPress={this._submitEdit} />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  selectedDay: state.jobday.selectedDay,
});

const mapDispatchToProps = {setEndTimeMan};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditEndTime);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  editTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    width: '80%',
  },
  showTime: {
    alignSelf: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});
