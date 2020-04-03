import React, {Component} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';

import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

class DashboardScreen extends Component {
  state = {
    drawerOpen: false,
  };

  _openDrawer = () => {
    this.props.navigation.openDrawer();
    this.setState({drawerOpen: true});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerButton}>
          <View style={styles.containerIconDrawerClosed}>
            <Icon name="bars" size={50} onPress={this._openDrawer} />
          </View>
        </View>
      </View>
    );
  }
}

export default connect()(DashboardScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
  },
  //Move Menu icon If Drawer open
  containerIconDrawerClosed: {
    borderWidth: 1,
    paddingLeft: 20,
    paddingTop: 10,
  },

  containerButton: {
    alignContent: 'center',
  },
});
