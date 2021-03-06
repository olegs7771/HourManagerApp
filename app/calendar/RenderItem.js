import React, {Component} from 'react';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Button from '../components/Button';
import moment from 'moment';
import {
  Table,
  Row,
  Rows,
  TableWrapper,
  Cell,
} from 'react-native-table-component';
import EditItemModal from './EditItemModal';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Menu from './Menu';

class RenderItem extends Component {
  state = {
    comment: false,
    start: '',
    end: '',
    //Local error
    error: '',
    // managerConfirmed: false,
    openModal: false,

    isMenuOpen: false,
    isConfirmedEmployee: false,
    isConfirmedManager: false,
    //this.props.message changed so we can change color of V icon
  };
  componentDidUpdate(prevProps, prevState) {
    const {item} = this.props;
    if (prevProps !== this.props) {
      this.setState({
        start: item.item.timeStart
          ? moment(item.item.timeStart).format('HH:mm')
          : '',
        end: item.item.timeEnd ? moment(item.item.timeEnd).format('HH:mm') : '',
        comment: item.item.messages.length > 0 ? true : false,
      });
    }
  }
  componentDidMount() {
    console.log('cdm this.props', this.props);

    if (this.props.item) {
      const {item} = this.props;
      this.setState({
        start: item.item.timeStart
          ? moment(item.item.timeStart).format('HH:mm')
          : '',
        end: item.item.timeEnd ? moment(item.item.timeEnd).format('HH:mm') : '',
        comment: item.item.messages.length > 0 ? true : false,
      });
    }

    // this.setState({isConfirmedManager: this.props.item.item.confirmManager});
  }
  componentDidUpdate(prevProps, prevState) {
    const {item} = this.props;
    if (prevProps.item !== this.props.item) {
      if (item) {
        this.setState({
          isConfirmedEmployee: item.item.confirmEmployee,
          isConfirmedManager: item.item.confirmManager,
          start: item.item.timeStart
            ? moment(item.item.timeStart).format('HH:mm')
            : '',
          end: item.item.timeEnd
            ? moment(item.item.timeEnd).format('HH:mm')
            : '',
          comment: item.item.message ? true : false,
        });
      }
    }
  }

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
    if (!this.props.item.item.confirmManager) {
      this.setState({isMenuOpen: !this.state.isMenuOpen});
    }
  };

  _closeMenu = () => {
    this.setState({isMenuOpen: false});
  };

  _confirmEmployee = () => {
    console.log('this.state.start.length', this.state.start.length);

    //Only if Start End pair exists
    if (this.state.start.length !== 5) {
      return this.setState({start: 'No Time Set!'});
    }
    if (this.state.end.length !== 5) {
      return this.setState({end: 'No Time Set!'});
    }

    //Create payload for action
    //Convert "2020-04-12T15:34:30.259Z" to "2020-04-12"
    const dateEdit = moment(this.props.item.item.date).format('YYYY-MM-DD');
    const payload = {
      date: dateEdit,
    };
    this.props.confirm(payload);
    this.setState({
      isConfirmedEmployee: true,
    });
  };
  _cancelConfirmation = () => {
    this.setState({
      isConfirmedEmployee: false,
    });
    //Create payload for action
    //Conver "2020-04-12T15:34:30.259Z" to "2020-04-12"
    const dateEdit = moment(this.props.item.item.date).format('YYYY-MM-DD');
    const payload = {
      date: dateEdit,
    };
    this.props.confirm(payload);
  };

  render() {
    const {start, end} = this.state;
    //if item has message
    //show employee that is been sent to manager
    const commentBoolen = this.state.comment
      ? `${this.props.item.item.messages.length} comments been sents `
      : 'No Comments';

    const tableHead = ['Start', 'End', 'Comment'];
    const tableData = [[start, end, commentBoolen]];

    // Create Icon V behavior

    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
          }}>
          <View style={styles.container}>
            <EditItemModal
              showModal={this.state.openModal}
              closeModal={this._closeModal}
              item={this.props.item.item}
              //time pair to show in EditStartTime && EditEndTime
              start={this.state.start}
              end={this.state.end}
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
            {this.state.isConfirmedEmployee ||
            this.props.item.item.confirmEmployee ? (
              <View>
                {this.state.isConfirmedManager ? (
                  <View //V icon for confirm jobday by employy
                    style={{paddingLeft: 10}}>
                    <Text>
                      <Icon name="check-circle" size={30} color="#087a02" />
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity //V icon for confirm jobday by emplo
                    style={{paddingLeft: 7}}
                    onPress={this._cancelConfirmation}>
                    <Text>
                      <Icon name="check" size={30} color="#087a02" />
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <TouchableOpacity //V icon for confirm jobday by employy
                style={{paddingLeft: 7}}
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

export default RenderItem;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', marginLeft: -10},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
  options: {
    paddingTop: 7,
    marginLeft: 10,
  },
});
