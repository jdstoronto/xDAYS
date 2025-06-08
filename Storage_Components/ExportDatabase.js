import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import { Alert } from 'react-native';

export async function exportDatabase() {
  try {
    // Derive the actual database path. `location: 'default'` stores DBs under
    // the application database directory, not the document directory.
    const basePath = RNFS.DocumentDirectoryPath.replace(/\/files$/, '');
    const srcPath = `${basePath}/databases/xDayEntries.db`;

    // Ask the user where they want to save the file
    const destDir = await DocumentPicker.pickDirectory();
    if (!destDir) {
      return; // user cancelled
    }

    // DocumentPicker may return a URI prefixed with file://
    const destUri = destDir.uri.replace('file://', '');
    const destPath = `${destUri}/xDayEntries-${Date.now()}.db`;
    await RNFS.copyFile(srcPath, destPath);
    Alert.alert('Success', `Database saved to ${destPath}`);
  } catch (err) {
    if (DocumentPicker.isCancel && DocumentPicker.isCancel(err)) {
      return; // user cancelled picker
    }
    Alert.alert('Error', 'Could not export database');
    console.error('exportDatabase', err);
  }
}
