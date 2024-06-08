import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, StatusBar} 
from 'react-native';
import HeaderContainer from '../../components/HeaderContainer';
import FaqDropdown from '../../components/FaqDropdown';
import { fetchFAQs } from '../../apifunctions/fetchFaqApi';
import Toast from 'react-native-toast-message';
import { postFAQQuestion } from '../../apifunctions/postQuestionsApi';



const CustomerFaq = ({navigation}) => {
  const [faqs, setFaqs] = useState([]);
  const [query, setQuery] = useState('');
  const [showMore, setShowMore] = useState(false);

  
  useEffect(() => {
    const initFaqs = async () => {
      try {
        const data = await fetchFAQs();
        setFaqs(data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };

    initFaqs();
  }, []);

   const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleSubmitQuestion = async () => {
    if (query.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Invalid Input, Please enter a question before submitting.',
        visibilityTime: 2200
      });
      return;
    }
    try {
      const result = await postFAQQuestion(query);
      Toast.show({
        type: 'success',
        text1: 'Question uploaded successfully. We will get back to you within 24-48 hours.',
        visibilityTime: 3000,  
        
      });
      setQuery(''); // Clear the input field after successful submission
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to submit your question. Please try again later.'
      });
    }
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
        <TouchableOpacity style={styles.qsButton} onPress={handleSubmitQuestion}>
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
    textAlign: 'left',
    textAlignVertical: 'top'  
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