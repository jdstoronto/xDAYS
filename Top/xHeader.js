import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    Dimensions
  } from 'react-native';

  const XHeader = (props) =>{ 
    return(
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../Assets/2024_08-29_X_Logo.jpg')} // Path to the image file
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.centeredText}>{props.date}</Text>
          </View>
        </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row', // Arrange items in a row
      alignItems: 'center',
      backgroundColor: '#000'
    },
    imageContainer: {
      width: 50,
      height: 50,
      marginRight: 10, // Space between image and text
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    textContainer: {
      flex: 1, // Take up the remaining space
      justifyContent: 'center',
      alignItems: 'center',
    },
    centeredText: {
      fontSize: 18,
      color: '#fff', // Set text color to black or another visible color
      textAlign: 'center',
    },
  });
  
  
  export default XHeader;