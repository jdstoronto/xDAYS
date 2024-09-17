
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const styles = StyleSheet.create({
  input:{
    color: '#fff',
    textAlignVertical: 'top',
    fontFamily: 'ds-digi',
    fontSize: 20,
    padding: 10,
  },
  deleteInput:{
    color: 'black',
    textAlignVertical: 'top',
    fontFamily: 'ds-digi',
    fontSize: 20,
    padding: 10,
  },
  touch:{
    position: 'relative',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#fff',
    margin: 2,
  },
  deleteTouch:{
    position: 'relative',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#fff',
    margin: 2,
    backgroundColor: 'red'
  },
  });



const XTextInput = (props) => {
  const [deleteActivated, setDeleteActivated] = useState(false)

    const toggleDelete = () => {
      setDeleteActivated(!deleteActivated);
    }
    return (
      <TouchableOpacity style={[deleteActivated ? styles.deleteTouch: styles.touch, 
      {height : props.height, width: props.width, flex: props.flex}]}
      onLongPress={toggleDelete}>
        {deleteActivated ? ( 
        <Text style = {styles.deleteInput}>DELETE</Text>
        ):(
          <TextInput
          style = {styles.input}
          value={props.description}
          multiline={true}
          onChangeText={props.setDescription} // Use the setter function passed as a prop
          placeholder = {props.placeholder}
          />
        )
      }
      </TouchableOpacity>
    );
  };

export default XTextInput;