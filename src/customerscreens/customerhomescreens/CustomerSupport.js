import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, StatusBar} 
from 'react-native';
import HeaderContainer from '../../components/HeaderContainer';
import ContactButton from '../../components/ContactButton';



const handleCallPress = ()=>{

}

const handleChatPress = ()=>{
    
}

const CustomerSupport = ({navigation}) => {
  const [query, setQuery] = useState('');


  return (
    <View style={styles.mainContainer}>
     <StatusBar/>
      <HeaderContainer title="Support" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}/>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.helpContainer}>
        <Text style={styles.helpText}>How can we help</Text>
        <Text style={styles.availText}>We’re available for 24/7</Text>
      </View>
      <ContactButton iconName="chat" onPress={handleChatPress} title="Chat with us" />
      <ContactButton iconName="call" onPress={handleCallPress} title="Talk with us" />
      <View style={styles.separator} />
      <View style={styles.queryContainer}>
      <Text style={styles.label}>Queries:</Text>
      <TextInput
        style={styles.textArea}
        multiline
        numberOfLines={5}
        onChangeText={(text) => setQuery(text)}
        value={query}
        placeholder="Type your query here"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.qsButton}>
            <Text style={styles.qsText}>Submit</Text>
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
  helpContainer:{
    width: '90%',
    alignItems: 'left',
    marginLeft: 20,
    marginTop: 20,
  },
  helpText:{
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 22,
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
  queryContainer:{
    width: '90%',
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
  },
  qsButton:{
    width: 124,
    paddingVertical: 10,
    backgroundColor: '#1D9BF0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  qsText:{
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
    textAlign: 'center',
    color: 'white',
  }

  
});

export default CustomerSupport;