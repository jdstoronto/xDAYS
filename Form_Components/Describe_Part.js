
import { TextInput, View, Text, StyleSheet } from 'react-native';
import React from 'react';

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

function Describe(props)  {

    return(
      <View>
        <Text style={styles.highlight}>{props.title}</Text>
        <TextInput
        style={styles.input}
        value={props.description}
        onChangeText={props.setDescription} // Use the setter function passed as a prop
        placeholder = {`How was your ${props.title}`}
        />
      </View>
    )
};

export default Describe;