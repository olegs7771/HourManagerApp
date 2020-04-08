import React, {Component} from 'react';
//Redux
import {connect} from 'react-redux';
import {getSelectedMonth} from '../../store/actions/jobdayAction';

import {View, Text, Modal, StyleSheet} from 'react-native';
import Button from '../components/Button';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment';

class CalendarModal extends Component {
  state = {
    id: '',
    isVisible: false,
    month: {},
  };
  componentDidMount() {
    console.log('cal updated1');

    this.setState({
      id: this.props.id,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.showModal !== this.props.showModal) {
      if (this.props.showModal) {
        this.setState({isVisible: true});
      }
    }
    if (prevState.month !== this.props.month) {
      this.setState({
        month: this.props.month,
      });
    }
  }

  _closeModel = () => {
    this.setState({isVisible: false});
    this.props.closeModel();
  };

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

    this.props.getSelectedMonth(data);
  };

  _renderItem = item => {
    return (
      <View style={styles.containerItem}>
        <Text>
          {item.timeEnd}timeEnd
          {item.timeStart}timeStart
        </Text>
      </View>
    );
  };
  _renderEmptyData = () => {
    return (
      <View style={styles.containerItem}>
        <Text>No Data..</Text>
      </View>
    );
  };

  render() {
    return (
      <Modal animationType="slide" visible={this.state.isVisible}>
        <View style={styles.container}>
          <Text style={styles.textTitle}>Calendar</Text>

          <Agenda
            // items={{
            //   '2020-04-06': [{name: 'item 1 for 06', event: 'GoHome'}],
            //   '2020-04-07': [{name: 'item 1 for 07'}],
            //   '2020-04-23': [{name: 'item 2 for 23'}],
            //   '2020-04-24': [{name: 'item 2 for 24'}],
            //   '2020-04-25': [{name: 'item 2 for 25'}],
            //   '2020-04-26': [{name: 'item 2 for 26'}],
            //   '2020-04-27': [{name: 'item 2 for 27'}],
            //   '2020-04-28': [{name: 'item 2 for 28'}],
            //   '2020-04-29': [{name: 'item 2 for 29'}],

            //   '2020-04-25': [{name: 'item 1 for 25'}, {name: 'item 2 for 25'}],
            // }}
            items={this.state.month}
            renderItem={this._renderItem.bind(this)}
            renderEmptyData={this._renderEmptyData.bind(this)}
            onDayPress={this._onDayPress.bind(this)}
          />

          <Button text="close" onPress={this._closeModel} />
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  month: state.jobday.month,
});

export default connect(
  mapStateToProps,
  {getSelectedMonth},
)(CalendarModal);

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
  containerItem: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
});
