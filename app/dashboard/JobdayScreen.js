import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  getJobdays,
  createCheckInAuto,
  createCheckOutAuto,
  getTime,
} from '../../store/actions/jobdayAction';
import moment from 'moment';
import Button from '../components/Button';
import BgTracking from './BgTracking';

const m = moment();

const getGreetingTime = m => {
  let g;
  if (!m || !m.isValid()) return;
  const afternoonTime = 12;
  const eveningTime = 17;
  const currentTime = parseFloat(m.format('HH'));
  if (currentTime >= afternoonTime && currentTime <= eveningTime) {
    g = 'afternoon';
  } else if (currentTime >= eveningTime) {
    g = 'evening';
  } else {
    g = 'morning';
  }
  return g;
};

export class JobdayScreen extends Component {
  state = {
    modalVisible: false,
    name: '',
    jobdays: {},
    startTime: '',
    endTime: '',
    loading: false,
  };

  componentDidMount() {
    const m = moment();
    // console.log('mounted');
    if (this.props.auth) {
      this.setState({name: this.props.auth.user.name});
    }
    //request all Jobdays for selected Employee
    //ID we take in Action from parsed Token

    this.props.getTime();
    this.props.getJobdays();
    if (this.props.jobdays) {
      this.setState({
        jobdays: this.props.jobdays,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.jobdays !== this.props.jobdays) {
      this.setState({
        month: this.props.jobdays,
      });
    }
    if (prevProps.jobTime !== this.props.jobTime) {
      this.setState({
        startTime: this.props.jobTime.timeStart,
        endTime: this.props.jobTime.timeEnd,
      });
    }
    if (prevProps.loading !== this.props.loading) {
      this.setState({
        loading: this.props.loading,
      });
    }
    // if (prevProps.route !== this.props.route) {
    //   this.props.getJobdays();
    //   this.props.getTime();
    // }
  }

  //Change props in parent for child model
  _closeModel = () => {
    this.setState({modalVisible: false});
    console.log('model Closed in parent');
  };
  _checkIn = () => {
    //Create payload for Action
    const payload = {
      timeStart: m.format(),
    };
    this.props.createCheckInAuto(payload);
  };
  _checkOut = () => {
    if (!this.state.startTime)
      return Alert.alert('Please Edit Start manually in Log!');
    //Create payload for Action
    const payload = {
      timeStart: m.format(),
    };
    this.props.createCheckOutAuto(payload);
  };

  _openModalCalendar = () => {
    console.log('open modal');

    // this.props.getJobdays();

    this.setState({modalVisible: true});
  };

  //Show Message if user tries to click on disabled button
  _message = () => {
    Alert.alert(' Sorry... You cant change date');
  };

  render() {
    if (this.state.loading) {
      return <ActivityIndicator size={50} style={{marginTop: 100}} />;
    }
    return (
      <View style={styles.container}>
        <BgTracking />
        <View style={styles.containerHeader}>
          <Text style={styles.textGreeting}>
            Good {getGreetingTime(m)} {this.state.name}!
          </Text>
          <Text style={styles.textDate}>
            {m.format('LL')} {m.format('dddd')}
          </Text>
        </View>

        <View //Show Time CheckIn CheckOut
          style={styles.containerTime}>
          {this.state.startTime ? (
            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 10,
                backgroundColor: '#337d05',
                borderRadius: 5,
              }}>
              <Text style={{fontSize: 18, color: '#e9ebe6'}}>
                Started: {moment(this.state.startTime).format('HH:mm')}
              </Text>
            </View>
          ) : (
            <View>
              <Text />
            </View>
          )}
          {this.state.endTime ? (
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 10,
                backgroundColor: '#54524d',
                borderRadius: 5,
              }}>
              <Text style={{fontSize: 18, color: '#e9ebe6'}}>
                Finished: {moment(this.state.endTime).format('HH:mm')}
              </Text>
            </View>
          ) : (
            <View>
              <Text />
            </View>
          )}
        </View>

        <View style={styles.containerJob}>
          {/* {Disable Button if checkIn Exists} */}
          {!this.state.startTime ? (
            <Button
              text="Start"
              styleCont={styles.btnCheckIn}
              onPress={this._checkIn}
            />
          ) : (
            <Button
              text="Checked"
              styleCont={styles.btnChecked}
              onPress={this._message}
            />
          )}

          {/* {Disable Button if checkOut Exists} */}
          {!this.state.endTime ? (
            <Button
              text="End"
              styleCont={styles.btnCheckOut}
              onPress={this._checkOut}
            />
          ) : (
            <Button
              text="Checked"
              styleCont={styles.btnChecked}
              onPress={this._message}
            />
          )}
        </View>

        {/* {Modal} */}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  jobdays: state.jobday.jobdays,
  jobTime: state.jobday.jobTime,
  loading: state.jobday.loading,
});

const mapDispatchToProps = {
  getJobdays,
  createCheckInAuto,
  createCheckOutAuto,
  getTime,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobdayScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    borderWidth: 1,
    height: 100,

    paddingTop: 10,
    backgroundColor: '#0c4538',
  },
  textGreeting: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#e4e3e6',
  },
  textDate: {
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
    color: '#e4e3e6',
  },
  containerTime: {
    marginTop: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },

  containerJob: {
    borderRadius: 5,
    height: 50,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },

  btnCheckOut: {
    backgroundColor: '#916704',
    paddingHorizontal: 50,
  },
  btnCheckIn: {
    backgroundColor: '#09574a',
    paddingHorizontal: 50,
  },
  btnChecked: {
    backgroundColor: '#969699',
    paddingHorizontal: 34,
  },
});
