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

import { 
  getFormated, 
  setFormated} from './Format_Form';

  import {saveFile} from './Export_Form'

const importedPreviousAppreciations = [
  {
    id: Date.parse('01 Dec 1995 00:12:00 GMT'),
    status:'',
    name:'Helena',
    thanks:'For taking Cleo out on Outings'
  },
  {
    id: Date.parse('04 Dec 1995 00:12:00 GMT'),
    status:'',
    name:'Alex Godinho',
    thanks:'For letting me know about the Saturday Basketball Runs'
  },
  {
    id: Date.parse('14 Dec 1995 00:12:00 GMT'),
    status:'Completed',
    name:'Lee Smith',
    thanks:'For Job Opportunity'
  }
]

const importedPreviousTasks = [
  {
    id: Date.parse('12 Dec 1995 00:12:00 GMT'),
    status:'',
    task:'Work on Resume'
  },
  {
    id: Date.parse('10 Dec 1995 00:12:00 GMT'),
    status:'',
    task:'Reach out to Cathy Friend'
  },
  {
    id: Date.parse('04 Dec 1995 00:12:00 GMT'),
    status:'Completed',
    task:'Ask Heather for Reference Letter'
  }
]

const importedFutureTasks = [
  {
    id: Date.parse('04 Dec 1995 00:01:00 GMT'),
    status:'Future',
    task:'Buy Helena Flowers'
  },
  {
    id: Date.parse('24 Dec 1995 00:12:00 GMT'),
    status:'Future',
    task:'Life Insurance'
  },
  {
    id: Date.parse('14 Dec 1995 00:12:00 GMT'),
    status:'Future',
    task:'Call Doctors Office'
  }
]

function XForm(props) {
  const [day, setDay] = useState('');
  const [heal, setHeal] = useState('');

  const [appreciations, setAppreciations] = useState([]);
  const [previousAppreciations, setPreviousAppreciations] = useState(importedPreviousAppreciations);
  
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
  const [explore, setExplore] = useState({
    why:'',
    whynot:''
  });
  const [submit, setSubmit] = useState(false);

  // Function to handle form submission
  const handleSubmit = () => {
    // You can process the data here, such as sending it to a server
    const entry = {
      date: props.date,
      day: day,
      heal: heal,
      appreciations: appreciations,
      previousAppreciations: previousAppreciations,
      tasks: tasks,
      previousTasks: previousTasks,
      futureTasks: futureTasks,
      lifeMath: life_math,
      selectedMath: selected_math,
      explore: explore
    }

    setFormated(entry);
    
    setSubmit(true);
    saveFile(`x${props.date}`, getFormated())
    //Alert.alert('Form Submitted', getFormated());
    
  };

  return (
    <View style ={styles.container}>
      
      <Describe title='Day' description={day} setDescription={setDay} height={130}/>
      <Describe title='Health' description={heal} setDescription={setHeal} height={90}/>
      <ChecksThanks 
        title='Appreciations' count={3}
        value={appreciations} setValue={setAppreciations}
        previousThanks = {previousAppreciations} updatePrevious = {setPreviousAppreciations}
      />
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