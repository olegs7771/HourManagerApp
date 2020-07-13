import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';

import {connect} from 'react-redux';
import {getProject, getLocationMatch} from '../../store/actions/jobdayAction';
import {logoutEmp} from '../../store/actions/authAction';

// import Button from '../components/Button';
// import moduleName from '../../';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Geolocation from '../geolocation/Geolocation';

class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this._getProject();
    this.state = {
      projectAddress: '',
      projectPlus_code: '',
      currentAddress: '',
      currentPlus_code: '',
      isMatchedLocation: false,
    };
  }
  _getProject = () => {
    this.props.getProject();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.project !== this.props.project) {
      if (this.props.project) {
        this.setState({
          projectAddress: this.props.project.address,
          projectPlus_code: this.props.project.plus_code,
        });
      }
    }
    //Handle Errors
    if (prevProps.errors !== this.props.errors) {
      if ((this.props.errors.error = 'Unauthorized!')) {
        this.props.logoutEmp();
      }
    }
    //change here for debug
    if (this.state.currentAddress !== prevState.currentAddress) {
      console.log('currentAddres updated');
      if (this.state.currentPlus_code !== this.state.projectPlus_code) {
        this.setState({isMatchedLocation: false});
        this.props.getLocationMatch({match: false});
      } else {
        this.setState({isMatchedLocation: true});
        this.props.getLocationMatch({match: true});
      }
      if (this.state.isMatchedLocation !== prevState.isMatchedLocation) {
        this.setState({isMatchedLocation: this.state.isMatchedLocation});
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
    this.setState({
      currentAddress: data.address,
      currentPlus_code: data.plus_code,
    });
  };

  render() {
    if (this.props.project) {
      return (
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#022e54',
              paddingVertical: 10,
            }}>
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
                width: '40%',
                height: 50,
                alignSelf: 'center',
                marginTop: 5,
                marginLeft: 60,
              }}
            />
          </View>

          <View style={styles.containerMain}>
            <Image
              source={require('../../assets/citymap.png')}
              style={{
                width: '100%',
                height: 600,
                position: 'absolute',
              }}
            />
            {this.state.isMatchedLocation ? (
              <View style={styles.locationContainer}>
                <View
                  style={{
                    marginVertical: 40,
                    backgroundColor: '#fff',
                    padding: 10,
                  }}>
                  <Text style={styles.textTitleLocationTrue}>
                    Location Matched
                  </Text>
                </View>
                <Icon name="map-marker" size={150} color="green" />
              </View>
            ) : (
              <View style={styles.locationContainer}>
                <View
                  style={{
                    marginVertical: 40,
                    backgroundColor: '#fff',
                    padding: 5,
                    borderRadius: 10,
                  }}>
                  <Text style={styles.textTitleLocationFalse}>No Location</Text>
                </View>
                <Icon name="map-marker" size={150} color="red" />

                <View
                  style={{
                    marginVertical: 30,
                    width: '80%',
                    backgroundColor: '#FFF',
                    paddingVertical: 10,
                    borderRadius: 10,
                  }}>
                  <View style={{borderBottomWidth: 1}}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        fontStyle: 'italic',
                      }}>
                      Your location
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        fontStyle: 'italic',
                        marginLeft: 20,
                      }}>
                      {this.state.currentAddress}
                    </Text>
                  </View>

                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      alignSelf: 'center',
                      fontStyle: 'italic',
                    }}>
                    Project Address
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      alignSelf: 'center',
                    }}>
                    {this.state.projectAddress}
                  </Text>
                </View>
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
        <View style={{paddingTop: 50}}>
          {/* <Text>Loading..</Text> */}
          <ActivityIndicator size={50} />
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
  },
  locationContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
  textTitleLocationTrue: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'green',
  },
  textTitleLocationFalse: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'red',
    fontStyle: 'italic',
  },
});
