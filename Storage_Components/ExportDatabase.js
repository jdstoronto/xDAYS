import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import { Alert } from 'react-native';

export async function exportDatabase() {
  try {
    // Derive the actual database path. `location: 'default'` stores DBs under
    // the application database directory, not the document directory.
    const basePath = RNFS.DocumentDirectoryPath.replace(/\/files$/, '');
    const srcPath = `${basePath}/databases/xDayEntries.db`;

    const destPath = `${RNFS.DownloadDirectoryPath}/xDayEntries-${Date.now()}.db`;
    await RNFS.copyFile(srcPath, destPath);
    Alert.alert('Success', `Database saved to ${destPath}`);
  } catch (err) {
    Alert.alert('Error', 'Could not export database');
    console.error('exportDatabase', err);
  }
}
