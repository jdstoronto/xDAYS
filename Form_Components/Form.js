import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Dimensions,
  Button,
  Alert, // Import Alert from react-native
} from 'react-native';

import {
  Describe,
  ChecksThanks,
  ChecksTasks,
  Life_Mathematics,
  ExploreEquation
} from './Form_Index';

const importedPreviousTasks = [
  {
    status:'',
    task:'Work on Resume'
  },
  {
    status:'',
    task:'Reach out to Cathy Friend'
  },
  {
    status:'Completed',
    task:'Ask Heather for Reference Letter'
  }
]

const importedFutureTasks = [
  {
    status:'Future',
    task:'Buy Helena Flowers'
  },
  {
    status:'Future',
    task:'Life Insurance'
  },
  {
    status:'Future',
    task:'Call Doctors Office'
  }
]

function XForm(props) {
  const [day, setDay] = useState('');
  const [heal, setHeal] = useState('');
  const [appreciations, setAppreciations] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [previousTasks, setPreviousTasks] = useState(importedPreviousTasks);
  const [futureTasks, setFutureTasks] = useState(importedFutureTasks);
  const [life_math, setLife_math] = useState({
    '+':'',
    '-':'',
    '*':'',
    '÷':''
  });
  const [selected_math, setSelected_math] = useState('');
  const [explore, setExplore] = useState([]);
  const [submit, setSubmit] = useState(false);

  // Function to handle form submission
  const handleSubmit = () => {
    // You can process the data here, such as sending it to a server
    setSubmit(true);
    Alert.alert('Form Submitted', `Date: ${props.date}\nDay: ${day}`);
    
  };

  return (
    <View style ={styles.container}>
      
      <Describe title='Day' description={day} setDescription={setDay} height={130}/>
      <Describe title='Health' description={heal} setDescription={setHeal} height={90}/>
      <ChecksThanks title='Appreciations' value={appreciations} setValue={setAppreciations} count={3}/>
      <ChecksTasks title='Tasks' value={tasks} setValue={setTasks} count={3} 
        previousTasks = {previousTasks} updatePrevious = {setPreviousTasks}
        futureTasks = {futureTasks} updateFuture = {setFutureTasks}
      />
      <Life_Mathematics title='Life' life_math={life_math} setValue={setLife_math} setSelected={setSelected_math} selected={selected_math}/>
      <ExploreEquation title='Explore' value={explore} setValue={setExplore} selected={selected_math} height={90} life_math={life_math}/>
      {/* Probably should have made button touchable opacity */}
      <View style = {styles.buttonContainer}>
        <View style = {{width:'50%',borderColor: 'white',borderWidth: 2,}}>
        <Button color ='black' title="Process" onPress={handleSubmit} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
  },
  buttonContainer:{
    margin: 15,
    flex: 1,
    color: 'white',
    fontFamily: 'Perfect DOS VGA 437',
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default XForm;