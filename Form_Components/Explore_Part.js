import { TextInput, View, Text, StyleSheet } from 'react-native';
import React from 'react';
import {CheckBox, SubTitle, Title} from "./Form_Parts/FormParts_Index"

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
    color: '#fff'
  },
  input:{
    
    borderWidth: 2,
    borderColor: '#fff',
  }
});

function ExploreEquation(props)  {

    return(
      <View>
        <Title title = {props.title} />
        <SubTitle title={'Why?'} />
        <TextInput
        style={styles.input}
        value={props.description}
        onChangeText={props.setDescription} // Use the setter function passed as a prop
        placeholder = {`How was your ${props.title}`}
        />
        <SubTitle title={'Why Not?'} />
        <TextInput
        style={styles.input}
        value={props.description}
        onChangeText={props.setDescription} // Use the setter function passed as a prop
        placeholder = {`How was your ${props.title}`}
        />
      </View>
    )
};

export default ExploreEquation;