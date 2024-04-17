import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions, StatusBar} 
from 'react-native';
import HeaderContainer from '../../components/HeaderContainer';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CustomRight = ({}) => (
    <Image
      source={require('../../../assets/images/bellicon.png')}
      style={{ width: 24, height: 24 }}
    />
  );

const FloatingLabelInput = ({ label, value, onChangeText, iconName, ...props }) => {
    return (
      <View style={styles.tiContainer}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        mode="outlined"
        outlineColor="#1D9BF0" // Here you set the border color
        theme={{ colors: { primary: '#1D9BF0', underlineColor: 'transparent' } }}
        right={<CustomRight />}
        {...props}
      />
      <Icon name={iconName} size={20} color="#1D9BF0" style={{ position: 'absolute', right: 40 }}/>
      </View>
    );
  };



const SalesOfficerDetails = ({navigation}) => {

    const [inputValues, setInputValues] = useState({
      joinedDate: '',
      mailId: '',
      address: '',
      metroPoints: '',
      customerHandles: '',
    });

    const handleInputChange = (name, value) => {
      setInputValues(prevState => ({
        ...prevState,
        [name]: value,
      }));
    };

    const inputFields = [
      { name: 'joinedDate', label: 'Joined Date', iconName: 'calendar-alt',  keyboardType: 'numeric' },
      { name: 'mailId', label: 'Email Id', iconName: 'at', keyboardType: 'email-address' },
      { name: 'address', label: 'Address' ,iconName: 'address-card',},
      { name: 'metroPoints', label: 'Metro Points', iconName: 'star', },
      { name: 'customerHandles', label: 'Occupation', iconName: "headset" },
    ];
  

    
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar/>
      <HeaderContainer title="Sales Officer Details" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.navigate("So Manager")}}/>
      <View style={styles.imageContainer}>
       <Image source={require('../../../assets/images/gsoperson.jpg')} style={styles.personImage} />
      </View>
      <View style={styles.soTextContainer}>
        <Text style={styles.soText}>Hari Kowshick</Text>
        <Text style={[styles.soText, {fontWeight: '400', fontSize: 14}]}>+91-9486077810</Text>
      </View>
      <View style={styles.smIconsContainer}>
        <View style={{marginHorizontal: 20}}>
        <Image source={require("../../../assets/images/wpicon.png")}/>
        </View>
        <View style={{marginHorizontal: 20}}>
        <Image source={require("../../../assets/images/clicon.png")}/>
        </View>
        <View style={{marginHorizontal: 20}}>
        <Image source={require("../../../assets/images/mpicon.png")}/>
        </View>
        </View>
        {inputFields.map((field) => (
          <FloatingLabelInput
            key={field.name}
            label={field.label}
            value={inputValues[field.name]}
            onChangeText={(value) => handleInputChange(field.name, value)}
            iconName={field.iconName}
            keyboardType={field.keyboardType}
          />
        ))} 
        <View style={styles.acContainer}>
            <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("SO Approvals")}>
                <Text style={styles.btnText}>Approvals</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: 'white',
             borderWidth: 1, borderColor: '#1D9BF0'}]}>
                <Text style={[styles.btnText, {color: '#1D9BF0'}]}>Customers</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 50,
  },
  imageContainer:{
    width: 150,
    height: 150,
    borderRadius: 150/2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  personImage:{
    width: '100%',
    height: '100%',
    borderRadius: 75,
    resizeMode: 'cover'    
  },
  soTextContainer:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  soText:{
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 5
  },
  smIconsContainer:{
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 45, // Set the height
    backgroundColor: 'white', // Set the background color
    marginVertical: 5,
    marginRight: 10,
    borderColor: '#1D9BF0',
    // Add a bottom margin
  },
  tiContainer:{
    width: '90%', 
    marginHorizontal: 10,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  acContainer:{
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  button:{
    width: 110,
    height: 36,
    backgroundColor: '#1D9BF0',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText:{
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
    color: '#FFFFFF'
  }
});

export default SalesOfficerDetails;