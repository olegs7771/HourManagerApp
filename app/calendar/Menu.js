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
          styleCont={{backgroundColor: '#3d5873', padding: 5, borderRadius: 5}}
          styleText={{fontSize: 16, fontWeight: 'normal'}}
        />
        <Button
          text="Close"
          styleCont={{
            backgroundColor: '#3d5873',
            padding: 5,
            borderRadius: 5,
            marginLeft: 10,
          }}
          styleText={{fontSize: 16, fontWeight: 'normal'}}
        />
        <Button
          text="Add Message"
          styleCont={{
            backgroundColor: '#3d5873',
            padding: 5,
            borderRadius: 5,
            marginLeft: 10,
          }}
          styleText={{fontSize: 16, fontWeight: 'normal'}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',

    marginRight: 30,
  },
});
