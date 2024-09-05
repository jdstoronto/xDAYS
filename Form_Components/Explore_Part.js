import { TextInput, View, Text, StyleSheet } from 'react-native';
import React from 'react';
import {CheckBox, SubTitle, Title, XTextInput} from "./Form_Parts/FormParts_Index"

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
        {(props.selected != '' && props.life_math[props.selected] ) && (
          <View>
        <SubTitle title={`Why ${props.selected} ${props.life_math[props.selected]}?`} />
        <XTextInput
        height = {props.height}
        style={styles.input}
        value={props.description}
        onChangeText={props.setDescription} // Use the setter function passed as a prop
        placeholder = {`Explore`}
        />
        <SubTitle title={`Why Not ${props.selected} ${props.life_math[props.selected]}?`} />
        <XTextInput
        height = {props.height}
        style={styles.input}
        value={props.description}
        onChangeText={props.setDescription} // Use the setter function passed as a prop
        placeholder = {`Explore`}
        />
        </View>
      )}
      </View>
    )
};

export default ExploreEquation;