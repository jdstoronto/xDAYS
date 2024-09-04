
import { TextInput, View, Text, StyleSheet } from 'react-native';
import React from 'react';
import {CheckBox, SubTitle, Title, XTextInput} from "./Form_Parts/FormParts_Index"

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
    color: '#fff'
  },
});

function Describe(props)  {

    return(
      <View>
        <Title title = {props.title} />
        <XTextInput
        height = {props.height}
        title ={props.title}
        description={props.description}
        setDescription={props.setDescription}
        placeholder = {`How was your ${props.title}`}
        />
      </View>
    )
};

export default Describe;