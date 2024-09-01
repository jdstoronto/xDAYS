import { TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
    Container: {  // Fixed spelling from 'Containter' to 'Container'
        flex: 1,
        alignItems: 'center',
        width: "50%",
    },
    Tab: {
        position: 'relative',
        width: 40,
        height: 40,
        justifyContent: 'center', // Center content horizontally
        alignItems: 'center', // Center content vertically
        marginRight: 10, // Add some spacing between Tab and Title
    },
    Title: {
        fontSize: 30,
        fontWeight: '900',
        color: '#fff'
    },
    inputname:{
      position: 'relative',
      flexDirection: 'row',
      borderWidth: 2,
      borderColor: '#fff',
      height: 40,
      width: '100%',
      margin: 2,
    },
  });

const MathButton = ({title, onClick}) => {
    return (
      <View style = {styles.Container}>
        <TouchableOpacity style={styles.Tab} onPress={onClick}>
            <Text style ={styles.Title}>{title}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.inputname} // Use the setter function passed as a prop
          placeholder = {`Word`}
          />
      </View>
    );
  };

export default MathButton;