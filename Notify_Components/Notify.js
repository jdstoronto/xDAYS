import React, { useState, useEffect } from 'react';
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

import {storeForm, getThanks, getTasks} from './Store_Form';

import PushNotification from 'react-native-push-notification';

const sendNotification = (title, message) => {
  PushNotification.localNotification({
    channelId: "xdays-channel", // Pass the channel ID when sending the notification
    title: title,
    message: message,
  });
};

const createNotificationChannel = () => {
  console.log(`Try to create channel may already exist`);
  PushNotification.createChannel(
    {
      channelId: "xdays-channel", // Unique channel ID
      channelName: "XDAYS Channel", // Channel name (shown to users)
      importance: 3, // High importance
      vibrate: true, // Enable vibration
    },
    (created) => console.log(`createChannel returned '${created}'`) // Log the result
  );
};

function NotifyDay(props) {
  useEffect(()=> {
    createNotificationChannel();
    sendNotification('xDAYS','Journal Today?')
  }, [])
}


export default NotifyDay;