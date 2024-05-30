import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import HeaderContainer from '../../components/HeaderContainer';
import styles from '../../constants/styles/customerdocumentationstyles';
import SortHeader from '../../components/SortHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UploadIcon from 'react-native-vector-icons/FontAwesome5'
import * as DocumentPicker from 'expo-document-picker'
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../constants/constantstyles/colors';
import { fetchDocTypes } from '../../apifunctions/docTypesApi';
import { uploadDocument } from '../../apifunctions/uploadDocumentsApi';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRefresh } from '../../contexts/useRefreshContext';
import getEnvVars from '../../../config';
const { BASE_URL } = getEnvVars();


const CustomerDocumentation = ({route, navigation}) => {
    const customerDetails = route.params?.customerDetails
    const { triggerDataRefresh } = useRefresh();
    const [showDocDetails, setShowDocDetails] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [documents, setDocuments] = useState([]); // Stores complete document details
    const [fileError, setFileError] = useState(''); // State for storing file type error
    const [documentTypes, setDocumentTypes] = useState([])
    const [selectedDocumentIds, setSelectedDocumentIds] = useState([]);
    const [uploadedDocumentTypes, setUploadedDocumentTypes] = useState([]);



    useEffect(() => {
      const fetchData = async () => {
          const docs = await fetchDocTypes();
          setDocumentTypes(docs);
      };
      fetchData();
  }, []);

     // Allowed MIME types
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
                docTypeId, 
            }));
            setDocuments([...documents, ...updatedAssets]);
            setFileError(''); 

            if ([1, 2].includes(docTypeId)) { 
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




    const handleNext = () => {
        if (selectedDocumentIds.length === 0) {
          setErrorMessage('Please select at least one document to proceed.');
        } else {
          setErrorMessage('');
          setShowDocDetails(true);
          console.log(selectedDocumentIds)
        }
      };

      const handleSelectAll = () => {
        if (selectedDocumentIds.length === documentTypes.length) {
            setSelectedDocumentIds([]);
        } else {
            setSelectedDocumentIds(documentTypes.map(doc => doc.id));
        }
    };

      const handleSelectOption = (id) => {
        if (selectedDocumentIds.includes(id)) {
            setSelectedDocumentIds(selectedDocumentIds.filter(currentId => currentId !== id));
        } else {
            setSelectedDocumentIds([...selectedDocumentIds, id]);
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
            uploadDocument(document, customerDetails.id, document.docTypeId, 
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
                const patchResponse = await axios.patch(`${BASE_URL}/crm-leads/${customerDetails.id}/`, {
                    current_crm_status: 3,
                    current_approval_status: 1,
                }, 
                {
                    headers: { 'Authorization': `Token ${await AsyncStorage.getItem('userToken')}` }
                });
                console.log('Patch successful:', patchResponse.data);
                Toast.show({
                    type: 'success',
                    text1: 'All documents verified and status updated successfully',
                    visibilityTime: 2200,
                });
                setTimeout(() => {
                    triggerDataRefresh();
                    navigation.navigate('SO Client', {
                        screen: 'SO Customer Details',
                    });
                }, 2200);
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
    <View style={styles.mainContainer}>
      <HeaderContainer title="Documentation" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}/>
       <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {!showDocDetails ? (
          // This part renders the checkbox list
      <>
      <SortHeader title="Required Document"  isSortVisible={false} />
      <View style={styles.checkBoxTextContainer}>
            <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={handleSelectAll} // Update this line
                >
            <View style={selectedDocumentIds.length === documentTypes.length ? styles.checkboxSelected : styles.checkbox}>
            {selectedDocumentIds.length === documentTypes.length && (
                <Icon name="check" size={16} color="white" style={styles.checkboxIcon} />
            )}
           </View>
            <Text style={styles.checkboxLabel}>Select all</Text>
        </TouchableOpacity>
        {documentTypes.map(doc => (
        <TouchableOpacity key={doc.id} style={styles.checkboxContainer} onPress={() => handleSelectOption(doc.id)}>
            <View style={selectedDocumentIds.includes(doc.id) ? styles.checkboxSelected : styles.checkbox}>
                {selectedDocumentIds.includes(doc.id) && (
                    <Icon name="check" size={16} color="white" style={styles.checkboxIcon} />
                )}
            </View>
            <Text style={styles.checkboxLabel}>{doc.name_vernacular}</Text>
        </TouchableOpacity>
        ))}

        </View>

         {errorMessage.length > 0 && (
              <Text style={styles.errorText}>{errorMessage}</Text>
        )}

        <View style={styles.nextConatainer}>
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextText}>Next</Text>
              </TouchableOpacity>
            </View>
      </>
      ) : (
        // This part renders the document details
        <View style={styles.docDetailsContainer}>
               <View style={styles.docTextContaner}>
                  <Text style={styles.doctext}>Documentation</Text>
                </View>
                {selectedDocumentIds.map((id) => {
                  const doc = documentTypes.find(doc => doc.id === id);
                  const isDisabled = uploadedDocumentTypes.includes(doc.id) && doc.id !== 3;
                  return (
                    <View key={id} style={[styles.selectedOptionContainer, isDisabled ? styles.disabledContainer : {}]}>
                          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                              <Image source={require('../../../assets/images/document.png')} style={{marginRight: 10}}/>
                              <Text style={[styles.docDetailText, isDisabled ? styles.disabledText : {}]}>{doc ? doc.name_vernacular : 'Unknown Document'}</Text>
                          </View>
                          <TouchableOpacity 
                                    onPress={() => pickDocument(id)} 
                                    style={[styles.uploadContainer, isDisabled ? styles.disabledUploadContainer : {}]}
                                    disabled={isDisabled}
                           >
                              <UploadIcon name="file-upload" size={18} color={isDisabled ? SECONDARY_COLOR : PRIMARY_COLOR} />
                          </TouchableOpacity>
                      </View>  
                  );
              })}
          {documents.length > 0 &&
          <>
          <View style={styles.documentdetailsContainer}>
          <Text style={styles.docHeading}>Uploaded Documents</Text>
          <FlatList
                data={documents}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.documentItem}>
                        <Text style={styles.docDetailText}> {`${index + 1}) ${item.name.length > 13 ? item.name.substring(0, 13) + '...' : item.name}`}</Text>
                        <TouchableOpacity onPress={() => removeDocument(index, item.docTypeId)}>
                         <Icon name="delete" size={20} color="red" />
                        </TouchableOpacity>
                    </View>
           )}
        />
           </View>
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
      )}
    </ScrollView>
    </View>
  );
};


export default CustomerDocumentation;