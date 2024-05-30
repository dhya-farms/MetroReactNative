import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions, TextInput, StatusBar} 
from 'react-native';
import HeaderContainer from '../../components/HeaderContainer';
import FaqDropdown from '../../components/FaqDropdown';



const CustomerFaq = ({navigation}) => {
  const [query, setQuery] = useState('');
  const [showMore, setShowMore] = useState(false);

  const faqs = [
    { question: "What types of properties do Metro City Developers offer?", 
    answer: "We specialize in a variety of property types, including residential , luxury villas, commercial spaces, and agricultural lands, tailored to meet the needs and preferences of our clients." },
    { question: "Can Metro City Developers assist with property financing?", 
    answer: "Yes, we offer financial guidance and assistance, providing options that cater to the diverse financial needs of our clients, from mortgages to bespoke financing solutions." },
    { question: "Does Metro City Developers handle the entire purchasing process?", 
    answer: "Absolutely. From property selection, financial advice, to finalizing the paperwork, we manage the full spectrum of the purchasing process to ensure a smooth and hassle-free experience." },
    { question: "How does Metro City Developers ensure the quality of their properties?", 
    answer: "Our properties undergo rigorous quality checks and are developed using the highest construction standards to ensure that they not only meet but exceed industry benchmarks." },
    { question: "Can international clients buy property through Metro City Developers?", 
    answer: "Yes, we work with both local and international clients. We have a multilingual team ready to assist clients from around the world in finding their ideal property." },
    { question: "How can I get started with Metro City Developers?", 
    answer: "Simply reach out to us via our contact form, email, or phone. Our team is ready to discuss your needs and help you begin your journey towards finding your perfect property." },
   ];

   const toggleShowMore = () => {
    setShowMore(!showMore);
  };


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
      {faqs.slice(0, showMore ? faqs.length : 3).map((faq, index) => (
          <FaqDropdown key={index} question={faq.question} answer={faq.answer} />
        ))}
      <TouchableOpacity onPress={toggleShowMore} style={{width: '100%', marginLeft: '12%'}}>
      <Text style={styles.quText}>{showMore ? "Less Questions -" : "More Questions +"}</Text>
      </TouchableOpacity>
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
    </View>
    <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.qsButton}>
            <Text style={styles.qsText}>Submit Questions</Text>
        </TouchableOpacity>
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
    width: '100%',
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
  buttonContainer:{
    width: '100%',
    marginTop: '2%',
    marginBottom: '10%',
  },
  quText: {
    fontFamily: 'Poppins',
    fontSize: 10,
    fontWeight: '500',
    color: '#1D9BF0',
    
  },
  queryContainer:{
    width: '90%',
    marginVertical: 10,
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
    width: '100%',
    alignSelf: 'center'
  },
  qsButton:{
    width: 146,
    paddingVertical: 10,
    backgroundColor: '#1D9BF0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: '5%',
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