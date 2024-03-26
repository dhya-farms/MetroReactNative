import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions} 
from 'react-native';
import HeaderContainer from '../../components/HeaderContainer';
import { TextInput } from 'react-native-paper';
import { PRIMARY_COLOR } from '../../constants/constantstyles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';



  
const CustomerDocumentDelivery = ({route, navigation}) => {

  const selectedDocuments = route.params?.selectedDocuments ?? [];

    console.log("Selected Documents in Delivery:", selectedDocuments);

    const handleVerify = () => {
      navigation.navigate('SO Client', {
        screen: 'SO Customer Details',
        params: {
          deliveryComplete: true,
        },
      });
    };


   
    
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
         <View style={styles.docDetailsContainer}>
               <View style={styles.docTextContaner}>
                  <Text style={styles.doctext}>Documentation</Text>
                </View>
          {selectedDocuments.map((option) => (
            <View key={option} style={styles.selectedOptionContainer}>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Image source={require('../../../assets/images/document.png')} style={{marginRight: 10,}}/>
              <Text style={styles.docDetailText}>{option}</Text>
              </View>
              <Image source={require('../../../assets/images/download.png')}/>      
            </View>
          ))}
          <View style={styles.nextConatainer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleVerify}>
                <Text style={styles.nextText}>Verified</Text>
           </TouchableOpacity>
          </View>
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
    docDetailsContainer:{
        width: '90%',  
    },
    selectedOptionContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: PRIMARY_COLOR,
        borderRadius: 6,
        marginVertical: 10,
        padding: 10,
      },
      docDetailText:{
        fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: 14,
      },
      docTextContaner:{
        width: '90%',
        marginVertical: 10,
      },
      doctext:{
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 16,
      },
      nextConatainer:{
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
      },
      nextButton:{
        width: 115,
        height: 37,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 6,
      },
      nextText:{
        fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: 14,
        color: 'white'
      },
  });

export default CustomerDocumentDelivery;