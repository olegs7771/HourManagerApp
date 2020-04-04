import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
// import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';

class DashboardScreen extends Component {
  _openDrawer = () => {
    this.props.navigation.openDrawer();
    this.setState({drawerOpen: true});
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
        <View style={styles.containerMain}>
          <Text>main</Text>
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
  containerMain: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#eae6eb',
  },
});
