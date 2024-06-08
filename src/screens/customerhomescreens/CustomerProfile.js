import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity,ActivityIndicator} 
from 'react-native';
import HeaderContainer from '../../components/HeaderContainer';
import { TextInput } from 'react-native-paper';
import styles from '../../constants/styles/customerprofilestyles';
import CustomDropdownInput from '../../components/CustomInput';
import { fetchCustomerDetails } from '../../apifunctions/fetchCustomerDetailsApi';
import ProfileHeader from '../../components/ProfileHeader';
import updateCustomerDetailsApiCall from '../../apifunctions/UpdateCustomerApi';
import { useIsFocused } from '@react-navigation/native';
import { PRIMARY_COLOR } from '../../constants/constantstyles/colors';
import Toast from 'react-native-toast-message';
import { fetchPropertyTypes } from '../../apifunctions/propertyTypesApi';




const FloatingLabelInput = ({ label, value, onChangeText,editable = true, ...props }) => {
    return (
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        mode="outlined"
        outlineColor={editable ? "#1D9BF0" : "#D9D9D9"}
        theme={{ colors: { primary: '#1D9BF0', underlineColor: 'transparent', onSurface: editable ? '#424242' : "#D9D9D9"} }}
        editable={editable}
        {...props}
      />
    );
  };
  

const CustomerProfile = ({route, navigation}) => {
  const [aop, setAop] = useState([]);
  const [type, setType] = useState([])
  const [saveMessage, setSaveMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [typeOptions, setTypeOptions] = useState([]);
  const [aopOptions, setAopOptions] = useState([]);
  const [error, setError] = useState(null);
  const isFocused = useIsFocused(); 
  const [inputValues, setInputValues] = useState({
    name: '',
    emailId: '',
    mobileNo: '',
    address: '',
    occupation: '',
    budget: '',
  });

  useEffect(() => {
    if (isFocused) {
      setIsEditMode(false); // Reset edit mode whenever this screen is focused
    }
  }, [isFocused]); 

  const handleCancel = ()=>{
    setIsEditMode(false)
  }

  useEffect(() => {
  
    const initFetch = async () => {
      const paramsToken = route.params?.token;
      const paramsUserId = route.params?.userId;
  
      setLoading(true);
  
      try {
        const { propertyTypes, areaOfPurpose } = await fetchPropertyTypes(paramsToken);
  
        setTypeOptions(propertyTypes.map(t => ({ key: t.key, name: t.name })));
        setAopOptions(areaOfPurpose.map(a => ({ key: a.key, name: a.name })));
        
  
        // Fetch customer details
        const details = await fetchCustomerDetails(paramsToken, paramsUserId);
        setType(details.preferences?.property_types.map(typeId => 
          propertyTypes.find(pt => pt.key === typeId.toString())
        ) || []);
        setAop(details.preferences?.area_of_purpose.map(aopId => 
          areaOfPurpose.find(ap => ap.key === aopId.toString())
        ) || []);
  
        setInputValues({
          name: details.name || '',
          emailId: details.email || '',
          mobileNo: details.user?.mobile_no || '',
          address: details.address || '',
          occupation: details.occupation || '',
          budget: details.preferences?.budget?.toString() || '',
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    initFetch();
  }, []);

  if (loading) return <ActivityIndicator size="large" color={PRIMARY_COLOR} style={styles.loadingIndicator} />;
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
      mobile_no: inputValues.mobileNo,
      occupation: inputValues.occupation,
      address: inputValues.address,

      preferences: {
        area_of_purpose: aop.map(a => parseInt(a.key)), 
        property_types: type.map(t => parseInt(t.key)),
        budget: parseInt(inputValues.budget)
      }
    };
    setLoading(true);
    try {
      await updateCustomerDetailsApiCall(paramsUserId, updateData, paramsToken);
      Toast.show({
        type: 'success',
        text1: 'Customer details updated successfully',
        visibilityTime: 1900,  // Toast will be visible for 2 seconds
        text1Style: {
          fontFamily: 'Poppins',
          fontSize: 12,
          fontWeight: '400'
        }
      });
      setTimeout(() => {
        // Here you can re-fetch the customer details to reflect the update or simply update the state
        setIsEditMode(false);
        setSaveMessage('');
      }, 2000);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to update customer details',
        visibilityTime: 2000,  // Toast will be visible for 2 seconds
        text1Style: {
          fontFamily: 'Poppins',
          fontSize: 12,
          fontWeight: '400'
        }
      });
    } finally {
      setLoading(false);
    }
  };
  

  
  return (
    <View style={styles.mainContainer}>
       <HeaderContainer
        title="Profile"
        ImageLeft={require('../../../assets/images/back arrow icon.png')}
        ImageRight={require('../../../assets/images/belliconblue.png')}
        onPress={() => { navigation.goBack() }}
        hideBackArrow={isEditMode}
      />
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {
        isEditMode ? (
          <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.textInputContainer}>
          {
              inputFields.map((field) => {
                const isMobileNoField = field.name === 'mobileNo';
                return (
                  <FloatingLabelInput
                    key={field.name}
                    label={field.label}
                    value={inputValues[field.name]}
                    onChangeText={(value) => handleInputChange(field.name, value)}
                    keyboardType={field.keyboardType}
                    editable={!isMobileNoField}
                    outlineColor={!isMobileNoField ? "#1D9BF0" : "#D9D9D9"}
                  />
                );
              })
            }
            <View style={[styles.customTextinputContainer]}>
            <CustomDropdownInput
                label="Type"
                selectedValues={type}
                setSelectedValues={setType}
                options={typeOptions}
              />
             </View>
             <View style={[styles.customTextinputContainer]}>
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
            <View style={styles.cancelSaveContainer}>
              <TouchableOpacity style={[styles.saveBtn, {backgroundColor: 'white', borderWidth: 1, borderColor: PRIMARY_COLOR}]} onPress={handleCancel}>
                <Text style={[styles.saveText, {color: PRIMARY_COLOR}]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
           </View>
          </View>
          </View>
        ) : (
         <View style={{width: '100%'}}>
          <ProfileHeader
              onEditPress={toggleEditMode}
              inputValues={inputValues}
              type={type}
              aop={aop}
            />
         </View>
        )
      }
    </ScrollView>
    </View>
  );
};



export default CustomerProfile;