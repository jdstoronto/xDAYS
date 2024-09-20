import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
  } from 'react-native';

  const XDropDown = ({handleClear, handleRefresh, handleUpdate}) => {
    return (
      <View style={{zIndex:2, position:'absolute', top:50, backgroundColor:'black'}}>
        <XDropDownItem name = 'Update' onPress = {handleUpdate}/>
        <XDropDownItem name = 'Clear' onPress = {handleClear}/>
        <XDropDownItem name = 'Refresh' onPress = {handleRefresh}/>
      </View>
    );
  };
  

  const XDropDownItem = ({name, onPress}) => {
    return (
      <View >
        <TouchableOpacity onPress={onPress} style={styles.dropContainer}>
          <Text style={styles.dropText}>{name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
    dropContainer: {
      margin: 5,
      color: 'white',
      fontFamily: 'digi',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor:'white',
      borderWidth: 1,
    },
    dropText:{
      color: 'white',
      fontFamily: 'ds-digi',
      fontSize: 20,
      padding: 3,
    }
  
  });
  
  export default XDropDown;