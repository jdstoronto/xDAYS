import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import { Alert } from 'react-native';

const saveFile = async(fileName, content)=>{
    try {
        const result = await DocumentPicker.pick({type:[DocumentPicker.types.allFiles],});
        console.log(result)
        const selected_path = result[0]["uri"];
        console.log(selected_path)
        const filePath = `${selected_path}/${fileName}.txt`;
        await RNFS.writeFile(filePath, content, 'utf8');
        Alert.alert('Success',`File saved at: ${filePath}`);
        
    } catch (error) {
        Alert.alert('Error','Could not save');
        console.error(error);
    }
}

export {saveFile};