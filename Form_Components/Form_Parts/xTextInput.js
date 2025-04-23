import { TextInput, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';

const styles = StyleSheet.create({
  input: {
    position: 'relative',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#fff',
    color: '#fff',
    textAlignVertical: 'top',
    padding: 10,
    fontFamily: 'courier',
    margin: 2,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: '#fff',
    zIndex: 4,
    width: '100%',
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#666',
  },
  dropdownText: {
    color: '#fff',
  },
});

const XTextInput = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setShowDropdown(props.itemList != null && props.itemList.length > 0 && !selected);
    console.log(props.itemList)
  }, [props.itemList]);

  //console.log(showDropdown)

  return (
    <View style={{ width: props.width, flex: props.flex, margin: 2,position: 'relative'}}>
      <TextInput
        height={props.height}
        style={[styles.input, { height: props.height }]}
        value={props.description}
        multiline={true}
        onChangeText={(text) => {
          setSelected(false);         // reset selected state
          props.setDescription(text); // update the description
        }}        
        placeholder={props.placeholder}
        placeholderTextColor="#aaa"
      />

      {showDropdown && (
        <View style={styles.dropdown}>
          <FlatList
            data={props.itemList}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  props.setDescription(item);
                  setSelected(true);
                }}
              >
                <Text style={styles.dropdownText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default XTextInput;