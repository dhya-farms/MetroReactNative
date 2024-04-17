import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StatusBar, TouchableOpacity} 
from 'react-native';
import HeaderContainer from '../../components/HeaderContainer';
import { TextInput } from 'react-native-paper';
import styles from '../../constants/styles/customerprofilestyles';
import CustomDropdownInput from '../../components/CustomInput';
import { fetchCustomerDetails } from '../../apifunctions/fetchCustomerDetailsApi';
import ProfileHeader from '../../components/ProfileHeader';
import updateCustomerDetailsApiCall from '../../apifunctions/UpdateCustomerApi';



const propertyTypeMappings = {
  1: 'DTCP PLOTS',
  2: 'Farmlands',
  3: 'Flat',
  4: 'Villa',
};

const areaOfPurposeMappings = {
  1: 'Residential',
  2: 'Commercial',
};

const FloatingLabelInput = ({ label, value, onChangeText, ...props }) => {
    return (
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        mode="outlined"
        outlineColor="#1D9BF0" // Here you set the border color
        theme={{ colors: { primary: '#1D9BF0', underlineColor: 'transparent', text: 'black' } }}
        {...props}
      />
    );
  };

  const getIdsFromSelection = (selectionArray, mappings) => {
    const ids = selectionArray.map(item => {
      return Object.keys(mappings).find(key => mappings[key] === item);
    });
    return ids.filter(id => id !== undefined).map(Number);
  };
  

const CustomerProfile = ({route, navigation}) => {
  const [aop, setAop] = useState([]);
  const [type, setType] = useState([])
  const [saveMessage, setSaveMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState(null);
  const aopOptions = ['Residential', 'Commercial'];
  const typeOptions = ['DTCP PLOTS', 'Farmlands', 'Flat', 'Villa'];
  const [inputValues, setInputValues] = useState({
    name: '',
    emailId: '',
    mobileNo: '',
    address: '',
    occupation: '',
    budget: '',
  });

  useEffect(() => {
    const paramsToken = route.params?.token;
    const paramsUserId = route.params?.userId; 
    setLoading(true);
  
    fetchCustomerDetails(paramsToken, paramsUserId)
      .then(details => {
        // Assuming the API returns a single customer object directly
        const mappedTypes = details.preferences?.property_types.map(type => propertyTypeMappings[type]) || [];
        const mappedAop = details.preferences?.area_of_purpose.map(aop => areaOfPurposeMappings[aop]) || [];
  
        setAop(mappedAop);
        setType(mappedTypes);
  
        setInputValues({
          name: details.name || '',
          emailId: details.email || '',
          mobileNo: details.user?.mobile_no || '',
          address: details.address || '',
          occupation: details.occupation || '',
          budget: details.preferences?.budget?.toString() || '',
        });
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);// Dependency array is empty, so this effect runs once on mount

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode)
  };

  const handleInputChange = (name, value) => {
    setInputValues(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const inputFields = [
    { name: 'name', label: 'Name', },
    { name: 'emailId', label: 'Email Id', keyboardType: 'email-address' },
    { name: 'mobileNo', label: 'Mobile', keyboardType: 'numeric' },
    { name: 'address', label: 'Address' },
    { name: 'occupation', label: 'Occupation' },
    { name: 'budget', label: 'Budget' },
  ];

  const handleSave = async () => {
    const paramsToken = route.params?.token;
    const paramsUserId = route.params?.userId; 
    const updateData = {
      name: inputValues.name,
      email: inputValues.emailId,
      occupation: inputValues.occupation,
      address: inputValues.address,
      preferences: {
        area_of_purpose: getIdsFromSelection(aop, areaOfPurposeMappings), 
        property_types: getIdsFromSelection(type, propertyTypeMappings), 
        budget: parseInt(inputValues.budget)
      }
    };
    setLoading(true);
    try {
      await updateCustomerDetailsApiCall(paramsUserId, updateData, paramsToken);
      setSaveMessage('Customer details updated successfully');
      setTimeout(() => {
        // Here you can re-fetch the customer details to reflect the update or simply update the state
        setIsEditMode(false);
        setSaveMessage('');
      }, 2000);
    } catch (error) {
      setSaveMessage('Failed to update customer details');
    } finally {
      setLoading(false);
    }
  };
  

  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <HeaderContainer
        title="Profile"
        ImageLeft={require('../../../assets/images/back arrow icon.png')}
        ImageRight={require('../../../assets/images/belliconblue.png')}
        onPress={() => { navigation.goBack() }}
      />
      {
        isEditMode ? (
          <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.textInputContainer}>
            {inputFields.map((field) => (
              <FloatingLabelInput
                key={field.name}
                label={field.label}
                value={inputValues[field.name]}
                onChangeText={(value) => handleInputChange(field.name, value)}
                keyboardType={field.keyboardType}
                disabled={field.name === 'mobileNo'} 
              />
            ))}
            <View style={[styles.customTextinputContainer, { zIndex: 7000 }]}>
              <CustomDropdownInput
                label="Type"
                selectedValues={type}
                setSelectedValues={setType}
                options={typeOptions}
              />
            </View>
            <View style={styles.customTextinputContainer}>
              <CustomDropdownInput
                label="Area Of Purpose"
                selectedValues={aop}
                setSelectedValues={setAop}
                options={aopOptions}
              />
            </View>
            {saveMessage !== '' && (
            <Text style={styles.saveMessage}>{saveMessage}</Text>
            )}
           <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
           </TouchableOpacity>
          </View>
          </View>
        ) : (
         <View style={{width: '100%'}}>
          <ProfileHeader
            onEditPress={toggleEditMode}
            inputValues={inputValues} 
            type={type.join(", ")} // Assuming type is an array, join the elements into a string
            aop={aop.join(", ")} // Assuming aop is an array, join the elements into a string
          />
         </View>
        )
      }
    </ScrollView>
  );
};



export default CustomerProfile;