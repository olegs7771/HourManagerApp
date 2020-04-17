import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
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
    comment: '',
    start: '',
    end: '',
    employeeConfirmed: false,
    managerConfirmed: false,
    openModal: false,
    verified: false,
    isMenuOpen: false,
    //message coming from
    message: '',
    messageLoading: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const {item} = this.props;
    if (prevProps !== this.props) {
      this.setState({
        start: item.item.timeStart
          ? moment(item.item.timeStart).format('HH:mm')
          : '',
        end: item.item.timeEnd ? moment(item.item.timeEnd).format('HH:mm') : '',
      });
    }
    if (prevProps.messageLoading !== this.props.messageLoading) {
      this.setState({messageLoading: this.props.messageLoading});
    }
    if (prevProps.message !== this.props.message) {
      this.setState({message: this.props.message});
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

  _closeMenu = () => {
    this.setState({isMenuOpen: false});
  };

  _confirmEmployee = () => {
    //Create payload for action
    //Conver "2020-04-12T15:34:30.259Z" to "2020-04-12"
    const dateEdit = moment(this.props.item.item.date).format('YYYY-MM-DD');
    const payload = {
      date: dateEdit,
    };

    this.props.confirm(payload);
  };

  render() {
    const {
      start,
      end,
      comment,
      employeeConfirmed,
      managerConfirmed,
      verified,
    } = this.state;
    const tableHead = ['Start', 'End', 'Notes', 'Verified'];
    const tableData = [[start, end, comment, verified]];

    //Create Icon V behavior
    let iconContent;
    if (!this.state.isMenuOpen) {
      iconContent = (
        <TouchableOpacity //V icon for confirm jobday by employy
          style={styles.options}
          onPress={this._confirmEmployee}>
          <Text>
            <Icon name="check" size={30} color="#717275" />
          </Text>
        </TouchableOpacity>
      );
    }
    if (this.state.messageLoading) {
      <TouchableOpacity //V icon for confirm jobday by employy
        style={styles.options}
        onPress={this._confirmEmployee}>
        <Text>
          <ActivityIndicator size={30} />
        </Text>
      </TouchableOpacity>;
    }
    if (
      this.state.message === 'Date was confirmed' ||
      this.props.item.item.confirmEmployee
    ) {
      iconContent = (
        <TouchableOpacity //V icon for confirm jobday by employy Green
          style={styles.options}
          onPress={this._confirmEmployee}>
          <Text>
            <Icon name="check" size={30} color="#007313" />
          </Text>
        </TouchableOpacity>
      );
    }
    if (this.state.message === 'Confirmation was canceled') {
      iconContent = (
        <TouchableOpacity //V icon for confirm jobday by employy
          style={styles.options}
          onPress={this._confirmEmployee}>
          <Text>
            <Icon name="check" size={30} color="#717275" />
          </Text>
        </TouchableOpacity>
      );
    }

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
            {iconContent}

            <TouchableOpacity //open menu
              style={styles.options}
              onPress={() =>
                this.setState({isMenuOpen: !this.state.isMenuOpen})
              }>
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
  container: {flex: 1, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
  options: {
    paddingHorizontal: 20,
    paddingTop: 7,
  },
});
