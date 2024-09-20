import React, { useState } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    Dimensions,
    TouchableOpacity
  } from 'react-native';

  import XDropDown from './xDropDown';

  const XHeader = ({date, handleClear, handleRefresh, handleUpdate}) => {
    const [showDropDown, setShowDropDown] = useState(false)

    const toggleShowDropDown = () => {
      setShowDropDown(!showDropDown);
    }

    return (
      <View>
        <View style={styles.container}>
          <TouchableOpacity onPress={toggleShowDropDown}>
            <Image
              source={require('../assets/2024_08-29_X_Logo.jpg')} // Path to the image file
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.centeredText}>{date}</Text>
        </View>
        {showDropDown && <XDropDown  
        handleClear = {handleClear}
        handleRefresh = {handleRefresh}
        handleUpdate = {handleUpdate}/>}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
      height: 50,
    },
    centeredText: {
      fontSize: 18,
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: 'monospace',
    },
    image: {
      position: 'absolute',
      width: 50,
      height: 50,
      resizeMode: 'cover',
      top: 0,  // Position the image in the top-right corner
      left: 0, // Adjust as needed for different corners
    },
  });
  
  
  export default XHeader;