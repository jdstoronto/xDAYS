
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
  inputedname:{
    position: 'relative',
    flexDirection: 'row',
    height: 25,
    width: '30%',
    margin: 2,
    justifyContent: 'center',
    alignContent: 'center',
    textAlignVertical: 'center',
  },
  inputFor:{
    position: 'relative',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#fff',
    height: 40,
    width: '50%',
    margin: 2,
    flex:1,
  },
  inputed:{
    position: 'relative',
    flexDirection: 'row',
    height: 25,
    width: '50%',
    margin: 2,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    textAlignVertical: 'center',
  },
  checkrow:{
    flex: 1,
    flexDirection: 'row',
  },
});

function checkboxChange(previous, index){
  const updatedItems = previous;
  // Update the specific item at the given index
  if (updatedItems[index].status == '' && updatedItems[index].status != 'Future'){
    updatedItems[index].status = 'Completed';}
  else if(updatedItems[index].status != 'Future'){
    updatedItems[index].status = '';
  }
  updatedItems[index].id = Date.now();
  return updatedItems;
}

function futureCheckChange(previous, index){
  const updatedItems = previous;
  // Update the specific item at the given index
  if (updatedItems[index].status == 'Future'){
    updatedItems[index].status = '';}
  else{
    updatedItems[index].status = 'Future';
  }
  updatedItems[index].id = Date.now();
  return updatedItems;  // Return the updated array
}

function propertyChange(previous, index, name, value){
  const updatedItems = previous;
  updatedItems[index][name] = value;
  updatedItems[index].id = Date.now();
  return updatedItems;  // Return the updated array
}

function ChecksThanks(props) {

  const [showPrevious, setShowPrevious] = useState(false);

  const handleCheckboxChange = (index) => {
    props.setValue((prevItems) => {
      return checkboxChange([...prevItems], index);  // Return the updated array
    });
  };

  const handlePreviousCheckboxChange = (index) => {
    props.updatePrevious((prevItems) => {
      return checkboxChange([...prevItems], index);  // Return the updated array
    });
  };

  const handlePropertyChange = (index, name, value) => {
    props.setValue((prevItems) => {
      return checkboxChange([...prevItems], index, name, value);  // Return the updated array
    });
  };

  const handleShowPrevious = () => {
    setShowPrevious(!showPrevious);
  };

  const createEmptyTasks = () =>{
    const tasks = []
    for (let i = 0; i < props.count; i++) {
      const element = {
        status:'',
        thanks:'',
        name:'',
        id: Date.now(),
      };
      tasks.push(element)
    }
    return tasks
  }

  if (props.value.length !== props.count) {
    props.setValue(createEmptyTasks());  // This will be a future issue if i want to add tasks
  }

  return(
  <View>
  <Title title = {props.title} />
  {Array.from(props.value).map((value, index) => (
    <View style ={styles.checkrow}>
      <CheckBox
            isChecked={value.status}
            onChange={() => handleCheckboxChange(index)}
      />
      <TextInput
          style={styles.inputname} // Use the setter function passed as a prop
          placeholder = {`Name`}
          value={value.name}
          onChangeText={text => handlePropertyChange(index,'name',text)}
          />
      <TextInput
          style={styles.inputFor}
          placeholder = {`Thank You..`}
          value={value.thanks}
          onChangeText={text => handlePropertyChange(index,'thanks',text)}
          />
    </View>
    ))}
  <SubTitle title='Previous' onClick = {handleShowPrevious}/>
  {showPrevious && (Array.from(props.previousThanks).map((value, index) => (
    <View style ={styles.checkrow}>
      <CheckBox
            isChecked={value.status}
            onChange={() => handlePreviousCheckboxChange(index)}
      />
      <Text style={styles.inputedname}> // Use the setter function passed as a prop
        {value.name}
      </Text>
      <Text style={styles.inputed}>
        {value.thanks}
      </Text>
    </View>
    )))}
  </View>
  )
};

export default ChecksThanks;