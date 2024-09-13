
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  input:{
    borderWidth: 2,
    borderColor: '#fff',
    color: '#fff',
    textAlignVertical: 'top',
    padding: 10,
    fontFamily: 'courier',
  }
  });

const XTextInput = (props) => {
    return (
        <TextInput
        height = {props.height}
        style={[styles.input, {height : props.height}]}
        value={props.description}
        multiline={true}
        onChangeText={props.setDescription} // Use the setter function passed as a prop
        placeholder = {props.placeholder}
        />
    );
  };

export default XTextInput;