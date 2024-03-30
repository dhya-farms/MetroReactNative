import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import HeaderContainer from '../../components/HeaderContainer';
import styles from '../../constants/styles/customerdocumentationstyles';
import SortHeader from '../../components/SortHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';


const options = ['Aadhar', 'Pan card', 'others'];

const CustomerDocumentation = ({route, navigation}) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showDocDetails, setShowDocDetails] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');



    const handleNext = () => {
        if (selectedOptions.length === 0) {
          setErrorMessage('Please select at least one document to proceed.');
        } else {
          setErrorMessage('');
          setShowDocDetails(true);
        }
      };

    const handleSelectAll = () => {
        if (isSelectedAll) {
          // If all are selected, deselect all.
          setSelectedOptions([]);
        } else {
          // If not all are selected, select all.
          setSelectedOptions([...options]);
        }
      };

      const handleSelectOption = (option) => {
        if (selectedOptions.includes(option)) {
          setSelectedOptions(selectedOptions.filter((currentOption) => currentOption !== option));
        } else {
          setSelectedOptions([...selectedOptions, option]);
        }
      };

      const handleVerify = () => {
        navigation.navigate('SO Client', {
          screen: 'SO Customer Details',
          params: {
            verificationComplete: true,
            paymentCompleted: route.params?.paymentCompleted,
            selectedDocuments: selectedOptions
          },
        });
      };

      const isSelectedAll = selectedOptions.length === options.length;
    
   
    
  return (
    <View style={styles.container}>
      <HeaderContainer title="Documentation" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}/>
      {!showDocDetails ? (
          // This part renders the checkbox list
      <>
      <SortHeader title="Required Document"  isSortVisible={false} />
      <View style={styles.checkBoxTextContainer}>
            <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={handleSelectAll} // Update this line
                >
            <View style={isSelectedAll ? styles.checkboxSelected : styles.checkbox}>
            {isSelectedAll && (
                <Icon name="check" size={16} color="white" style={styles.checkboxIcon} />
            )}
            </View>
            <Text style={styles.checkboxLabel}>Select all</Text>
        </TouchableOpacity>
            {options.map((option) => (
                <TouchableOpacity
                key={option}
                style={styles.checkboxContainer}
                onPress={() => handleSelectOption(option)}
                >
                <View style={selectedOptions.includes(option) ? styles.checkboxSelected : styles.checkbox}>
                    {selectedOptions.includes(option) && (
                    <Icon name="check" size={16} color="white" style={styles.checkboxIcon} /> // Add this line
                    )}
                </View>
                <Text style={styles.checkboxLabel}>{option}</Text>
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
          {selectedOptions.map((option) => (
            <View key={option} style={styles.selectedOptionContainer}>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Image source={require('../../../assets/images/document.png')} style={{marginRight: 10,}}/>
              <Text style={styles.docDetailText}>{option}</Text>
              </View>
              <Image source={require('../../../assets/images/download.png')}/>

              
            </View>
          ))}
          <View style={styles.nextConatainer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleVerify}>
                <Text style={styles.nextText}>Verified</Text>
           </TouchableOpacity>
          </View>
        </View>
      )}
    
    </View>
  );
};


export default CustomerDocumentation;