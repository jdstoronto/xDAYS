
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
    Title: {
        fontWeight: '700',
        color: '#fff',
        flexDirection: 'row',
    }
  });



const Title = ({title}) => {
    return (
        <Text style={styles.Title}>{title}</Text>
    );
  };

export default Title;