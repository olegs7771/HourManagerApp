//Employee Can Manually edit checkIn and checkOut, submit explanation

import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import moment from 'moment';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Menu from './Menu';
import EditItemModal from './EditItemModal';
import {
  Table,
  Row,
  Rows,
  TableWrapper,
  Cell,
} from 'react-native-table-component';

class RenderEmtyData extends Component {
  state = {
    comment: '',
    start: '00:00',
    end: '00:00',

    // managerConfirmed: false,
    openModal: false,
    comments: '',

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
    const {
      start,
      end,
      comment,
      // employeeConfirmed,
      // managerConfirmed,
    } = this.state;
    const tableHead = ['Start', 'End', 'Notes'];
    const tableData = [[start, end, comment]];
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
          }}>
          <View style={styles.dateContainer}>
            <Text style={styles.textdate}>19</Text>
            <Text style={styles.textday}>Fri</Text>
          </View>
          <View style={styles.container}>
            <EditItemModal
              showModal={this.state.openModal}
              closeModal={this._closeModal}
              currentDate={this.props.currentDate}
              selectedDate={this.props.selectedDay}
              navigation={this.props.navigation}
            />
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
              <Row
                data={tableHead}
                style={styles.head}
                textStyle={styles.text}
              />
              <Rows data={tableData} textStyle={styles.text} />
            </Table>
          </View>
          <View>
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
        <View style={{height: 35}}>
          {this.state.isMenuOpen && (
            <Menu closeMenu={this._closeMenu} openEditModal={this._edit} /> //Control of model from Menu.js
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // //Date Container
  dateContainer: {
    margin: 5,
    paddingHorizontal: 10,
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

  container: {flex: 1, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
  options: {
    paddingHorizontal: 20,
    paddingTop: 7,
  },
});

export default RenderEmtyData;
