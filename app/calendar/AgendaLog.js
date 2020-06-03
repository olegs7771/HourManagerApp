import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

import {connect} from 'react-redux';
import {
  getJobdays,
  getTime,
  getSelectedDay,
  confirmEmployee,
} from '../../store/actions/jobdayAction';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment';
import RenderItem from './RenderItem';
import RenderEmtyData from './RenderEmtyData';
// import Button from '../components/Button';

export class AgendaLog extends Component {
  state = {
    id: '',
    jobdays: null,
    loading: false,
    selectedDay: null,
    currentDay: null,
  };

  componentDidMount() {
    console.log('agenda loaded');

    this.props.getJobdays();
    this.setState({
      id: this.props.id,
    });
    //Get current date on mount for renderEmptyData on openning
    this.setState({currentDay: moment().format('YYYY-MM-DD')});
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.jobdays !== this.props.jobdays) {
      this.setState({jobdays: this.props.jobdays});
    }
    if (prevProps.loading !== this.props.loading) {
      this.setState({loading: this.props.loading});
    }
    if (prevProps.selectedDay !== this.props.selectedDay) {
      this.setState({selectedDay: this.props.selectedDay});
    }
    //Reload Jobdays to update calendar after navigate from message.js
    if (prevProps.route !== this.props.route) {
      this.props.getJobdays();
      this.props.getTime();
    }
  }

  _onDayPress = day => {
    console.log('day', day.dateString);
    //Create firstDay and lastDay of selected month
    const startDay = moment(day.dateString)
      .startOf('month')
      .format('');

    const endDay = moment(day.dateString)
      .endOf('month')
      .format('');

    const data = {
      date: {
        startDay,
        endDay,
      },
      id: this.state.id,
    };

    this.props.getJobdays(data);
    this.props.getSelectedDay({day: day.dateString});
  };

  //Employee pressed V icon confirms on hour pair
  //V icon loacated in child renderItem.js
  _confirm = value => {
    //Create payload for action
    this.props.confirmEmployee(value);
  };

  render() {
    if (this.state.jobdays) {
      return (
        <View style={styles.container}>
          <Text style={styles.textTitle}>Calendar</Text>

          <Agenda
            items={this.state.jobdays}
            onDayChange={day => {
              console.log('day changed');
            }}
            renderEmptyData={() => (
              <RenderEmtyData
                selectedDay={this.state.selectedDay}
                currentDate={this.state.currentDay}
                navigation={this.props.navigation}
              />
            )}
            onDayPress={this._onDayPress.bind(this)}
            renderItem={(item, firstItemInDay) => (
              <RenderItem
                item={item}
                confirm={this._confirm}
                //Pass navigation for chirdren
                navigation={this.props.navigation}
              />
            )}
          />
        </View>
      );
    } else {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
  jobdays: state.jobday.jobdays,
  loading: state.jobday.loading,
  jobTime: state.jobday.jobTime,
  selectedDay: state.jobday.selectedDay,
  message: state.message.message,
  loading: state.message.loading,
});

const mapDispatchToProps = {
  getJobdays,
  getTime,
  getSelectedDay,
  confirmEmployee,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AgendaLog);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 20,
  },
  containerCalendar: {
    borderWidth: 1,
  },
});
