import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Button from '../components/Button';

export default class Menu extends Component {
  state = {
    visible: false,
  };

  componentDidMount() {
    if (this.props.showMenu) {
      this._menu.show();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          text="Edit"
          styleCont={{
            backgroundColor: '#3d5873',
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 5,
          }}
          styleText={{fontSize: 16, fontWeight: 'normal'}}
          onPress={() => this.props.openEditModal()}
        />
        <Button
          text="Add Message"
          styleCont={{
            backgroundColor: '#3d5873',
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 5,
            marginLeft: 10,
          }}
          styleText={{fontSize: 16, fontWeight: 'normal'}}
        />

        <Button
          text="Close"
          styleCont={{
            backgroundColor: '#3d5873',
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 5,
            marginLeft: 10,
          }}
          styleText={{fontSize: 16, fontWeight: 'normal'}}
          onPress={() => this.props.closeMenu()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',

    marginRight: 30,
  },
});
