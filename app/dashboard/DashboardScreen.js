import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {connect} from 'react-redux';
import {getProject, getLocationMatch} from '../../store/actions/jobdayAction';
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
    if (this.state.currentAddress !== prevState.currentAddress) {
      console.log('currentAddres updated');
    }
  }

  _openDrawer = () => {
    this.props.navigation.openDrawer();
    this.setState({drawerOpen: true});
  };
  _geoStatus = data => {
    console.log('data in dashboard ', data);
  };
  _showAddress = data => {
    console.log('_showAddress data dashboard', data);

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
                <Text>Location Matched</Text>
                <Text>Current Address:{this.state.currentAddress}</Text>
                <Text>Project Address:{this.state.projectAddress}</Text>
              </View>
            ) : (
              <View style={styles.locationContainer}>
                <Text>Location Not Matched</Text>
                <Text>Current Address:{this.state.currentAddress}</Text>
                <Text>Project Address:{this.state.projectAddress}</Text>
              </View>
            )}
          </View>
          <Geolocation //Get Current Coords
            getGeoStatus={this._geoStatus}
            position={this._showAddress}
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
});

export default connect(
  mapStateToProps,
  {getProject, getLocationMatch},
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
  },
});
