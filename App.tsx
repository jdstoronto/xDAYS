/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import XHeader from './Top_Components/xHeader';
import XForm from './Form_Components/Form';
import NotifyDay from './Notify_Components/Notify';
import WordFreq3DChart from './Top_Components/WordFreq3DChart';
import { getMathWordCounts } from './Form_Components/Store_Form';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

if (!__DEV__) {
  console.log = () => {};  // Disable console.log in production
}

const getCurrentDate = () => {
  const today = new Date();

  const year = today.getFullYear().toString().slice(-2); // Get the last two digits of the year
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
  const day = today.getDate().toString().padStart(2, '0'); // Add leading zero if needed

  return `${year}-${month}-${day}`;
};

const getxCurrentDate = () => {
  const today = new Date();
  const date = today.getDate()
  const hours = today.getHours();

  let xDay = new Date(today);

  //If Before 9am the previous day will be logged
  if (hours < 9){
    xDay.setDate(date-1);
  }

  const year = xDay.getFullYear().toString().slice(-2); // Get the last two digits of the year
  const month = (xDay.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
  const day = xDay.getDate().toString().padStart(2, '0'); // Add leading zero if needed

  return `${year}-${month}-${day}`;
};

function App(): React.JSX.Element {

  const [previousDays, setPreviousDays] = useState([]);

  const isDarkMode = useColorScheme() === 'dark';
  const [currentDate, setCurrentDate] = useState<string>(getxCurrentDate());

  const [refresh, setRefresh] = useState(false);
  const [update, setUpdate] = useState(false);
  const [clear, setClear] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [wordCounts, setWordCounts] = useState({});

  const handleRefresh = () => {
    setRefresh(true);  // Trigger refresh
  };

  const resetRefresh = () => {
    setRefresh(false);  // Trigger refresh
  };

  const handleUpdate = () => {
    setUpdate(true);  // Trigger Update
  };

  const resetUpdate = () => {
    setUpdate(false);  // Trigger Update
  };

  const handleClear = () => {
    setClear(true);  // Trigger Clear
  };

  const handleChart = async () => {
    try {
      const counts = await getMathWordCounts();
      setWordCounts(counts);
      setShowChart(true);
    } catch (e) {
      console.error('Error getting word counts', e);
    }
  };

  const closeChart = () => {
    setShowChart(false);
  };

  const resetClear = () => {
    setClear(false);  // Trigger Clear
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <NotifyDay
        prevDays={previousDays}
        setPrevDays={setPreviousDays}
        date = {currentDate} />
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <XHeader date = {currentDate}
        handleClear = {handleClear}
        handleRefresh = {handleRefresh}
        handleUpdate = {handleUpdate}
        handleChart = {handleChart}/>
        {showChart ? (
          <View style={{height:400}}>
            <WordFreq3DChart wordCounts={wordCounts} />
            <View style={{alignItems:'center', marginTop:10}}>
              <TouchableOpacity onPress={closeChart} style={{padding:10, borderWidth:1}}>
                <View>
                  <Text style={{color:'white'}}>Close</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <XForm date = {currentDate}
              prevDays = {previousDays}
              clear = {clear} resetClear = {resetClear}
              refresh = {refresh} resetRefresh = {resetRefresh}
              update = {update} resetUpdate = {resetUpdate}/>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
