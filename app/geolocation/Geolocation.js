import React, {Component} from 'react';
import {View, Text} from 'react-native';
import RequestGeoLocPermission from './GeoPermission';
import Geo from '@react-native-community/geolocation';

class Geolocation extends Component {
  state = {
    coords: {},
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
          Geo.watchPosition(
            position => {
              console.log('position in cdm', position);
              this.setState(prevState => ({
                ...prevState,
                coords: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                },
              }));
            },
            error => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            {
              enableHighAccuracy: true,

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
