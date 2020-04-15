import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
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
    start: '',
    end: '',
    message: '',
    employeeConfirmed: false,
    managerConfirmed: false,
    openModal: false,
    verified: false,
    openMenu: false,
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

  render() {
    const button = (data, index) => (
      <Button
        text="Edit"
        styleText={{fontSize: 14, textAlign: 'center'}}
        styleCont={{backgroundColor: '#383834'}}
        onPress={this._edit}
      />
    );

    const {
      start,
      end,
      message,
      employeeConfirmed,
      managerConfirmed,
      verified,
    } = this.state;
    const tableHead = ['Start', 'End', 'Notes', 'Verified'];
    const tableData = [[start, end, message, verified]];

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
          <TouchableOpacity
            style={styles.options}
            onPress={() => this.setState({openMenu: !this.state.openMenu})}>
            {!this.state.openMenu && (
              <Icon name="ellipsis-v" size={30} color="#717275" />
            )}
          </TouchableOpacity>
        </View>
        {this.state.openMenu && <Menu />}
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
    paddingHorizontal: 15,
    paddingTop: 45,
  },
});
