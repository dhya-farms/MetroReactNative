import React, { useState } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity} from 'react-native';
import SortHeader from '../../components/SortHeader';
import HeaderContainer from '../../components/HeaderContainer';
import ContactForm from '../../components/ContactForm';
import styles from '../../constants/styles/addcustomerstyles';
import * as ImagePicker from 'expo-image-picker';
import { addCustomerApi } from '../../apifunctions/addCustomerApi';
import { useFocusEffect } from '@react-navigation/native';




const PropertyType = {
  DTCP_PLOTS: 1,
  FARMLANDS: 2,
  FLAT: 3,
  VILLA: 4,
};

const AreaOfPurpose = {
  RESIDENTIAL: 1,
  COMMERCIAL: 2,
};


const mapInputToEnum = (input, enumType) => {
  let values = input.toUpperCase().split(',').map(item => item.trim()); // Assuming CSV input and trim spaces
  return values.map(value => {
      let key = Object.keys(enumType).find(key => enumType[key] === value || key === value);
      return enumType[key];
  }).filter(value => value); // Filter out undefined values if input does not match
};

const AddCustomerScreen = ({route, navigation}) => {
    const paramsToken = route.params?.token
    const propertyId = route.params?.propertyId;
    const fromPropertyDetails = route.params?.fromPropertyDetails;
    const [showContactForm, setShowContactForm] = useState(true);
    const [customerName, setCustomerName] = useState('');
    const [customerMobile, setCustomerMobile] = useState('');
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [occupation, setOccupation] = useState('')
    const [preferences, setPreferences] = useState({ area_of_purpose: [], property_types: [] });
    const [showDoneButton, setShowDoneButton] = useState(false)
    const [imageUri, setImageUri] = useState(null);
    const [message, setMessage] = useState('')

    useFocusEffect(
      React.useCallback(() => {
          // Reset the form visibility state every time the screen is focused
          setShowContactForm(true);
          setShowDoneButton(false);
          setMessage(''); // Optionally clear any messages
      }, [])
  );
    

    if (propertyId) {
      // Code that requires a valid propertyId
      console.log("Using propertyId:", propertyId);
    } else {
        // Handle cases where no propertyId is provided
        console.log("No propertyId provided");
    }



    const handleContinuePress = (customerDetails) => {
        setCustomerName(customerDetails.name);
        setCustomerMobile(customerDetails.mobileNumber);
        setEmail(customerDetails.email);
        setAddress(customerDetails.address)
        setOccupation(customerDetails.occupation)
        const areaOfPurpose = mapInputToEnum(customerDetails.aop.join(','), AreaOfPurpose);
        const propertyTypes = mapInputToEnum(customerDetails.type.join(','), PropertyType);
        setPreferences({
          area_of_purpose: areaOfPurpose,
          property_types: propertyTypes,
          budget: customerDetails.budget // Make sure 'budget' is being passed in 'customerDetails'
      });

        setShowContactForm(false); // Hide contact form and show addImgContainer
    };
    const selectImage = async () => {
      try {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("You've refused to allow this app to access your photos!");
          return;
        }
    
        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log('Picker result:', pickerResult); // Correctly logs the full result
    
        // This condition checks if the operation was not cancelled and assets are available
        if (!pickerResult.cancelled && pickerResult.assets && pickerResult.assets.length > 0) {
          const selectedImageUri = pickerResult.assets[0].uri;
          setImageUri(selectedImageUri);
          setShowDoneButton(true);
        } else {
          console.log('No image selected'); // This should not log if an image is successfully selected
        }
      } catch (error) {
        console.error("ImagePicker Error: ", error);
      }
    };

    const handleAddCustomer = async () => {
      const customerData = {
        name: customerName,
        email: email,
        mobile_no: customerMobile,
        address: address,
        occupation: occupation,
        preferences: preferences,
      };
    
      try {
        const result = await addCustomerApi(paramsToken, customerData);
        console.log(customerData);
        setMessage("Customer added successfully");
    
        // Set a timeout to reset the form and message
        setTimeout(() => {
          if (fromPropertyDetails && propertyId) {
            navigation.navigate("SO Sites", {
              screen: "SO Properties Details",
              params: { propertyId: propertyId },
            }); // Go back to Property Details screen
          } else {
            // Reset the form and show the initial contact form state
            setMessage('');
            setShowContactForm(true);
            setCustomerName('');
            setCustomerMobile('');
            setEmail('');
            setOccupation('');
            setPreferences({ area_of_purpose: [], property_types: [] });
            setImageUri(null);
            setShowDoneButton(false);
          }
        }, 3000);
    
      } catch (error) {
        setMessage("Error: " + (error.message || "Failed to add customer"));
        // If you want the error message to disappear as well
        setTimeout(() => {
          setMessage('');
        }, 3000);
      }
    };
    
  
   
    

  
  return (
    <View style={styles.mainContainer}>
      <HeaderContainer title="Add Customer" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}/>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} >
     {showContactForm && <SortHeader title="Contact Form"  isSortVisible={false} />}
     {showContactForm && ( <View style={[styles.cfContainer]}>
        <ContactForm onContinuePress={handleContinuePress}/>
     </View>  
     )}
     {!showContactForm && (<View style={styles.addImgContainer}>
      <View style={styles.imageContainer}>
      <Image 
        source={imageUri ? { uri: imageUri } : require('../../../assets/images/gsoperson.jpg')} 
        style={styles.personImage} 
      />
    </View>
      <TouchableOpacity style={styles.btnContainer} onPress={selectImage}>
        <Text style={styles.btnText}>Add image</Text>
      </TouchableOpacity>
      <View style={styles.textcontainer}>
        <Text style={styles.nameText}>{customerName}</Text>
        <Text style={styles.mbText}>{customerMobile}</Text>
      </View>
      {showDoneButton && (
      <>{message && <Text style={styles.message}>{message}</Text>}
      <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.doneButton} onPress={handleAddCustomer}>
                <Text style={styles.doneButtonText}>done</Text>
            </TouchableOpacity>
       </View>
       </>
      )}
     </View>
       )}
    </ScrollView>
    </View>
  );
};



export default AddCustomerScreen;