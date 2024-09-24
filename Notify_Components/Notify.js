import React, { useState, useEffect } from 'react';

import { getTasks, getPrevDay } from '../Form_Components/Store_Form';

import PushNotification from 'react-native-push-notification';
import BackgroundTimer from 'react-native-background-timer';


const sendTimedNotification = (title, message, time) => {
  PushNotification.localNotificationSchedule({
    id: '001',
    channelId: "xdays-channel",  // The channel ID
    title: title,
    message: message,
    date: time,  // The time when the notification should fire
    allowWhileIdle: true,  // Ensure the notification fires even if the device is idle
  });
};

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

const calculateCountdownUntilTarget = (targetHour, targetMinute) => {

  const now = new Date();
  const targetTime = new Date();
  
  // Set target hour and minute
  targetTime.setHours(targetHour, targetMinute, 0, 0);

  // If target time has already passed today, schedule it for tomorrow
  if (targetTime <= now) {
    targetTime.setDate(targetTime.getDate() + 1);
  }

  // Return the difference in milliseconds
  return targetTime - now;

};

const calculateTimeUntilTarget = (targetHour, targetMinute) => {
  const now = new Date();
  const targetTime = new Date();
  //console.log(`Notify time is ${now}`)
  targetTime.setHours(targetHour, targetMinute, 0, 0);

  if (targetTime <= now) {
    targetTime.setDate(targetTime.getDate() + 1);
  }
  return targetTime;
};

function formatTasksNotification(tasks){
  let formattedString = ``;
  let tasksStringArray = tasks.map(task=> `□ ${task.task}`);
  formattedString = tasksStringArray.join('\n');
  return formattedString;
}

function NotifyDay({date, prevDays, setPrevDays}){
  const [tasks, setTasks] = useState([])

  async function fetchData(){
    try {
      const [importedTasks, _ ] = await getTasks(3,0,0);
      const prevDay = await getPrevDay(date, 0);
      console.log(`DEBUG: Found Previous days ${prevDay.prevDayCount} ago`)
      isArray = Array.isArray(importedTasks);
      console.log(`This returned ${isArray ? 'Array':'Not an Array'} ${importedTasks}`);
      setTasks(importedTasks);
    }
    catch(error){
      console.error('Could Not Find Fetch Data, Error:', error);
    }
  }
  
  useEffect(()=> {
    fetchData();
  }, [])

  useEffect(() => {
    const [hours, min] = [22, 4];
    
    PushNotification.cancelAllLocalNotifications();//Deleting all previous setted notifications

    const timeUntil2_30PM  = calculateTimeUntilTarget(hours, min);
    //console.log(`Found the following length ${tasks.length}`);
    if (tasks.length != 0) {
      const taskNotification = formatTasksNotification(tasks);
      console.log(`Sent Scheduled Notification for ${timeUntil2_30PM}`);
      createNotificationChannel();
      //sendNotification('xDAYS - Tasks Reminder', taskNotification);
      sendTimedNotification('xDAYS - Tasks Reminder A', taskNotification, timeUntil2_30PM );
    
      const taskTimer = calculateCountdownUntilTarget(hours, min);
      
      console.log(`Sent Background Scheduled Notification for ${taskTimer}`);
      BackgroundTimer.setTimeout(async () => {
        sendNotification('xDAYS - Tasks Reminder B', taskNotification);
      }, taskTimer);
    }

    
    

  },[tasks])

  useEffect(()=>{
    const [hours, min] = [22, 30];

    PushNotification.cancelAllLocalNotifications();//Deleting all previous setted notifications

    const nightTimer = calculateCountdownUntilTarget(21, 30);
      
    console.log(`Sent Background Scheduled Notification for ${nightTimer}`);
    BackgroundTimer.setTimeout(async () => {
      sendNotification('xDAYS - Journal Reminder', taskNotification);
    }, nightTimer);
  },[prevDays])

  return null;
}


export default NotifyDay;