import React, {Component} from 'react';
//Redux
import {connect} from 'react-redux';
import {getJobdays} from '../../store/actions/jobdayAction';
import {View, Text, Modal, StyleSheet} from 'react-native';
import Button from '../components/Button';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment';
import RenderItem from './RenderItem';
import RenderEmtyData from './RenderEmtyData';

class CalendarModal extends Component {
  state = {
    id: '',
    isVisible: false,
    month: {},
  };
  componentDidMount() {
    // console.log('cal updated1');

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

    this.props.getJobdays(data);
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
            items={this.props.items}
            onDayChange={day => {
              console.log('day changed');
            }}
            // renderItem={this._renderItem.bind(this)}
            renderEmptyData={() => <RenderEmtyData />}
            onDayPress={this._onDayPress.bind(this)}
            renderItem={(item, firstItemInDay) => <RenderItem item={item} />}
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
  {getJobdays},
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
});
