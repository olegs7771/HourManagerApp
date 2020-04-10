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
const m = moment();

class RenderItem extends Component {
  state = {
    start: '',
    end: '',
    message: '',
    employeeConfirmed: false,
    managerConfirmed: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const {item} = this.props;
    if (prevProps !== this.props) {
      this.setState({start: item.item.timeStart, end: item.item.timeEnd});
    }
  }
  _submit = () => {
    console.log('sumitted');
  };

  render() {
    const button = (data, index) => (
      <Button text="Submit" styleText={{fontSize: 14}} onPress={this._submit} />
    );

    const {
      start,
      end,
      message,
      employeeConfirmed,
      managerConfirmed,
    } = this.state;
    const tableHead = ['Start', 'End', 'Message', 'Cheacked'];
    const tableData = [
      [
        moment(start).format('HH:hh'),
        moment(end).format('HH:hh'),
        message,
        employeeConfirmed,
      ],
    ];

    return (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          {tableData.map((rowData, index) => (
            <TableWrapper key={index} style={styles.row}>
              {rowData.map((cellData, cellIndex) => (
                <Cell
                  key={cellIndex}
                  data={cellIndex === 3 ? button(cellData, index) : cellData}
                  textStyle={styles.text}
                />
              ))}
            </TableWrapper>
          ))}
        </Table>
      </View>
    );
  }
}

export default RenderItem;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
});
