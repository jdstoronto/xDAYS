import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert, PanResponder } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    textAlignVertical: 'center',
    padding: 10,
    fontFamily: 'courier',
    margin: 2,
  },
  text: {
    color: '#fff',
    flex: 1,
  },
});

const XTextDisplay = (props) => {
  const [bgColor, setBgColor] = useState('transparent');

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 20,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < -20) {
          setBgColor('red');
        } else {
          setBgColor('transparent');
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        setBgColor('transparent');
        if (gestureState.dx < -50) {
          Alert.alert('Delete Item', 'Do you want to remove this item?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => props.onDelete && props.onDelete() },
          ]);
        }
      },
    })
  ).current;

  return (
    <View
      style={[styles.container, { height: props.height, width: props.width, flex: props.flex, backgroundColor: bgColor }]}
      {...panResponder.panHandlers}
    >
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

export default XTextDisplay;

