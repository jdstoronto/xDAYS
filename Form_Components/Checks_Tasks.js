
import { TextInput, View, Text, StyleSheet } from 'react-native';
import React, {useState} from 'react';
import {CheckBox, SubTitle, Title} from "./Form_Parts/FormParts_Index"

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
    color: '#fff',
  },
  inputname:{
    position: 'relative',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#fff',
    height: 40,
    width: '30%',
    margin: 2,
  },
  inputFor:{
    position: 'relative',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#fff',
    height: 40,
    width: '50%',
    margin: 2,
  },
  checkrow:{
    flex: 1,
    flexDirection: 'row',
  },
});

function ChecksTasks(props) {

  const [isSelected, setIsSelected] = useState(false);
  const [showPrevious, setShowPrevious] = useState(false);

  const handleCheckboxChange = () => {
    setIsSelected(!isSelected);
  };

  const handlePreviousChange = () => {
    setShowPrevious(!showPrevious);
  };


  return(
  <View>
  <Title title = {props.title} />
  {Array.from({ length: props.count }).map((_, index) => (
    <View style ={styles.checkrow}>
      <CheckBox
            isChecked={isSelected}
            onChange={handleCheckboxChange}
      />
      <TextInput
          style={styles.inputname} // Use the setter function passed as a prop
          placeholder = {`Name`}
          />
      <TextInput
          style={styles.inputFor}
          value={"props.description"}// Use the setter function passed as a prop
          placeholder = {`For`}
          />
    </View>
    ))}
  <SubTitle title='Previous' onClick = {handlePreviousChange}/>
  {showPrevious && (Array.from({ length: props.count }).map((_, index) => (
    <View style ={styles.checkrow}>
      <CheckBox
            isChecked={isSelected}
            onChange={handleCheckboxChange}
      />
      <TextInput
          style={styles.inputname} // Use the setter function passed as a prop
          placeholder = {`Name`}
          />
      <TextInput
          style={styles.inputFor}
          value={"props.description"}// Use the setter function passed as a prop
          placeholder = {`For`}
          />
    </View>
    )))}
  <SubTitle title='Future' onClick = {handlePreviousChange}/>
  {showPrevious && (Array.from({ length: props.count }).map((_, index) => (
    <View style ={styles.checkrow}>
      <CheckBox
            isChecked={isSelected}
            onChange={handleCheckboxChange}
      />
      <TextInput
          style={styles.inputname} // Use the setter function passed as a prop
          placeholder = {`Name`}
          />
      <TextInput
          style={styles.inputFor}
          value={"props.description"}// Use the setter function passed as a prop
          placeholder = {`For`}
          />
    </View>
    )))}
  </View>
  )
};

export default ChecksTasks;