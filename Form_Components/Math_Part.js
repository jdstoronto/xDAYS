
import { TextInput, View, Text, StyleSheet } from 'react-native';
import React from 'react';
import {CheckBox, SubTitle, Title, MathButton} from "./Form_Parts/FormParts_Index"

const styles = StyleSheet.create({
  Container: {  // Fixed spelling from 'Containter' to 'Container'
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
},
});


function Life_Mathematics(props){
  const getKeys = () => {
    return Object.keys(props.life_math);  // Returns an array of keys ['name', 'age', 'location']
  };

  return(
    <View>
      <Title title = {props.title} />
      <View style = {styles.Container}>
        <MathButton title = {getKeys()[0]}  setSelected={props.setSelected} selected={props.selected} setValue={props.setValue} life_math={props.life_math}/>
        <MathButton title = {getKeys()[1]}  setSelected={props.setSelected} selected={props.selected} setValue={props.setValue} life_math={props.life_math}/>
      </View>
      <View style = {styles.Container}>
        <MathButton title = {getKeys()[2]} setSelected={props.setSelected} selected={props.selected} setValue={props.setValue} life_math={props.life_math}/>
        <MathButton title = {getKeys()[3]} setSelected={props.setSelected} selected={props.selected} setValue={props.setValue} life_math={props.life_math}/>
      </View>
    </View>
  )
  };

export default Life_Mathematics;