/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import XHeader from './Top/xHeader';
import XForm from './Form_Parts/Form';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const getCurrentDate = () => {
  const today = new Date();

  const year = today.getFullYear().toString().slice(-2); // Get the last two digits of the year
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
  const day = today.getDate().toString().padStart(2, '0'); // Add leading zero if needed

  return `${year}-${month}-${day}`;
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentDate, setCurrentDate] = useState<string>(getCurrentDate());

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <XHeader date = {currentDate} />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <XForm date = {currentDate} />
        </View>
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
