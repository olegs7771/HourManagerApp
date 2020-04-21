import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Button from '../components/Button';
import NumericInput from 'react-native-numeric-input';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {connect} from 'react-redux';
import {setStartTimeMan} from '../../store/actions/jobdayAction';
import Message from './Message';
import moment from 'moment';

export class EditStartTime extends Component {
  state = {
    hours: 0,
    minutes: 0,
    isDoubleDIgitHours: false,
    isDoubleDIgitMinutes: false,
    submitted: false,
    confirmed: false,
    message: '',
    selectedDay: null,
    //Response from API on setting timeStart
    apiMessage: null,
    loading: false,
  };
  //Hide 0 if double digit
  _hoursEdit = e => {
    console.log('editing time');

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
    //show start time if exists on mout
    console.log('start on mount', typeof this.props.start);
    if (this.props.start) {
      let hourNum;
      let minNum;

      if (parseInt(this.props.start.slice(0, 2)) > 9) {
        hourNum = parseInt(this.props.start.slice(0, 2));
        this.setState({isDoubleDIgitHours: true, hours: hourNum});
      } else {
        hourNum = parseInt(this.props.start.slice(0, 2));
        this.setState({hours: hourNum});
      }
      if (parseInt(this.props.start.slice(3, 5)) > 9) {
        minNum = parseInt(this.props.start.slice(3, 5));
        this.setState({isDoubleDIgitMinutes: true, minutes: minNum});
      } else {
        minNum = parseInt(this.props.start.slice(3, 5));
        this.setState({minutes: minNum});
      }
    }

    //  const hourStr = this.props.start?this.props.start:0
    //  const minStr = this.props.start?this.props.start:0
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.hours !== this.state.hours) {
      this.setState({hours: this.state.hours});
    }
    if (prevState.minutes !== this.state.minutes) {
      this.setState({minutes: this.state.minutes});
    }
    //apiMessage
    if (prevProps.apiMessage !== this.props.apiMessage) {
      this.setState({apiMessage: this.props.apiMessage});
    }
    if (prevProps.loading !== this.props.loading) {
      this.setState({loading: this.props.loading});
    }
  }

  _submitEdit = () => {
    this.setState({submitted: true});
  };

  //Send (timeStart set manually by Employee ) to Action
  _setTimeStart = () => {
    const {hours, minutes, message} = this.state;
    //Prepare time format for DB
    let Hours;
    let Mins;
    Hours = hours < 10 ? `0${hours}` : hours;
    Mins = minutes < 10 ? `0${minutes}` : minutes;

    console.log('time end', `${Hours}:${Mins}`);
    //If in redux state selectedDay===null(on openning renderEmptyData)
    // get today date
    const todayDate = moment().format('YYYY-MM-DD');

    const payload = {
      timeStart: `${Hours}:${Mins}`,
      message,
      selectedDay: this.state.selectedDay ? this.state.selectedDay : todayDate,
    };
    this.props.setStartTimeMan(payload);
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

  // this.props.jobTime.timeStart
  _onPressBtn = () => {
    const jobTime = {timeStart: this.state};
    this.props.navigation.navigate('DashBoard');
    // close Modal
    this.props.closeModal();
  };

  render() {
    const {hours, minutes} = this.state;
    if (this.state.loading) {
      return (
        <View>
          <Text>Loding..</Text>
        </View>
      );
    }
    if (this.state.apiMessage) {
      return (
        <View style={styles.apiMessage}>
          <Text style={styles.textapiMessage}>{this.state.apiMessage}</Text>
          <Button text="Back to Jobday" onPress={this._onPressBtn} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>Edit Start Time</Text>
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
            submit={this._setTimeStart}
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

const mapDispatchToProps = {setStartTimeMan};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditStartTime);

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
