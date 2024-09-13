import { TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
    Container: {  // Fixed spelling from 'Containter' to 'Container'
        flex: 1,
        alignItems: 'center',
        width: "50%",
        margin: 3,
    },
    Button: {
        position: 'relative',
        width: 40,
        height: 40,
        justifyContent: 'center', // Center content horizontally
        alignItems: 'center', // Center content vertically
        margin:5,
        color: 'white',
    },
    ButtonSelected: {
      backgroundColor:'white',
    },
    Title: {
        fontSize: 30,
        fontWeight: '900',
        color:'white',
    },
    TitleSelected: {
      color:'black'
  },
    inputname:{
      position: 'relative',
      flexDirection: 'row',
      borderWidth: 2,
      borderColor: '#fff',
      height: 40,
      width: '100%',
      margin: 2,
      fontFamily: 'courier',
    },
  });


const MathButton = ({title, setSelected, selected,setValue, life_math}) => {

  const update = (newValue) => {
    setValue((prevState) => ({
      ...prevState,  // Spread the previous state to retain existing data
      [title]: newValue
    }));
  };

  const pressed = () =>{
    if (title == selected){
      setSelected('')
    }else{
      setSelected(title)
    }
    
  }

  return (
    <View style = {styles.Container}>
      <TouchableOpacity style={[styles.Button, title == selected && styles.ButtonSelected]} onPress={pressed}>
          <Text style ={[styles.Title, title == selected && styles.TitleSelected]}>{title}</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.inputname} // Use the setter function passed as a prop
        placeholder = {'word'}
        value={life_math[title]}
        onChangeText={update}
        />
    </View>
  );
};

export default MathButton;