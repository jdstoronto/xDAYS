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

  const getCurrentDate = () => {
    const today = new Date();
  
    const year = today.getFullYear().toString().slice(-2); // Get the last two digits of the year
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
    const day = today.getDate().toString().padStart(2, '0'); // Add leading zero if needed
  
    return `${year}-${month}-${day}`;
  };

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
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      position: 'absolute', // Allows overlapping with other views
      top: 0,
      left: 0,
      width: 50, // Set your image width
      height: 50, // Set your image height
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    textContainer: {
      position: 'absolute', // Allows overlapping with other views
      justifyContent: 'center',
      alignItems: 'center',
      width: Dimensions.get('window').width, // Full width of the screen
      height: Dimensions.get('window').height, // Full height of the screen
    },
    centeredText: {
      fontSize: 18,
      color: '#fff', // Set text color for visibility over the image
      textAlign: 'center',
    },
  });
  
  export default XHeader;