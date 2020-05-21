import React, {Component} from 'react';
import {View, Text} from 'react-native';
import RequestGeoLocPermission from './GeoPermission';
// import Geo from '@react-native-community/geolocation';
import Geoloc from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
Geocoder.init('AIzaSyDF9BWn17CT9geI3L-Ff0ujGWwpPHmxvCQ');

class Geolocation extends Component {
  state = {
    coords: {},
    address: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.projectCoords !== prevProps.projectCoords) {
      if (this.props.projectCoords)
        console.log('this.props.projectCoords', this.props.projectCoords);
    }
    if (this.state.coords !== prevState.coords) {
      if (this.state.coords === this.props.projectCoords) {
        console.log('match');
        this.props.getGeoStatus({matched: true});
        this.props.geoCoords(this.state.coords);
      } else {
        console.log('not matched');
        this.props.getGeoStatus({matched: false});
        this.props.geoCoords(this.state.coords);
      }
    }
  }

  componentDidMount() {
    RequestGeoLocPermission().then(permission => {
      //Got Permission from GeoPermission
      if (permission) {
        if (this.props.projectCoords) {
          Geoloc.watchPosition(
            position => {
              console.log('position in cdm', position);
              this.setState(prevState => ({
                ...prevState,
                coords: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                },
              }));
              //GeoDecode position
              Geocoder.from(position.coords.latitude, position.coords.longitude)
                .then(address => {
                  console.log('address', address);
                  this.setState(prevState => ({
                    ...prevState,
                    address: address.results[0].formatted_address,
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
    });
  }

  render() {
    return null;
  }
}

export default Geolocation;
