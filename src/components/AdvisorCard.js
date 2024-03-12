import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const AdvisorCard = () => {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Your Advisor</Text>
        
        <View style={styles.advisorContainer}>
          <View style={styles.detailsWithImage}>
            <View style={styles.details}>
              <Text style={styles.name}>Yashwanth</Text>
              <View style={styles.statusContainer}>
                <Text style={styles.status}>Status: Available</Text>
                <MaterialIcons name="check-circle" size={14} color="#34C759" />
              </View>
              <Text style={styles.points}>Metro Points: 8</Text>
            </View>
            <Image
              source={require('../../assets/images/person.png')} // Replace with the actual path to your image
              style={styles.avatar}
            />
          </View>
  
          <View style={styles.separator} />
  
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={[styles.button, styles.callButton]}>
              <Text style={styles.buttonText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.whatsappButton]}>
              <Text style={styles.buttonText}>Whatsapp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    card: {
      backgroundColor: '#FFF',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1,
      elevation: 3,
      width: '80%',
      alignItems: 'center',
      marginBottom: 16,
    },
    title: {
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 16,
      color: '#000',
      alignSelf: 'flex-start',
      margin: 20,
    },
    detailsWithImage: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    advisorContainer: {
      width: '90%', // You might need to adjust this based on your layout
      borderWidth: 1,
      borderColor: '#ADADAD',
      borderRadius: 10,
      padding: 16,
    },
    details: {
      maxWidth: '60%',
    },
    avatar: {
      width: 64,
      height: 64,
      borderRadius: 32,
    },
    separator: {
      height: 1,
      backgroundColor: '#ADADAD',
      width: '100%',
      marginVertical: 16,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 4,
      flexGrow: 1, // Allows buttons to grow and fill space
      marginHorizontal: 5,
    },
    callButton: {
      backgroundColor: '#1D9BF0',
    },
    whatsappButton: {
      backgroundColor: '#25D366',
    },
    buttonText: {
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 14,
      textAlign: 'center',
      color: 'white' // Centers text in the button
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },
    name:{
      fontFamily: 'Poppins',
      fontWeight: '600',
      fontSize: 20,
    },
    status: {
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 12,
      marginRight: 4,
      color: 'black',
    },
    points: {
      fontFamily: 'Poppins',
      fontWeight: '400',
      fontSize: 10,
      color: '#000',
      marginTop: 4,
    },
  });
  
export default AdvisorCard;
  
