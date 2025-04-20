
import { TextInput, View, Text, StyleSheet } from 'react-native';
import React, {useState, useEffect} from 'react';
import {CheckBox, SubTitle, Title, XTextInput} from "./Form_Parts/FormParts_Index"

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
    color: '#fff',
  },
  
  inputed:{
    position: 'relative',
    flexDirection: 'row',
    minHeight: 25,
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
      updatedItems[index].updateTime = Date.now();
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
  updatedItems[index].updateTime = Date.now();
  return updatedItems;  // Return the updated array
}

function ChecksTasks(props) {

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

  const handleFutureCheckboxChange = (index) => {
    props.updateFuture((prevItems) => {
      return checkboxChange([...prevItems], index);  // Return the updated array
    });
  };

  const handleFuture = (index) =>{ 
    props.setValue((prevItems) => {
      return futureCheckChange([...prevItems], index);  // Return the updated array
    });

  }

  const handlePreviousFuture = (index) =>{ 
    props.updatePrevious((prevItems) => {
      return futureCheckChange([...prevItems], index);  // Return the updated array
    });

  }

  const changeFuture = (index) =>{ 
    props.updateFuture((prevItems) => {
      return futureCheckChange([...prevItems], index);  // Return the updated array
    });

  }

  const handleShowPrevious = (index) => {
    setShowPrevious(!showPrevious);
  };

  const handleTask = (newValue, index) =>{
    props.setValue((prevItems) => {
      // Create a copy of the array
      const updatedItems = [...prevItems];
      // Update the specific item at the given index
      updatedItems[index].task = newValue;
      updatedItems[index].id = Date.now();
      return updatedItems;  // Return the updated array
    });
  }

  const createEmptyTasks = () =>{
    const tasks = []
    for (let i = 0; i < props.count; i++) {
      const element = {
        status:'',
        task:'',
        updateTime: Date.now(),
      };
      tasks.push(element)
    }
    return tasks
  }

  useEffect(() => {
    if(props.value.length == 0){
    props.setValue(createEmptyTasks());
    }
  }, [props.value]); // This could be a future issue if i want to add tasks


  return(
  <View>
  <Title title = {props.title} />
  {Array.from(props.value).map((value, index) => (
    <View style ={styles.checkrow} key={index}>
      <CheckBox
            status={value.status}
            onChange={() =>handleCheckboxChange(index)}
            onHold={() => handleFuture(index)}
      />
      <XTextInput
          height = {40}
          flex = {1}
          description={value.task}// Use the setter function passed as a prop
          setDescription={text => handleTask(text, index)}
          placeholder = {`Task`}
          />
    </View>
    ))}
  <SubTitle title='Previous' onClick = {handleShowPrevious}/>
  
  {showPrevious && (Array.from(props.previousTasks).map((value, index) => (
    <View style ={styles.checkrow}  key={index}>
    <CheckBox
          status={value.status}
          onChange={() =>handlePreviousCheckboxChange(index)}
          onHold={() => handlePreviousFuture(index)}
    />
    <Text style={styles.inputed}>{value.task}</Text>
  </View>
    )))}
  <SubTitle title='Future' onClick = {handleShowPrevious}/>

  {showPrevious && (Array.from(props.futureTasks).map((value, index) => (
    <View style ={styles.checkrow}  key={index}>
    <CheckBox
          status={value.status}
          onChange={() =>handleFutureCheckboxChange(index)}
          onHold={() => changeFuture(index)}
    />
    <Text style={styles.inputed}>{value.task}</Text>
  </View>
    )))}
  </View>
  )
};

export default ChecksTasks;