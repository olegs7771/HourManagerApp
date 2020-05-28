import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {connect} from 'react-redux';
import {getProject, getLocationMatch} from '../../store/actions/jobdayAction';
import {logoutEmp} from '../../store/actions/authAction';

import Button from '../components/Button';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Geolocation from '../geolocation/Geolocation';

class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this._getProject();
    this.state = {
      projectAddress: '',
      currentAddress: '',
      isMatchedLocation: false,
    };
  }
  _getProject = () => {
    this.props.getProject();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.project !== this.props.project) {
      if (this.props.project) {
        this.setState({projectAddress: this.props.project.address});
      }
    }
    //Handle Errors
    if (prevProps.errors !== this.props.errors) {
      if ((this.props.errors.error = 'Unauthorized!')) {
        this.props.logoutEmp();
      }
    }
    if (this.state.currentAddress !== prevState.currentAddress) {
      console.log('currentAddres updated');
      if (this.state.currentAddress !== this.state.projectAddress) {
        this.setState({isMatchedLocation: false});
        this.props.getLocationMatch({match: false});
      } else {
        this.setState({isMatchedLocation: true});
        this.props.getLocationMatch({match: true});
      }
    }
  }

  _openDrawer = () => {
    this.props.navigation.openDrawer();
    this.setState({drawerOpen: true});
  };
  _geoStatus = data => {
    console.log('data in dashboard ', data);
  };
  _updateCurrAddress = data => {
    console.log('_updateCurrAddress data dashboard', data);

    this.setState({
      currentAddress: data,
    });
  };

  render() {
    if (this.props.project) {
      return (
        <View style={styles.container}>
          <View style={{flexDirection: 'row', backgroundColor: '#694fad'}}>
            <TouchableOpacity style={styles.containerIconDrawerClosed}>
              <Icon
                name="bars"
                size={50}
                onPress={this._openDrawer}
                color="#FFF"
              />
            </TouchableOpacity>

            <Image
              source={require('../../assets/hourmanagerLight.png')}
              style={{
                width: '50%',
                height: 60,
                alignSelf: 'center',
                marginTop: 5,
                marginLeft: 40,
              }}
            />
          </View>
          <View style={styles.containerMain}>
            {this.state.isMatchedLocation ? (
              <View style={styles.locationContainer}>
                <Text style={styles.textTitle}>Location Matched</Text>
                <Icon name="podcast" size={100} color="green" />
                <Text>Current Address:{this.state.currentAddress}</Text>
                <Text>Project Address:{this.state.projectAddress}</Text>
              </View>
            ) : (
              <View style={styles.locationContainer}>
                <Text style={styles.textTitle}>Location Not Matched</Text>
                <Icon name="podcast" size={100} color="red" />
                <Text>Current Address:{this.state.currentAddress}</Text>
                <Text>Project Address:{this.state.projectAddress}</Text>
              </View>
            )}
          </View>
          <Geolocation //Get Current Coords
            getGeoStatus={this._geoStatus}
            position={this._updateCurrAddress}
          />
          {/* {Show Location Status} */}
        </View>
      );
    } else {
      return (
        <View>
          <Text>Loading..</Text>
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
  project: state.project.project,
  errors: state.errors.errors,
});

export default connect(
  mapStateToProps,
  {getProject, getLocationMatch, logoutEmp},
)(DashboardScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  //Move Menu icon If Drawer open
  containerIconDrawerClosed: {
    paddingLeft: 20,
    paddingTop: 10,
  },
  containerMain: {
    flex: 1,
    backgroundColor: '#eae6eb',
  },
  locationContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
