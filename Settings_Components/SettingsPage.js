import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { exportDatabase } from '../Storage_Components/ExportDatabase';

const SettingsPage = ({ onClose, taskTime, nightTime, onUpdateTaskTime, onUpdateNightTime }) => {
  const [taskHour, setTaskHour] = useState(taskTime.hour.toString());
  const [taskMin, setTaskMin] = useState(taskTime.minute.toString());
  const [nightHour, setNightHour] = useState(nightTime.hour.toString());
  const [nightMin, setNightMin] = useState(nightTime.minute.toString());

  const saveTask = () => {
    onUpdateTaskTime({hour: parseInt(taskHour, 10), minute: parseInt(taskMin, 10)});
  };

  const saveNight = () => {
    onUpdateNightTime({hour: parseInt(nightHour, 10), minute: parseInt(nightMin, 10)});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Task Notification Time</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            value={taskHour}
            keyboardType="numeric"
            onChangeText={setTaskHour}
            maxLength={2}
          />
          <Text style={styles.colon}>:</Text>
          <TextInput
            style={styles.input}
            value={taskMin}
            keyboardType="numeric"
            onChangeText={setTaskMin}
            maxLength={2}
          />
          <TouchableOpacity onPress={saveTask} style={styles.saveButton}>
            <Text style={styles.saveText}>Set</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Night Notification Time</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            value={nightHour}
            keyboardType="numeric"
            onChangeText={setNightHour}
            maxLength={2}
          />
          <Text style={styles.colon}>:</Text>
          <TextInput
            style={styles.input}
            value={nightMin}
            keyboardType="numeric"
            onChangeText={setNightMin}
            maxLength={2}
          />
          <TouchableOpacity onPress={saveNight} style={styles.saveButton}>
            <Text style={styles.saveText}>Set</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>Settings Page</Text>
        <TouchableOpacity onPress={exportDatabase} style={styles.saveButton}>
          <Text style={styles.saveText}>Download Database</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    margin: 20,
  },
  closeText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'perfect_dos',
  },
  bottomContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'perfect_dos',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginHorizontal: 5,
    padding: 2,
    minWidth: 40,
    textAlign: 'center',
    fontFamily: 'perfect_dos',
  },
  colon: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'perfect_dos',
  },
  saveButton: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  saveText: {
    color: 'white',
    fontFamily: 'perfect_dos',
  },
  bottomText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'perfect_dos',
  },
});

export default SettingsPage;
