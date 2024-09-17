
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
    Title: {
        fontStyle: '',
        fontWeight: 'bold',
        color: '#fff',
        flexDirection: 'row',
        marginTop: 2,
        marginBottom: 2,
        fontFamily:"monospace",
        fontSize: 15,
    }
  });



const Title = ({title}) => {
    return (
        <Text style={styles.Title}>{title}</Text>
    );
  };

export default Title;