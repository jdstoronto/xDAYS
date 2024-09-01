
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
     Container: {  // Fixed spelling from 'Containter' to 'Container'
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  Tab: {
    position: 'relative',
    flexDirection: 'row',
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center', // Center content horizontally
    alignItems: 'center', // Center content vertically
    marginRight: 10, // Add some spacing between Tab and Title
  },
  Title: {
    flexDirection: 'row',
  }
  });



const SubTitle = ({title, onClick}) => {
    return (
      <View style = {styles.Containter}>
        <TouchableOpacity style={styles.Tab} onPress={onClick}>
            <Text>V</Text>
        </TouchableOpacity>
        <Text style={styles.Title}>{title}</Text>
      </View>
    );
  };

export default SubTitle;