import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {connect} from 'react-redux';
import {getJobdays} from '../../store/actions/jobdayAction';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment';
import RenderItem from './RenderItem';
import RenderEmtyData from './RenderEmtyData';
import Button from '../components/Button';

export class AgendaLog extends Component {
  state = {
    id: '',
    month: {},
  };

  componentDidMount() {
    // console.log('cal updated1');

    this.setState({
      id: this.props.id,
    });
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
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>Calendar</Text>

        <Agenda
          items={this.props.items}
          onDayChange={day => {
            console.log('day changed');
          }}
          // renderItem={this._renderItem.bind(this)}
          renderEmptyData={() => <RenderEmtyData />}
          onDayPress={this._onDayPress.bind(this)}
          renderItem={(item, firstItemInDay) => <RenderItem item={item} />}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  month: state.jobday.month,
});

const mapDispatchToProps = {getJobdays};

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
