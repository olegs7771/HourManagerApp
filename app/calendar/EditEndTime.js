import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Button from '../components/Button';
import NumericInput from 'react-native-numeric-input';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {connect} from 'react-redux';
import {setEndTimeMan} from '../../store/actions/jobdayAction';
import Message from './Message';
import moment from 'moment';

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
    console.log('this.props end', this.props.end);

    if (this.props.selectedDay) {
      this.setState({selectedDay: this.props.selectedDay});
    }

    //show end time if exists on mount
    console.log('start on mount', typeof this.props.start);
    if (this.props.end.length === 5 || !this.props.end === 'No Time Set!') {
      console.log('this.props.end', this.props.end);

      let hourNum;
      let minNum;

      if (parseInt(this.props.end.slice(0, 2)) > 9) {
        hourNum = parseInt(this.props.end.slice(0, 2));
        this.setState({isDoubleDIgitHours: true, hours: hourNum});
      } else {
        hourNum = parseInt(this.props.end.slice(0, 2));
        this.setState({hours: hourNum});
      }
      if (parseInt(this.props.end.slice(3, 5)) > 9) {
        minNum = parseInt(this.props.end.slice(3, 5));
        this.setState({isDoubleDIgitMinutes: true, minutes: minNum});
      } else {
        minNum = parseInt(this.props.end.slice(3, 5));
        this.setState({minutes: minNum});
      }
    }
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

  //Send (timeEnd set manually by Employee ) to Action
  _setTimeEnd = () => {
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
      timeEnd: `${Hours}:${Mins}`,
      message,
      selectedDay: this.state.selectedDay ? this.state.selectedDay : todayDate,
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
  // this.props.jobTime.timeStart
  _onPressBtn = () => {
    const jobTime = {
      timeEnd: {
        hours: this.state.hours,
        minutes: this.state.minutes,
      },
    };

    this.props.navigation.navigate('Log', {
      jobTime,
      // currentDate: this.props.currentDate,
      // selectedDate: this.props.selectedDay,
    });
    // close Modal
    this.props.closeModal();
  };

  render() {
    const {hours, minutes} = this.state;
    if (this.state.loading) {
      return (
        <View style={{justifyContent: 'center', paddingVertical: 50}}>
          <ActivityIndicator size={50} />
        </View>
      );
    }
    if (this.state.apiMessage || this.props.apiMessage) {
      return (
        <View style={styles.apiMessage}>
          <Text style={styles.textapiMessage}>
            {this.state.apiMessage || this.props.apiMessage}
          </Text>
          <Button
            text="Back to Jobday"
            onPress={this._onPressBtn}
            styleCont={{
              borderRadius: 5,
              marginTop: 20,
              backgroundColor: '#195424',
            }}
          />
        </View>
      );
    }
    return (
      <View
        style={
          !this.state.confirmed
            ? styles.container
            : styles.containerWithPaddingBotom
        }>
        <Text style={styles.textTitle}> End Time</Text>
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
        {!this.state.confirmed && (
          <View style={styles.editTime}>
            <View style={styles.hours}>
              <View
                style={{
                  marginBottom: 20,
                  borderRadius: 5,
                  paddingVertical: 5,
                  backgroundColor: '#ffffff',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  Hours
                </Text>
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
              <View
                style={{
                  marginBottom: 20,
                  borderRadius: 5,
                  paddingVertical: 5,
                  backgroundColor: '#ffffff',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  Minutes
                </Text>
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
        )}
        {this.state.confirmed ? (
          <Message
            resetState={this._resetState}
            message={this._getMessage}
            submit={this._setTimeEnd}
          />
        ) : (
          <View>
            <Button
              text="Submit"
              onPress={this._submitEdit}
              styleCont={{
                backgroundColor: '#03801c',
                paddingVertical: 5,
                paddingHorizontal: 20,
                borderRadius: 5,
                marginBottom: 20,
              }}
            />
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
    marginTop: 5,
    backgroundColor: '#e0e0e0',
    paddingBottom: 30,
  },
  containerWithPaddingBotom: {
    flex: 1,
    paddingTop: 10,
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: '#e0e0e0',
    paddingBottom: 150,
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
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: '#ffffff',
  },
  apiMessage: {
    paddingVertical: 50,
    alignItems: 'center',
  },
  textapiMessage: {
    fontSize: 20,
    color: '#03852a',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
