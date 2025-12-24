
import { View, StyleSheet } from 'react-native';
import React, {useState, useEffect} from 'react';
import {CheckBox, SubTitle, Title, XTextInput, XTextDisplay} from "./Form_Parts/FormParts_Index"
import {softDeleteItem} from '../Storage_Components/Store_Form';

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

const generateUniqueId = () => `${Date.now().toString()}-${Math.random().toString(16).slice(2)}`;

function checkboxChange(previous, id){
  const timestamp = Date.now();
  return previous.map(item => {
    if(item.id !== id){
      return item;
    }
    if (item.status !== 'Future'){
      const newStatus = item.status == '' ? 'Completed' : '';
      return {...item, status: newStatus, updateTime: timestamp};
    }
    return {...item, updateTime: timestamp};
  });
}

function futureCheckChange(previous, id){
  const timestamp = Date.now();
  return previous.map(item => item.id === id ? {...item, status: item.status === 'Future' ? '' : 'Future', updateTime: timestamp} : item);
}

function ChecksTasks(props) {

  const [showPrevious, setShowPrevious] = useState(false);

  const handleCheckboxChange = (id) => {
    props.setValue((prevItems) => {
      return checkboxChange([...prevItems], id);  // Return the updated array
    });
  };

  const handlePreviousCheckboxChange = (id) => {
    props.updatePrevious((prevItems) => {
      return checkboxChange([...prevItems], id);  // Return the updated array
    });
  };

  const handleFutureCheckboxChange = (id) => {
    props.updateFuture((prevItems) => {
      return checkboxChange([...prevItems], id);  // Return the updated array
    });
  };

  const handleFuture = (id) =>{
    props.setValue((prevItems) => {
      return futureCheckChange([...prevItems], id);  // Return the updated array
    });

  }

  const handlePreviousFuture = (id) =>{
    props.updatePrevious((prevItems) => {
      return futureCheckChange([...prevItems], id);  // Return the updated array
    });

  }

  const changeFuture = (id) =>{
    props.updateFuture((prevItems) => {
      return futureCheckChange([...prevItems], id);  // Return the updated array
    });

  }

  const handleShowPrevious = () => {
    setShowPrevious(prev => !prev);
  };

  const deleteTask = (id) => {
    softDeleteItem('task_table', id);
    props.updatePrevious(prev => prev.filter(item => item.id !== id));
    props.updateFuture(prev => prev.filter(item => item.id !== id));
  };

  const handleTask = (newValue, id) =>{
    props.setValue((prevItems) => {
      return prevItems.map(item => item.id === id ? {...item, task: newValue, updateTime: Date.now()} : item);
    });
  }

  const createEmptyTasks = () =>{
    const tasks = []
    for (let i = 0; i < props.count; i++) {
      const element = {
        id: generateUniqueId(),
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
  {Array.from(props.value).map((value) => (
    <View style ={styles.checkrow} key={value.id}>
      <CheckBox
            status={value.status}
            onChange={() =>handleCheckboxChange(value.id)}
            onHold={() => handleFuture(value.id)}
      />
      <XTextInput
          height = {40}
          flex = {1}
          description={value.task}// Use the setter function passed as a prop
          setDescription={text => handleTask(text, value.id)}
          placeholder = {`Task`}
          />
    </View>
    ))}
  <SubTitle title='Previous' onClick = {handleShowPrevious}/>

  {showPrevious && (Array.from(props.previousTasks).map((value) => (
    <View style ={styles.checkrow}  key={value.id}>
    <CheckBox
          status={value.status}
          onChange={() =>handlePreviousCheckboxChange(value.id)}
          onHold={() => handlePreviousFuture(value.id)}
    />
    <XTextDisplay
        height={25}
        flex={1}
        text={value.task}
        onDelete={() => deleteTask(value.id)}
    />
  </View>
    )))}
  <SubTitle title='Future' onClick = {handleShowPrevious}/>

  {showPrevious && (Array.from(props.futureTasks).map((value) => (
    <View style ={styles.checkrow}  key={value.id}>
    <CheckBox
          status={value.status}
          onChange={() =>handleFutureCheckboxChange(value.id)}
          onHold={() => changeFuture(value.id)}
    />
    <XTextDisplay
        height={25}
        flex={1}
        text={value.task}
        onDelete={() => deleteTask(value.id)}
    />
  </View>
    )))}
  </View>
  )
};

export default ChecksTasks;
