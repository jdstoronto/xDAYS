import RNFS from 'react-native-fs';
import { Alert, PermissionsAndroid, Platform } from 'react-native';

const saveFile = async (fileName, content) => {
    try {
      // Request permission to write to external storage (for Android 9 and below)
      if (Platform.OS === 'android' && Platform.Version < 29) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Permission to Write Files',
            message: 'This app needs permission to save files to your storage.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK'
          }
        );
  
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission Denied', 'Cannot save file without permission.');
          return;
        }
      }
  
      // For Android 10+ (API 29 and above), save to the Downloads directory
      const directory = Platform.OS === 'android' && Platform.Version >= 29
        ? RNFS.DownloadDirectoryPath  // Scoped storage path
        : '/storage/emulated/0/Download';  // Default path for Android 9 and below
  
      const filePath = `${directory}/${fileName}.txt`;
      await RNFS.writeFile(filePath, content, 'utf8');
      Alert.alert('Success', `File saved at: ${filePath}`);
    } catch (error) {
      Alert.alert('Error', 'Could not save the file.');
      console.error(error);
    }
  };

export { saveFile };
