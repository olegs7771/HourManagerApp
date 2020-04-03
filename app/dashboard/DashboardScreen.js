import React, {Component} from 'react';
import {Text, View, Button, StyleSheet, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

class DashboardScreen extends Component {
  _openDrawer = () => {
    this.props.navigation.openDrawer();
    this.setState({drawerOpen: true});
  };

  render() {
    return (
      <View style={styles.container}>
        <View></View>

        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.containerIconDrawerClosed}>
            <Icon name="bars" size={50} onPress={this._openDrawer} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect()(DashboardScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  //Move Menu icon If Drawer open
  containerIconDrawerClosed: {
    paddingLeft: 20,
    paddingTop: 10,
  },

  containerButton: {
    alignContent: 'center',
  },
});
