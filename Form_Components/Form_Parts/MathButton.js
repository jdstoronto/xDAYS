import { TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import {XTextInput} from './FormParts_Index'
import { getList } from '../Store_Form';

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
  });

  const mathMap = {
    '+':'mathAdd',
    '-':'mathSubtract',
    '*':'mathMultiply',
    '÷':'mathDivide'
  }

  async function listChange(type, value){
    let prevList = [];
    //console.log(type)
    try {
      prevList = await getList(type, `entries`, value+ '%');
      updatedItems.names = prevList;
      //setNames(nameList)
    } catch (error) {
      //console.log('failed to find other previous items with ' + value);
    }
    return prevList;
  }

const MathButton = ({title, setSelected, selected,setValue, life_math}) => {
  
  const [previousItems, setPreviousItems] = useState([]);

  const update = async (newValue) => {
    setValue((prevState) => ({
      ...prevState,  // Spread the previous state to retain existing data
      [title]: newValue
    }));
    const storedItems = await listChange(mathMap[title], newValue)
    setPreviousItems(storedItems)
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
      <XTextInput
        height= {40}
        width = '100%'
        description={life_math[title]}
        setDescription={text => update(text)}
        placeholder = {'word'}
        itemList = {previousItems}
        />
    </View>
  );
};

export default MathButton;