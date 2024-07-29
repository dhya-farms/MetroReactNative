import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fetchDocTypes } from '../apifunctions/docTypesApi';
import * as DocumentPicker from 'expo-document-picker'
import UploadIcon from 'react-native-vector-icons/FontAwesome5'
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/constantstyles/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { uploadDocument } from '../apifunctions/uploadDocumentsApi';
import Toast from 'react-native-toast-message';
import { updateStatusBasedOnResponse } from '../functions/updateStatusBasedResponse';
import { fetchStatus } from '../apifunctions/fetchStatusApi';
import { ScrollView } from 'react-native-virtualized-view';


const DocumentVerifyModal = ({modalVisible, setModalVisible, effectivePropertyId, status, setStatus,
  setSiteVisitRefetch, setTokenRefetch, plot}) => {

  const [documents, setDocuments] = useState([]); // Stores complete document details
  const [fileError, setFileError] = useState(''); // State for storing file type error
  const [documentTypes, setDocumentTypes] = useState([])
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadedDocumentTypes, setUploadedDocumentTypes] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
        const docs = await fetchDocTypes();
        setDocumentTypes(docs);
    };
    fetchData();
  }, []);

  const allowedMimeTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
];

const pickDocument = async (docTypeId) => {
  console.log(docTypeId);
  let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",  // Allowing any file type to be picked to handle error in code
  });

  if (!result.cancelled && result.assets) {
      if (allowedMimeTypes.includes(result.assets[0].mimeType)) {
          console.log("Document Picker Result:", result);
          const updatedAssets = result.assets.map(asset => ({
              ...asset,
              docTypeId,  // Append the document type ID to each asset
          }));
          setDocuments([...documents, ...updatedAssets]);
          setFileError(''); // Clear any previous error messages

          // Check if the document type should be disabled after upload (for PAN or AADHAR)
          if ([1, 2].includes(docTypeId)) { // Assuming 1 is PAN and 2 is AADHAR
              setUploadedDocumentTypes(prev => [...prev, docTypeId]);
          }
      } else {
          console.log("Unsupported file type picked:", result.assets[0].mimeType);
          setFileError('Please upload a valid document file (PDF, DOCX, or XLSX).');
      }
  } else {
      console.log("Document picking was cancelled or no assets returned");
  }
};


const removeDocument = (index, docTypeId) => {
  const newDocuments = documents.filter((_, idx) => idx !== index);
  setDocuments(newDocuments);
  const newUploadedTypes = uploadedDocumentTypes.filter(id => id !== docTypeId);
  setUploadedDocumentTypes(newUploadedTypes);
};

