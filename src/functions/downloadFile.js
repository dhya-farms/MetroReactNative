import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';  // Corrected the import statement
import { Alert } from 'react-native';

const downloadAndShareFile = async (fileUrl, fileName, mimeType) => {
    console.log('mimetype', mimeType)
    try {
        const fileUri = FileSystem.documentDirectory + fileName;  // More persistent than cacheDirectory
        const downloadResult = await FileSystem.downloadAsync(fileUrl, fileUri);

        console.log('Finished downloading to ', downloadResult.uri);

        // For Android and iOS: Use Sharing to open the share dialog which includes Open
        if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(downloadResult.uri, {
                mimeType: mimeType, 
                dialogTitle: 'Open file with',
            });
        } else {
            Alert.alert('Sharing Not Available', 'Unable to share or open file on this device.');
        }
    } catch (error) {
        console.error('Error downloading or sharing file:', error);
        Alert.alert('Download Error', 'Failed to download or share the file.');
    }

};

export default downloadAndShareFile;

