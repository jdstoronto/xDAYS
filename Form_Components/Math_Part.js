
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
  return(
    <View>
      <Title title = {props.title} />
      <View style = {styles.Container}>
        <MathButton title = '+'/>
        <MathButton title = '-'/>
        <MathButton title = '*'/>
        <MathButton title = '÷'/>
      </View>
    </View>
  )
  };

export default Life_Mathematics;