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
  Explore_Equation
} from './Form_Index';

function XForm(props) {
  const [day, setDay] = useState('');
  const [heal, setHeal] = useState('');
  const [appreciations, setAppreciations] = useState('');
  const [tasks, setTasks] = useState('');
  const [life_math, setLife_math] = useState('');
  const [explore, setExplore] = useState('');

  // Function to handle form submission
  const handleSubmit = () => {
    // You can process the data here, such as sending it to a server
    Alert.alert('Form Submitted', `Date: ${props.date}\nDay: ${day}`);
  };

  return (
    <View>
      {/* Corrected prop names */}
      <Describe title='Day' description={day} setDescription={setDay} />
      <Describe title='Health' description={heal} setDescription={setHeal} />
      <ChecksThanks title='Appreciations' value={appreciations} setValue={setAppreciations} count={3}/>
      <ChecksTasks title='Tasks' value={tasks} setValue={setTasks} count={3} />
      <Life_Mathematics title='Life' value={life_math} setValue={setLife_math} />
      <Explore_Equation value={explore} setValue={setExplore} />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

export default XForm;