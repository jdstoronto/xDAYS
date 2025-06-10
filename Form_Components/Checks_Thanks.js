
import { View, Text, StyleSheet } from 'react-native';
import React, {useState, useEffect} from 'react';
import {CheckBox, SubTitle, Title, XTextInput, XTextDisplay} from "./Form_Parts/FormParts_Index"
import {getList, softDeleteItem} from "./Store_Form"

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

function propertyChange(previous, index, name, value){
  const updatedItems = previous;
  updatedItems[index][name] = value;
  updatedItems[index].updateTime = Date.now();
  return updatedItems;  // Return the updated array
}

async function listChange(previous, index, name, value){
  let nameList = [];
  const updatedItems = previous;
  updatedItems[index][name] = value;
  updatedItems[index].updateTime = Date.now();
  try {
    nameList = await getList(`name`, `appreciation_table`, value+ '%');
    updatedItems[index].names = nameList;
    //setNames(nameList)
  } catch (error) {
    console.log('failed to find other names with ' + value)
  }
  return updatedItems;
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

  const handlePropertyChange = async (index, name, value) => {
    if(name == `name` && value != null){
      const updatedItems = await listChange([...props.value], index, name, value);
      props.setValue(updatedItems);
      return;
    }
    else{
    props.setValue((prevItems) => {
      return propertyChange([...prevItems], index, name, value);  // Return the updated array
    });
    }
  };

  const handleShowPrevious = () => {
    setShowPrevious(!showPrevious);
  };

  const deleteThanks = (id) => {
    softDeleteItem('appreciation_table', id);
    props.updatePrevious(prev => prev.filter(item => item.id !== id));
  };

  const createEmptyTasks = () =>{
    const tasks = []
    for (let i = 0; i < props.count; i++) {
      const element = {
        status:'',
        thanks:'',
        name:'',
        names:[],
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
            onChange={() => handleCheckboxChange(index)}
      />
      <XTextInput
          height = {40}
          width = '30%'
          description={value.name}
          setDescription={text => handlePropertyChange(index,'name',text)}
          placeholder = {`Name`}
          itemList = {value.names}
          />
      <XTextInput
          height = {40}
          width = '50%'
          flex = {1}
          description={value.thanks}
          setDescription={text => handlePropertyChange(index,'thanks',text)}
          placeholder = {`Thank You..`}
          />
    </View>
    ))}
  <SubTitle title='Previous' onClick = {handleShowPrevious}/>
  {showPrevious && (Array.from(props.previousThanks).map((value, index) => (
    <View style ={styles.checkrow} key={index}>
      <CheckBox
            status={value.status}
            onChange={() => handlePreviousCheckboxChange(index)}
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