import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions, StatusBar} 
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
        theme={{ colors: { primary: '#1D9BF0', underlineColor: 'transparent' } }}
        {...props}
      />
    );
  };

const CustomerProfile = ({navigation}) => {
    const [emailId, setEmailId] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [address, setAddress] = useState('');
    const [aop, setAop] = useState('');
    const [occupation, setOccupation] = useState('')
    const [budget, setBudget] = useState('')
    const [type, setType] = useState('')

  
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
      <FloatingLabelInput
            label="Email Id"
            value={emailId}
            onChangeText={setEmailId}
            keyboardType="email-address"
          />
          <FloatingLabelInput
            label="Mobile"
            value={mobileNo}
            onChangeText={setMobileNo}
            keyboardType="numeric"
          />
          <FloatingLabelInput
            label="Address"
            value={address}
            onChangeText={setAddress}
          />
          <FloatingLabelInput
            label="Area Of Purpose"
            value={aop}
            onChangeText={setAop}
          />
          <FloatingLabelInput
            label="Occupation"
            value={occupation}
            onChangeText={setOccupation}
          />
          <FloatingLabelInput
            label="Budget"
            value={budget}
            onChangeText={setBudget}
          />
          <FloatingLabelInput
            label="Type"
            value={type}
            onChangeText={setType}
          />
      </View>
      <SubmitSaveButton onPress={()=>{}} text1="Save" text2="Submit Queries"/>
    </ScrollView>
  );
};



export default CustomerProfile;