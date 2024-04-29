import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions, TextInput, StatusBar} 
from 'react-native';
import HeaderContainer from '../../components/HeaderContainer';
import FaqDropdown from '../../components/FaqDropdown';



const CustomerFaq = ({navigation}) => {
  const [query, setQuery] = useState('');


  return (
    <View style={styles.mainContainer}>
     <StatusBar
        backgroundColor="black" // Works on Android
        barStyle="light-content" // Works on iOS and Android
        />
      <HeaderContainer title="FAQ's" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}/>
     <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

      <View style={styles.faqContainer}>
        <Text style={styles.faqText}>Frequently asked questions</Text>
      </View>
      <FaqDropdown/>
      <FaqDropdown/>
      <FaqDropdown/>
      <FaqDropdown/>
      <Text style={styles.quText}>More Questions +</Text>
      <View style={styles.queryContainer}>
      <Text style={styles.label}>Your Questions:</Text>
      <TextInput
        style={styles.textArea}
        multiline
        numberOfLines={4}
        onChangeText={(text) => setQuery(text)}
        value={query}
        placeholder="Type Here"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.qsButton}>
            <Text style={styles.qsText}>Submit Questions</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,  // Use flex to take up the whole screen
    backgroundColor: 'white'
  },
  container: {
    width: '100%',  // Ensures the ScrollView takes the full width
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 50,
  },
  faqContainer:{
    width: '90%',
    alignItems: 'left',
    marginLeft: 20,
    marginTop: 20,
  },
  faqText:{
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 14,
    color: '#424242',
    marginBottom: 10,
  },
  availText:{
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
    color: '#424242',
    marginBottom: 10,
  },
  separator: {
    height: 2,
    backgroundColor: '#C4C4C4',
    width: '90%',
    marginVertical: 16,
    borderRadius: 10,
  },
  quText: {
    fontFamily: 'Poppins',
    fontSize: 10,
    fontWeight: '500',
    color: '#1D9BF0',
    alignSelf: 'flex-start', // Add this line to align the text to the left
    marginLeft: '12%', // Add this line to give it the same left margin as faqContainer
  },
  queryContainer:{
    width: '90%',
    marginLeft: 10,
    marginVertical: 15,
  },
  label: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#1D9BF0',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginBottom: 30,
    width: '88%',
    alignSelf: 'center'
  },
  qsButton:{
    width: 146,
    paddingVertical: 10,
    backgroundColor: '#1D9BF0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 20,
  },
  qsText:{
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
    textAlign: 'center',
    color: 'white',
  }

  
});

export default CustomerFaq;