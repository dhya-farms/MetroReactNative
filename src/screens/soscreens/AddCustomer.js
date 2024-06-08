import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity} from 'react-native';
import SortHeader from '../../components/SortHeader';
import HeaderContainer from '../../components/HeaderContainer';
import ContactForm from '../../components/ContactForm';
import styles from '../../constants/styles/addcustomerstyles';
import * as ImagePicker from 'expo-image-picker';
import { addCustomerApi } from '../../apifunctions/addCustomerApi';
import { useFocusEffect } from '@react-navigation/native';
import { fetchPropertyTypes } from '../../apifunctions/propertyTypesApi';


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
    const [imageData, setImageData] = useState(null);
    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [typeOptions, setTypeOptions] = useState([]);
    const [aopOptions, setAopOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
  
      const initFetch = async () => {
    
        setLoading(true);
    
        try {
          const { propertyTypes, areaOfPurpose } = await fetchPropertyTypes(paramsToken);
  
          console.log("propertyTypes", propertyTypes)
          console.log("areaOfPurpose", areaOfPurpose)
    
          setTypeOptions(propertyTypes.map(t => ({ key: t.key, name: t.name })));
          setAopOptions(areaOfPurpose.map(a => ({ key: a.key, name: a.name })));
          
    
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
    
      initFetch();
    }, []);
  

    useFocusEffect(
      React.useCallback(() => {
          // Reset the form visibility state every time the screen is focused
          setShowContactForm(true);
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
        const areaOfPurposeKeys = customerDetails.aop.map(a => parseInt(a.key));
        const propertyTypeKeys = customerDetails.type.map(t => parseInt(t.key));

        setPreferences({
            area_of_purpose: areaOfPurposeKeys,
            property_types: propertyTypeKeys,
            budget: customerDetails.budget // Assuming 'budget' is directly an integer or string that doesn't require conversion
        });

        setShowContactForm(false); // Hide contact form and show addImgContainer
    };
    const selectImage = async () => {
      try {
        // Request permission to access the media library
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (!permissionResult.granted) {
          alert("You've refused to allow this app to access your photos!");
          return;
        }
    
        // Launch the image picker
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images, // Ensure only images can be picked
        });
    
    
        // Check if the operation was not cancelled and if an image was selected
        if (!pickerResult.cancelled && pickerResult.assets && pickerResult.assets.length > 0) {
          const selectedImage = pickerResult.assets[0];
    
          // Check the MIME type of the selected image
          if (selectedImage.mimeType === 'image/jpeg' || selectedImage.mimeType === 'image/png') {
            setImageData({
              uri: selectedImage.uri,
              type: selectedImage.mimeType // Store MIME type directly from the asset
            });
            setErrorMessage(''); // Clear any existing error messages
          } else {
           
            setErrorMessage('Only JPEG or PNG images are allowed.');
          }
        } else {
          console.log('No image selected');
        }
      } catch (error) {
        console.error("ImagePicker Error: ", error);
        setMessage('Error picking image.'); // General error message for exceptions
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
        const result = await addCustomerApi(paramsToken, customerData, imageData);
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
            setImageData(null);
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
        <ContactForm onContinuePress={handleContinuePress}  typeOptions={typeOptions} aopOptions={aopOptions}/>
     </View>  
     )}
     {!showContactForm && (<View style={styles.addImgContainer}>
      <View style={styles.imageContainer}>
      <Image 
        source={imageData ? { uri: imageData.uri } : require('../../../assets/images/gsoperson.jpg')} 
        style={styles.personImage} 
      />
    </View>
      <>
        {errorMessage && (
            <Text style={[styles.message, {color: 'red'}]}>{errorMessage}</Text>
          )}
      </>
      <TouchableOpacity style={styles.btnContainer} onPress={selectImage}>
        <Text style={styles.btnText}>Add image</Text>
      </TouchableOpacity>
      <View style={styles.textcontainer}>
        <Text style={styles.nameText}>{customerName}</Text>
        <Text style={styles.mbText}>{customerMobile}</Text>
      </View>
     <>{message && <Text style={styles.message}>{message}</Text>}</>
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.doneButton} onPress={handleAddCustomer}>
              <Text style={styles.doneButtonText}>done</Text>
            </TouchableOpacity>
      </View>
     </View>
       )}
    </ScrollView>
    </View>
  );
};



export default AddCustomerScreen;