import RNFS from 'react-native-fs';
import { Alert } from 'react-native';

export async function exportDatabase() {
  try {
    const srcPath = `${RNFS.DocumentDirectoryPath}/xDayEntries.db`;
    const destPath = `${RNFS.DownloadDirectoryPath}/xDayEntries-${Date.now()}.db`;
    await RNFS.copyFile(srcPath, destPath);
    Alert.alert('Success', `Database saved to ${destPath}`);
  } catch (err) {
    Alert.alert('Error', 'Could not export database');
    console.error('exportDatabase', err);
  }
}
