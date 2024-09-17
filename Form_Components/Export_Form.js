import RNFS from 'react-native-fs';
import { Alert} from 'react-native';



const appendName = () => {
  const today = new Date();

  const hour= today.getHours().toString().padStart(2, '0');; 
  const minute = today.getMinutes().toString().padStart(2, '0'); 
  const sec = today.getSeconds().toString().padStart(2, '0'); 

  return (`-${hour}-${minute}-${sec}`)
}

const saveFile = async (fileName, content) => {

  try {
    const writeFilePath = `/storage/emulated/0/Download/${fileName}${appendName()}.txt`;
    console.log(`file path: ${writeFilePath}`)

    const fileExists = await RNFS.exists(writeFilePath);
    if (fileExists) {
      await RNFS.unlink(writeFilePath); // Delete the existing file
      //Wanted to be able to save over file but was not able
      const fileStillExists = await RNFS.exists(writeFilePath);
      console.log('Existing file found');
      if (fileStillExists){
        console.log('Not Deleted')
      }
    }else{
      console.log('No existing file found');
    }


    await RNFS.writeFile(writeFilePath, content, 'utf8');
    Alert.alert('Success', `File saved at: ${writeFilePath}`);

  } catch (error) {
    Alert.alert('Error', 'Could not save the file.');
    console.error(error);
  }
};

export { saveFile };