const handleVerify = async () => {
  if (documents.length === 0) {
      setErrorMessage('Please upload at least one document to proceed.');
      return;
  }

  setErrorMessage('');
  const uploadPromises = documents.map(document =>
      uploadDocument(document, effectivePropertyId, document.docTypeId, 
          () => console.log('Upload successful for document type:', document.docTypeId),
          (error) => {
              console.error('Error in uploading:', error);
              return { success: false, docTypeId: document.docTypeId, error: error };
          })
      .then(() => ({ success: true, docTypeId: document.docTypeId }))
      .catch((error) => {
          console.error('Error in uploading:', error);
          return { success: false, docTypeId: document.docTypeId, error: error.message };
      })
  );

  try {
      const results = await Promise.all(uploadPromises);
      const allSuccessful = results.every(result => result.success);

      if (allSuccessful) {
          // All documents uploaded successfully, proceed to patch
          const patchResponse = await axios.patch(`https://dhya.app/metro/api/crm-leads/${effectivePropertyId}/`, {
              current_crm_status: 3,
              current_approval_status: 1,
          }, 
          {
              headers: { 'Authorization': `Token ${await AsyncStorage.getItem('userToken')}` }
          });
          console.log('Patch successful:', patchResponse.data);
          const statusResponse = await fetchStatus(effectivePropertyId);
          if (statusResponse && statusResponse.approvalStatus && statusResponse.crmStatus) {
            const updatedStatus = updateStatusBasedOnResponse(status, statusResponse.approvalStatus, statusResponse.crmStatus, plot);
            setStatus(updatedStatus);
            setSiteVisitRefetch(true)
            setTokenRefetch(true)
          } 
          setModalVisible(false)
          Toast.show({
              type: 'success',
              text1: 'All documents verified and status updated successfully',
              visibilityTime: 2200,
          });
      } else {
          setErrorMessage('Some documents failed to upload. Please try again.');
          // Optionally, filter and show only failed documents
          const failedDocs = results.filter(result => !result.success).map(result => result.docTypeId);
          console.log('Failed document types:', failedDocs);
      }
  } catch (error) {
      console.error('Error in patching:', error);
      setErrorMessage('Failed to update status. Please try again.');
  }
};





  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >  
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Icon name="times" size={20} color={PRIMARY_COLOR} />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Documentation</Text>
        <View style={styles.docDetailsContainer}>
               <View style={styles.docTextContaner}>
                  <Text style={styles.doctext}>Documentation</Text>
                </View>
                {documentTypes.map((doc) => {
                   const isDisabled = uploadedDocumentTypes.includes(doc.id) && doc.id !== 3;
                  return (
                    <View key={doc.id} style={[styles.selectedOptionContainer, isDisabled ? styles.disabledContainer : {}]}>
                          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                              <Image source={require('../../assets/images/document.png')} style={{marginRight: 10}}/>
                              <Text style={[styles.docDetailText, isDisabled ? styles.disabledText : {}]}>{doc ? doc.name_vernacular : 'Unknown Document'}</Text>
                          </View>
                          <TouchableOpacity 
                                    onPress={() => pickDocument(doc.id)} 
                                    style={[styles.uploadContainer, isDisabled ? styles.disabledUploadContainer : {}]}
                                    disabled={isDisabled}
                           >
                              <UploadIcon name="file-upload" size={18} color={isDisabled ? SECONDARY_COLOR : PRIMARY_COLOR} />
                          </TouchableOpacity>
                      </View>  
                  );
              })}
               {errorMessage.length > 0 && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}
          {documents.length > 0 &&
          <>
          <ScrollView style={styles.documentdetailsContainer} contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={styles.docHeading}>Uploaded Documents</Text>
          <FlatList
                data={documents}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.documentItem}>
                        {/* Check if the document name exceeds 13 characters and handle accordingly */}
                        <Text style={styles.docDetailText}>
                            {`${index + 1}) ${item.name.length > 13 ? item.name.substring(0, 13) + '...' : item.name}`}
                        </Text>
                        <TouchableOpacity onPress={() => removeDocument(index, item.docTypeId)}>
                            <MaterialIcon name="delete" size={20} color="red" />
                        </TouchableOpacity>
                    </View>
                )}
            />
           </ScrollView>
          </>
          }
          {fileError.length > 0 && (
                <Text style={styles.errorText}>{fileError}</Text>
          )}
          <View style={styles.nextConatainer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleVerify}>
                <Text style={styles.nextText}>Verify</Text>
           </TouchableOpacity>
          </View>
        </View>
        </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  // Add your styles here
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    width: '90%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontFamily: 'Poppins',
    marginBottom: 15,
    textAlign: "center",
    fontWeight: '600',
    fontSize: 18,
  },
  selectedOptionContainer:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 6,
    marginVertical: 10,
    padding: 10,
  },
  docDetailText:{
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
  },
  docTextContaner:{
    width: '90%',
    marginVertical: 10,
  },
  doctext:{
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
  },
  nextConatainer:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  nextButton:{
    width: 115,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 6,
  },
  nextText:{
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
    color: 'white'
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  docDetailsContainer:{
    width: '100%',
    
  },
  selectedOptionContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 6,
    marginVertical: 10,
    padding: 10,
  },
  disabledContainer:{
    borderColor: SECONDARY_COLOR,
    opacity: 0.5,

  },
  docDetailText:{
    flex: 1,
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
    marginVertical: 10,
  },
  disabledText:{
    color: SECONDARY_COLOR,
  },

  docTextContaner:{
    width: '90%',
    marginVertical: 10,
  },
  doctext:{
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
  },
  documentdetailsContainer:{
    width: '100%',
    maxHeight: 200,
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 10,
  },
  docHeading:{
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 16,
    color: PRIMARY_COLOR
  },
  uploadContainer:{
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 4,
  },
  disabledUploadContainer:{
    borderColor: SECONDARY_COLOR,
    opacity: 0.5,
  },
  documentItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  errorText: {
    color: 'red', // Error message color
    // Add more styles as needed
  },
});

export default DocumentVerifyModal;