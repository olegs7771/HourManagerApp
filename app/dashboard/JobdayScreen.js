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
  getProject,
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
    project: null,
    // currentCoords: {lat: 32.854503559749695, lng: 35.07124642858887},
    currentCoords: null,
    isGeolocated: false,
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
    this.props.getProject();
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
    if (prevProps.project !== this.props.project) {
      this.setState({
        project: this.props.project,
      });
      console.log('coords from project', this.props.project.coords);
    }
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

  //get current coordsfrom
  _getCurrentCoords = data => {
    console.log('data current coords', data);
    this.setState(prevState => {
      return {
        ...prevState,
        currentCoords: data,
      };
    });

    if (this.state.project) {
      console.log('current position', data);
      console.log('project position', this.state.project.coords);

      if (this.state.currentCoords === this.state.project.coords) {
        return console.log('Match!');
      }
    }
  };

  render() {
    // if (this.state.isGeolocated) {
    if (this.state.loading) {
      return <ActivityIndicator size={50} style={{marginTop: 100}} />;
    }
    return (
      <View style={styles.container}>
        <BgTracking
          //Get Current Coords
          coordsChild={this._getCurrentCoords}
        />
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

        {/* {Current Coords} */}
        {this.state.currentCoords && (
          <View>
            <Text style={{textAlign: 'center'}}>Coordinates</Text>
            <Text>lat {this.state.currentCoords.lat}</Text>
            <Text>lng {this.state.currentCoords.lng}</Text>
          </View>
        )}
      </View>
    );
    // }
    // else {
    //   return (
    //     <View style={styles.container2}>
    //       <BgTracking coordsChild={this._getCurrentCoords} />
    //       <Text style={styles.textTitle2}>No Location</Text>
    //       <View style={{alignSelf: 'center', paddingTop: 20}}>
    //         <Icon name="times-circle" size={50} color="red" />
    //       </View>
    //     </View>
    //   );
    // }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  jobdays: state.jobday.jobdays,
  jobTime: state.jobday.jobTime,
  loading: state.jobday.loading,
  project: state.project.project,
});

const mapDispatchToProps = {
  getJobdays,
  createCheckInAuto,
  createCheckOutAuto,
  getTime,
  getProject,
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
  //Style for No Location Available
  container2: {
    flex: 1,

    alignContent: 'center',
    paddingTop: 20,
  },
  textTitle2: {
    textAlign: 'center',
  },
});
