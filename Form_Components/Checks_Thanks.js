
import { View, StyleSheet } from 'react-native';
import React, {useState, useEffect} from 'react';
import {CheckBox, SubTitle, Title, XTextInput, XTextDisplay} from "./Form_Parts/FormParts_Index"
import {getList, softDeleteItem} from "../Storage_Components/Store_Form"


const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
    color: '#fff',
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
      const newStatus = item.status === '' ? 'Completed' : '';
      return {...item, status: newStatus, updateTime: timestamp};
    }
    return {...item, updateTime: timestamp};
  });
}

function futureCheckChange(previous, id){
  const timestamp = Date.now();
  return previous.map(item => item.id === id ? {...item, status: item.status === 'Future' ? '' : 'Future', updateTime: timestamp} : item);
}

function propertyChange(previous, id, name, value){
  return previous.map(item => item.id === id ? {...item, [name]: value, updateTime: Date.now()} : item);
}

async function listChange(previous, id, name, value){
  let nameList = [];
  try {
    nameList = await getList(`name`, `appreciation_table`, value+ '%');
  } catch (error) {
    console.log('failed to find other names with ' + value)
  }
  return previous.map(item => item.id === id ? {...item, [name]: value, names: nameList, updateTime: Date.now()} : item);
}

function ChecksThanks(props) {

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

  const handlePropertyChange = async (id, name, value) => {
    if(name == `name` && value != null){
      const updatedItems = await listChange([...props.value], id, name, value);
      props.setValue(updatedItems);
      return;
    }
    else{
    props.setValue((prevItems) => {
      return propertyChange([...prevItems], id, name, value);  // Return the updated array
    });
    }
  };

  const handleShowPrevious = () => {
    setShowPrevious(prev => !prev);
  };

  const deleteThanks = (id) => {
    softDeleteItem('appreciation_table', id);
    props.updatePrevious(prev => prev.filter(item => item.id !== id));
  };

  const createEmptyTasks = () =>{
    const tasks = []
    for (let i = 0; i < props.count; i++) {
      const element = {
        id: generateUniqueId(),
        status:'',
        thanks:'',
        name:'',
        names:[],
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
            onChange={() => handleCheckboxChange(value.id)}
      />
      <XTextInput
          height = {40}
          width = '30%'
          description={value.name}
          setDescription={text => handlePropertyChange(value.id,'name',text)}
          placeholder = {`Name`}
          itemList = {value.names}
          />
      <XTextInput
          height = {40}
          width = '50%'
          flex = {1}
          description={value.thanks}
          setDescription={text => handlePropertyChange(value.id,'thanks',text)}
          placeholder = {`Thank You..`}
          />
    </View>
    ))}
  <SubTitle title='Previous' onClick = {handleShowPrevious}/>
  {showPrevious && (Array.from(props.previousThanks).map((value) => (
    <View style ={styles.checkrow} key={value.id}>
      <CheckBox
            status={value.status}
            onChange={() => handlePreviousCheckboxChange(value.id)}
      />
      <XTextDisplay
        height={25}
        width='30%'
        text={value.name}
        onDelete={() => deleteThanks(value.id)}
      />
      <XTextDisplay
        height={25}
        flex={1}
        width='50%'
        text={value.thanks}
        onDelete={() => deleteThanks(value.id)}
      />
    </View>
    )))}
  </View>
  )
};

export default ChecksThanks;
