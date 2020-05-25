import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {connect} from 'react-redux';
import {getProject} from '../../store/actions/jobdayAction';
import Button from '../components/Button';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Geolocation from '../geolocation/Geolocation';

class DashboardScreen extends Component {
  state = {
    projectAddress: null,
  };
  componentDidMount() {
    if (this.props.project) {
      this.setState({projectAddress: this.props.project.address});
    }

    this.props.getProject();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.project == !this.props.project) {
      console.log('project updated');

      if (this.props.project) {
        this.setState({projectAddress: this.props.project.address});
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
  _showAddress = data => {
    console.log('_showAddress data dashboard', data);
  };

  render() {
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
        <View style={styles.containerMain} />
        <Geolocation //Get Current Coords
          projectCoords={this.state.projectCoords}
          projectAddress={this.state.projectAddress}
          getGeoStatus={this._geoStatus}
          position={this._showAddress}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  project: state.project.project,
});

export default connect(
  mapStateToProps,
  {getProject},
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#eae6eb',
  },
});
