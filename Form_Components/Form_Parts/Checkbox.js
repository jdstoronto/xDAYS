
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    checkedCheckbox: {
    },
    futureCheckbox: {
      borderWidth: 0,
    },
    checkmark: {
      color: '#fff',
      fontSize: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: -2,
    },
  });



const CheckBox = ({status, onChange, onHold }) => {
    return (
      <TouchableOpacity style={styles.checkboxContainer} onPress={onChange} onLongPress={onHold}>
        <View style={[styles.checkbox, status == 'Completed' && styles.checkedCheckbox, status == 'Future' && styles.futureCheckbox]}>
          {status == 'Completed' && <Text style={styles.checkmark}>■</Text>}
          {status == 'Future' && <Text style={styles.checkmark}>~</Text>}
        </View>
      </TouchableOpacity>
    );
  };



export default CheckBox;