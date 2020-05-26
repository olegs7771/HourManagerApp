import React, {Component} from 'react';
import {View, Text} from 'react-native';
import RequestGeoLocPermission from './GeoPermission';
import Geoloc from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
Geocoder.init('AIzaSyDF9BWn17CT9geI3L-Ff0ujGWwpPHmxvCQ');

class Geolocation extends Component {
  state = {
    address: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.address !== prevState.address) {
      if (this.state.address === this.props.projectAddress) {
        console.log('match');

        this.props.position(this.state.address);
      } else {
        console.log('not match');
        this.props.position(this.state.address);
      }
    }
  }

  async componentDidMount() {
    console.log('cdm in Geolocation first time');
    const permission = await RequestGeoLocPermission();

    //Got Permission from GeoPermission
    if (permission) {
      /////Get Current Position
      Geoloc.getCurrentPosition(
        position => {
          //GeoDecode position
          Geocoder.from(position.coords.latitude, position.coords.longitude)
            .then(address => {
              console.log('address', address);

              this.setState(prevState => ({
                ...prevState,
                address: address.results[0].address_components[1].short_name,
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

      if (this.props.projectCoords) {
        Geoloc.watchPosition(
          position => {
            console.log('position in cdm', position);

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
  }
  componentWillUnmount() {
    Geoloc.stopObserving();
  }

  render() {
    return null;
  }
}

export default Geolocation;
