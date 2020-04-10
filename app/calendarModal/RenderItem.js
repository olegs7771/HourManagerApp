import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import moment from 'moment';

class RenderItem extends Component {
  render() {
    const {item} = this.props;
    return (
      <View style={styles.containerItem}>
        <View>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            Start: {moment(item.item.timeStart).format('HH:mm')}
          </Text>
        </View>
        <View>
          {item.item.timeEnd && (
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              End:{moment(item.item.timeEnd).format('HH:mm')}
            </Text>
          )}
        </View>
      </View>
    );
  }
}

export default RenderItem;

const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
});
