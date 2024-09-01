
import { TextInput, View, Text, StyleSheet } from 'react-native';
import React, {useState} from 'react';
import CheckBox from './Form_Parts/Checkbox';
import SubTitle from './Form_Parts/SubTitle';

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

function ChecksThanks(props) {

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
  < Text style={styles.highlight}>{props.title}</Text>
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
  </View>
  )
};

export default ChecksThanks;