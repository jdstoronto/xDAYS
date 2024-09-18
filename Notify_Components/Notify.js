import React, { useState, useEffect } from 'react';

import { getTasks } from '../Form_Components/Store_Form';

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



function formatTasksNotification(tasks){
  let formattedString = ``;
  let tasksStringArray = tasks.map(task=> `□ ${task.task}`);
  formattedString = tasksStringArray.join('\n');
  return formattedString;
}


function NotifyDay(props) {
  const [tasks, setTasks] = useState([])

  async function fetchData(){
    try {
      const [importedTasks, _ ] = await getTasks(3,0,0);
      isArray = Array.isArray(importedTasks);
      console.log(`This returned ${isArray ? 'Array':'Not an Array'} ${importedTasks}`);
      setTasks(importedTasks);
    }
    catch(error){
      console.error('Could Not Find Tasks, Error:', error);
    }
  }
  
  useEffect(()=> {
    fetchData();
  }, [])

  useEffect(() => {
    console.log(`Found the following length ${tasks.length} sample object ${tasks[0]}`);
    if (tasks.length != 0) {
      const taskNotification = formatTasksNotification(tasks);
      createNotificationChannel();
      sendNotification('xDAYS - Tasks Reminder', taskNotification);
    }
  },[tasks])

}


export default NotifyDay;