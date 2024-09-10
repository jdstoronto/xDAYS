import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';//Need to Remove

import { Alert } from 'react-native';

const saveFile = async(fileName, content)=>{
    try {
        const filePath = `/storage/emulated/0/Download/${fileName}.txt`;
        await RNFS.writeFile(filePath, content, 'utf8');
        Alert.alert('Success',`File saved at: ${filePath}`);
        
    } catch (error) {
        Alert.alert('Error','Could not save');
        console.error(error);
    }
}

export {saveFile};