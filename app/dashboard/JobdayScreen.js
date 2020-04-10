import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  getSelectedMonth,
  createCheckInAuto,
  createCheckOutAuto,
} from '../../store/actions/jobdayAction';
import moment from 'moment';
import Button from '../components/Button';
import CalendarModal from '../calendarModal/CalendarModal';
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
    month: {},
  };

  componentDidMount() {
    const m = moment();
    // console.log('mounted');
    if (this.props.auth) {
      this.setState({name: this.props.auth.user.name});
    }
    //request all Jobdays for selected Employee
    //ID we take in Action from parsed Token

    this.props.getSelectedMonth();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.month !== this.props.month) {
      this.setState({
        month: this.props.month,
      });
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
    //Create payload for Action
    const payload = {
      timeStart: m.format(),
    };
    this.props.createCheckOutAuto(payload);
  };

  _openModalCalendar = () => {
    this.props.getSelectedMonth();

    this.setState({modalVisible: true});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <Text style={styles.textGreeting}>
            Good {getGreetingTime(m)} {this.state.name}!
          </Text>
          <Text style={styles.textDate}>
            {m.format('LL')} {m.format('dddd')}
          </Text>
        </View>
        <View style={styles.containerJob}>
          <Button
            text="Start"
            styleCont={styles.btnCheckIn}
            onPress={this._checkIn}
          />
          <Button
            text="End"
            styleCont={styles.btnCheckOut}
            onPress={this._checkOut}
          />
        </View>

        {/* {Modal} */}

        <View style={styles.containerBtn}>
          <Button
            text="View Log"
            onPress={this._openModalCalendar}
            styleCont={styles.containerBtn}
            styleText={{textAlign: 'center'}}
          />
        </View>

        <CalendarModal
          showModal={this.state.modalVisible}
          closeModel={this._closeModel}
          id={this.props.auth.user.id}
          items={this.state.month}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  month: state.jobday.month,
});

const mapDispatchToProps = {
  getSelectedMonth,
  createCheckInAuto,
  createCheckOutAuto,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobdayScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  containerHeader: {
    borderWidth: 1,
    height: 100,
    borderRadius: 5,
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
  containerJob: {
    borderRadius: 5,
    height: 50,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  containerBtn: {
    borderWidth: 1,
    width: '60%',
    marginTop: 30,
    alignSelf: 'center',
  },
  btnCheckOut: {
    backgroundColor: '#6e6f78',
    paddingHorizontal: 50,
  },
  btnCheckIn: {
    backgroundColor: '#09574a',
    paddingHorizontal: 40,
  },
});
