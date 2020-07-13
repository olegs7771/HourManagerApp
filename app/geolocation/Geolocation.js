import React, {Component} from 'react';
import {View, Text} from 'react-native';
import RequestGeoLocPermission from './GeoPermission';
import Geoloc from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
Geocoder.init('AIzaSyDF9BWn17CT9geI3L-Ff0ujGWwpPHmxvCQ');

class Geolocation extends Component {
  state = {
    address: '',
    plus_code: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.address !== prevState.address) {
      const payload = {
        address: this.state.address,
        plus_code: this.state.plus_code,
      };

      this.props.position(payload);
    }
  }

  async componentDidMount() {
    console.log('cdm in Geolocation first time');
    const permission = await RequestGeoLocPermission();
    console.log('premission', permission);

    //Got Permission from GeoPermission
    if (permission) {
      Geoloc.getCurrentPosition(
        position => {
          console.log('position ', position);

          //GeoDecode position
          Geocoder.from(position.coords.latitude, position.coords.longitude)
            .then(address => {
              console.log('address', address);

              this.setState(prevState => ({
                ...prevState,
                address: address.results[0].formatted_address,
                plus_code: address.plus_code.global_code.substring(8, 0),
              }));
            })
            .catch(err => {
              console.log('error to decode', err);
            });
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
      /////////

      this.watchID = Geoloc.watchPosition(
        position => {
          console.log('position in cdm', position);

          //GeoDecode position
          Geocoder.from(position.coords.latitude, position.coords.longitude)
            .then(address => {
              console.log('address in watchPosition', address);

              this.setState(prevState => ({
                ...prevState,
                address: address.results[0].formatted_address,
                plus_code: address.plus_code.global_code.substring(8, 0),
              }));
            })
            .catch(err => {
              console.log('error to decode', err);
            });
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {
          enableHighAccuracy: false,
          distanceFilter: 10,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    }
  }
  componentWillUnmount() {
    Geoloc.clearWatch(this.watchID);
  }

  render() {
    return null;
  }
}

export default Geolocation;
