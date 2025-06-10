import React, { useState, useEffect, useRef } from 'react';

import { getTasks, getPrevDays } from '../Storage_Components/Store_Form';

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
    smallIcon: "ic_notifications",
  });
};

const sendNotification = (title, message) => {
  PushNotification.localNotification({
    channelId: "xdays-channel", // Pass the channel ID when sending the notification
    title: title,
    message: message,
    smallIcon: "ic_notifications",
  });
};

const createNotificationChannel = () => {
  //console.log(`Try to create channel may already exist`);
  PushNotification.createChannel(
    {
      channelId: "xdays-channel", // Unique channel ID
      channelName: "XDAYS Channel", // Channel name (shown to users)
      importance: 3, // High importance
      vibrate: true, // Enable vibration
    },
    (created) => console.log(`DEBUG: createChannel returned '${created}'`) // Log the result
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

function NotifyDay({date, prevDays, setPrevDays, taskTime, nightTime}){
  const [tasks, setTasks] = useState([])

  const hasScheduledTasks = useRef(false);
  const hasScheduledPrevDay = useRef(false);

  console.log(`DEBUG: Running Notify Day`)


  async function fetchData(){
    try {
      PushNotification.cancelAllLocalNotifications();
      createNotificationChannel();
      console.log(`DEBUG: Running async`)
      //Deleting all previous setted notifications
      const [importedTasks, _ ] = await getTasks(3,0,0);
      const importedPrevDays = await getPrevDays(date, 4);
      setPrevDays(importedPrevDays);
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
    const {hour: hours, minute: min} = taskTime;
    
    
    const timeUntil2_30PM  = calculateTimeUntilTarget(hours, min);
    //console.log(`Found the following length ${tasks.length}`);
    if (tasks.length != 0 && !hasScheduledTasks.current) {
      const dayTaskNotification = formatTasksNotification(tasks);
      sendTimedNotification('xDAYS - Day Tasks Reminder', dayTaskNotification, timeUntil2_30PM );
    
      const taskTimer = calculateCountdownUntilTarget(hours, min);
      
      console.log(`DEBUG: Sent ${tasks.length} Tasks Background Scheduled Notification for ${taskTimer}`);

      hasScheduledTasks.current = true;
    }
  },[tasks, taskTime])

  useEffect(()=>{
    if (prevDays.length != 0 && !hasScheduledPrevDay.current){
      
      const {hour: hours, minute: min} = nightTime;

      const nightTimer = calculateTimeUntilTarget(hours, min);

      prevDay = prevDays[0];

      console.log(`DEBUG: Have Previous ${prevDay.prevDayCount} days ago Sent Background Scheduled Notification for ${nightTimer}`)

      const nightNotification = `Time to journal ${prevDay.prevDayCount>1 && `its been ${prevDay.prevDayCount} days`}`

      sendTimedNotification('xDAYS - Journal Reminder', nightNotification, nightTimer);
      hasScheduledPrevDay.current = true;
    }

  },[prevDays, nightTime])

  return null;
}


export default NotifyDay;
