import { Checkbox, ScrollView, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Cell, Row, Table, TableWrapper } from 'react-native-table-component';

const CustomTable = ({
  tableHead,
  tableBody,
  hasSelection = false,
  selectionType = 'single', // "multiple" for checkboxes || "single" for radio buttons
  checkedValue = [],
  onSelect = () => null
}) => {
  const renderCell = (cell) => {
    const type = typeof cell === 'boolean' ? 'boolean' : 'text';
    switch (type) {
      case 'boolean':
        return cell ? 'Yes' : 'No';
      case 'text':
        return cell;
    }
  };

  const handleMultipleSelect = (index) => {
    const checked = [...checkedValue];
    if (checked.includes(index)) {
      checked.splice(checkedValue.indexOf(index), 1);
    } else {
      checked.push(index);
    }
    return checked;
  };

  const handleSelect = (values, isSelected) => {
    if (selectionType === 'multiple') {
      const multiplevalues = handleMultipleSelect(values);
      onSelect(multiplevalues);
    } else {
      onSelect(isSelected ? null : values);
    }
  };

  /**
   * NOTE: Checkbox passes the first column of the row as the value
   * If hasSelection is true, then the first column of the row is the id of the row, won't be considered in data
   */
  const renderSelection = (row, index) => {
    const isSelected =
      selectionType === 'multiple'
        ? checkedValue.includes(row[0])
        : checkedValue === row[0];
    return (
      <Checkbox
        colorScheme={'info'}
        accessibilityLabel="select"
        isChecked={isSelected}
        onChange={() => handleSelect(row[0], isSelected)}
      />
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Table borderStyle={styles.tableBorder}>
          <TableWrapper style={styles.wrapper}>
            {hasSelection ? (
              <TableWrapper style={{ ...styles.selectionCell, ...styles.head }}>
                <Cell data={''} />
              </TableWrapper>
            ) : (
              <></>
            )}
            <TableWrapper style={styles.container}>
              <Row
                data={tableHead}
                style={styles.head}
                textStyle={styles.headText}
              />
            </TableWrapper>
          </TableWrapper>
          {tableBody.map((row, index) => {
            return (
              <TableWrapper key={index} style={styles.wrapper}>
                {hasSelection ? (
                  <Cell
                    data={renderSelection(row, index)}
                    textStyle={styles.text}
                    width={30}
                    style={styles.checkboxCell}
                  />
                ) : (
                  <></>
                )}
                {row.slice(1).map((cell, cellIndex) => {
                  return (
                    <Cell
                      key={cellIndex}
                      data={renderCell(cell)}
                      textStyle={styles.text}
                    />
                  );
                })}
              </TableWrapper>
            );
          })}
        </Table>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  head: { backgroundColor: '#f5f5f5' },
  wrapper: { flexDirection: 'row' },
  selectionWrapper: { flexDirection: 'row', flex: 0, width: 30 },
  text: { margin: 6, color: '#000' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  tableBorder: { borderWidth: 1, borderColor: '#cacaca' },
  headText: { margin: 6, color: '#000', fontWeight: '700' },
  selectionCell: { width: 30 },
  checkboxCell: { alignItems: 'center' }
});

export default CustomTable;
