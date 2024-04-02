import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, ScrollView, StatusBar} 
from 'react-native';
import HeaderContainer from '../../components/HeaderContainer';
import { TextInput } from 'react-native-paper';
import SubmitSaveButton from '../../components/SubmiSaveButton';
import styles from '../../constants/styles/customerprofilestyles';


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

const CustomerProfile = ({navigation}) => {
  const [inputValues, setInputValues] = useState({
    emailId: '',
    mobileNo: '',
    address: '',
    aop: '',
    occupation: '',
    budget: '',
    type: '',
  });

  const handleInputChange = (name, value) => {
    setInputValues(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const inputFields = [
    { name: 'emailId', label: 'Email Id', keyboardType: 'email-address' },
    { name: 'mobileNo', label: 'Mobile', keyboardType: 'numeric' },
    { name: 'address', label: 'Address' },
    { name: 'aop', label: 'Area Of Purpose' },
    { name: 'occupation', label: 'Occupation' },
    { name: 'budget', label: 'Budget' },
    { name: 'type', label: 'Type' },
  ];

  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar/>
      <HeaderContainer title="Profile" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}/>
      <View style={styles.imageContainer}>
      <Image source={require('../../../assets/images/person.png')} style={styles.personImage} />
      </View>
      <Text style={styles.cnText}>Hari Kowshik</Text>
      <View style={styles.textInputContainer}>
      {inputFields.map((field) => (
          <FloatingLabelInput
            key={field.name}
            label={field.label}
            value={inputValues[field.name]}
            onChangeText={(value) => handleInputChange(field.name, value)}
            keyboardType={field.keyboardType}
          />
        ))} 
      </View>
      <SubmitSaveButton onPress={()=>{}} text1="Save" text2="Submit Queries"/>
    </ScrollView>
  );
};



export default CustomerProfile;