import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet , Linking} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const AdvisorCard = ({ advisor }) => {


  const handleCall = () => {
    Linking.openURL(`tel:${advisor.mobile_no}`);
  };

  const handleWhatsApp = () => {
    // Construct a message or use a default one
    let message = "Hello, I need some information.";
    Linking.openURL(`https://wa.me/${advisor.mobile_no}?text=${encodeURIComponent(message)}`);
  };
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Your Advisor</Text>
        
        <View style={styles.advisorContainer}>
          <View style={styles.detailsWithImage}>
            <View style={styles.details}>
            <Text style={styles.name}>{advisor.name}</Text>
              <View style={styles.statusContainer}>
              <Text style={styles.status}>Status: {advisor.is_active ? 'Available' : 'Offline'}</Text>
              <MaterialIcons name={advisor.is_active ? "check-circle" : "cancel"} size={14} color={advisor.is_active ? "#34C759" : "#FF3B30"} />
              </View>
              <Text style={styles.points}>Metro Points: {advisor.points}</Text>
            </View>
            <Image
              source={require('../../assets/images/person.png')} // Replace with the actual path to your image
              style={styles.avatar}
            />
          </View>
  
          <View style={styles.separator} />
  
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={[styles.button, styles.callButton]} onPress={handleCall}>
              <Text style={styles.buttonText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.whatsappButton]} onPress={handleWhatsApp}>
              <Text style={styles.buttonText}>Whatsapp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    card: {
      width: '95%',
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
      width: '95%', // You might need to adjust this based on your layout
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
  
