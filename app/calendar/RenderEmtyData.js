//Employee Can Manually edit checkIn and checkOut, submit explanation

import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Button from '../components/Button';
import moment from 'moment';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Menu from './Menu';
import EditItemModal from './EditItemModal';

class RenderEmtyData extends Component {
  state = {
    comment: '',
    start: '',
    end: '',

    // managerConfirmed: false,
    openModal: false,

    isMenuOpen: false,
    isConfirmed: false,
    isConfirmedManager: false,
    //this.props.message changed so we can change color of V icon
  };

  _edit = () => {
    console.log('open modal');

    this.setState({openModal: true});
  };

  _closeModal = () => {
    this.setState({
      openModal: false,
    });
  };

  _openMenu = () => {
    if (!this.state.isConfirmedManager) {
      this.setState({isMenuOpen: !this.state.isMenuOpen});
    }
  };

  _closeMenu = () => {
    this.setState({isMenuOpen: false});
  };

  render() {
    return (
      <View>
        <EditItemModal //Modal
          showModal={this.state.openModal}
          closeModal={this._closeModal}
        />
        <View style={styles.container}>
          <View style={styles.dateContainer}>
            <Text style={styles.textdate}>19</Text>
            <Text style={styles.textday}>Fri</Text>
          </View>
          <View style={styles.table}>
            <View style={styles.tableHead}>
              <View style={styles.cell}>
                <Text>Start</Text>
              </View>
              <View style={styles.cell}>
                <Text>End</Text>
              </View>
              <View style={styles.cell}>
                <Text>Notes</Text>
              </View>
            </View>
            <View style={styles.tableData}>
              <View style={styles.cell}>
                <Text>Start</Text>
              </View>
              <View style={styles.cell}>
                <Text>End</Text>
              </View>
              <View style={styles.cell}>
                <Text>Notes</Text>
              </View>
            </View>
          </View>
          <View style={styles.menu}>
            {this.state.isConfirmed ? (
              <View>
                {this.state.isConfirmedManager ? (
                  <View //V icon for confirm jobday by employy
                    style={styles.options}>
                    <Text>
                      <Icon name="check-circle" size={30} color="#087a02" />
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity //V icon for confirm jobday by employy
                    style={styles.options}
                    onPress={this._cancelConfirmation}>
                    <Text>
                      <Icon name="check" size={30} color="#087a02" />
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <TouchableOpacity //V icon for confirm jobday by employy
                style={styles.options}
                onPress={this._confirmEmployee}>
                <Text>
                  <Icon name="check" size={30} color="#717275" />
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity //open menu
              style={styles.options}
              onPress={this._openMenu}>
              {!this.state.isMenuOpen && (
                <Icon name="ellipsis-v" size={30} color="#717275" />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {this.state.isMenuOpen && (
          <Menu closeMenu={this._closeMenu} openEditModal={this._edit} /> //Control of model from Menu.js
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: 'green',
  },
  //Date Container
  dateContainer: {
    margin: 5,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  textdate: {
    fontSize: 25,
    color: '#adacac',
  },
  textday: {
    fontSize: 18,
    color: '#adacac',
    textAlign: 'center',
  },
  //Table
  table: {
    borderWidth: 1,
    borderColor: 'red',
    paddingVertical: 10,
  },
  cell: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  tableHead: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#f1f8ff',
  },
  tableData: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#FFF1C1',
  },
  //Menu
  menu: {
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  options: {
    alignSelf: 'center',
  },
});

export default RenderEmtyData;
