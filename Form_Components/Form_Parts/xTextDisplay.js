import React, { useRef } from 'react';
import { View, Text, StyleSheet, Alert, PanResponder } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#fff',
    color: '#fff',
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
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 20,
      onPanResponderRelease: (_, gestureState) => {
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
      style={[styles.container, { height: props.height, width: props.width, flex: props.flex }]}
      {...panResponder.panHandlers}
    >
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

export default XTextDisplay;
