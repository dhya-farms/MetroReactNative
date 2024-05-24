import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeString});
}

export const uploadDocument = async (document, crmLeadId, crmDocumentTypeId, onSuccess, onError) => {
    const token = await AsyncStorage.getItem('userToken');
    let formData = new FormData();
    
    if (Platform.OS === 'web') {
        // Web specific logic using Blob for web
        const fileBlob = dataURItoBlob(document.uri);  // Assuming dataURItoBlob is defined for converting data URI to Blob in web
        formData.append('file', fileBlob, document.name);
        formData.append('file_usage_type', '3');
      
        if (formData.get('file_usage_type') === '3') {
            formData.append('crm_document_type', crmDocumentTypeId);
        }
        formData.append('crm_lead', crmLeadId);
    } else {
        const uri = document.uri;

        // Check if the file exists
        const fileInfo = await FileSystem.getInfoAsync(uri);
        if (!fileInfo.exists) {
            console.error('File does not exist at the path');
            onError && onError('File does not exist at the path');
            return;
        }

        // Directly append the file URI to FormData
        const fileType = document.mimeType;
        const fileName = document.name;
        formData.append('file', {
            uri,
            name: fileName,
            type: fileType
        });
        formData.append('file_usage_type', '3');
        formData.append('crm_document_type', crmDocumentTypeId);
        formData.append('crm_lead', crmLeadId);
    }

    try {
        const response = await axios({
            method: 'post',
            url: 'https://splashchemicals.in/metro/api/files/upload/standard/',
            data: formData,
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'multipart/form-data', // Let Axios handle the Content-Type
            },
        });

        console.log('Upload successful:', response.data);
        onSuccess && onSuccess(`Document uploaded successfully`);
    } catch (error) {
        console.error('Error uploading file:', error);
        onError && onError(error);
    }
};

