
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
    checkmark: {
      color: '#fff',
      fontSize: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });



const CheckBox = ({isChecked, onChange }) => {
    return (
      <TouchableOpacity style={styles.checkboxContainer} onPress={onChange}>
        <View style={[styles.checkbox, isChecked && styles.checkedCheckbox]}>
          {isChecked && <Text style={styles.checkmark}>x</Text>}
        </View>
      </TouchableOpacity>
    );
  };



export default CheckBox;