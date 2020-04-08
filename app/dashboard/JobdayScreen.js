import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';
import Button from '../components/Button';
import CalendarModal from '../modals/CalendarModal';
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
  };

  componentDidMount() {
    const m = moment();
    console.log('mounted');
    if (this.props.auth) {
      this.setState({name: this.props.auth.user.name});
    }
  }
  //Change props in parent for child model
  _closeModel = () => {
    this.setState({modalVisible: false});
    console.log('model Closed in parent');
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
            text="CheckIn"
            styleCont={{backgroundColor: '#235408'}}
            onPress={() => console.log('clicked')}
          />
          <Button text="CheckOut" styleCont={{backgroundColor: '#730b0b'}} />
        </View>

        {/* {Modal} */}

        <View style={styles.containerBtn}>
          <Button
            text="View Log"
            onPress={() => this.setState({modalVisible: true})}
            styleCont={styles.containerBtn}
            styleText={{textAlign: 'center'}}
          />
        </View>

        <CalendarModal
          showModal={this.state.modalVisible}
          closeModel={this._closeModel}
          id={this.props.auth.user.id}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

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
    backgroundColor: '#300a70',
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
    width: '60%',
    alignSelf: 'center',
  },
  containerBtn: {
    width: '60%',
    marginTop: 30,
    alignSelf: 'center',
  },
});
