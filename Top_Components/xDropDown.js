import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
  } from 'react-native';

  const XDropDown = ({handleClear, handleRefresh, handleUpdate}) => {
    return (
      <View style={{zIndex:1}}>
        <XDropDownItem name = 'Refresh' onPress = {handleRefresh}/>
        <XDropDownItem name = 'Update' onPress = {handleUpdate}/>
        <XDropDownItem name = 'Clear' onPress = {handleClear}/>
      </View>
    );
  };
  

  const XDropDownItem = ({name, onPress}) => {
    return (
      <View >
        <TouchableOpacity onPress={onPress}>
          <Text>{name}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default XDropDown;