import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Linking } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const EnquireContainer = () => {
    const phoneNumber = '7695941098';
    const email = 'ktsganeshkumar@gmail.com';
  
    const handlePhonePress = () => {
      // Use the Linking API to make a phone call
      let phoneUrl = `tel:${phoneNumber}`;
      Linking.openURL(phoneUrl).catch(err => console.error('An error occurred', err));
    };

    const handleWhatsAppPress = () => {
      // Use the Linking API to open WhatsApp
      let whatsappUrl = `https://wa.me/${phoneNumber}`;
      Linking.openURL(whatsappUrl).catch(err => console.error('An error occurred', err));
    };
  
    const handleEmailPress = () => {
      // Use the Linking API to send an email
      let emailUrl = `mailto:${email}`;
      Linking.openURL(emailUrl).catch(err => console.error('An error occurred', err));
    };
  return (
    <View style={styles.enContainer}>
    <TouchableOpacity style={styles.Enquirebutton} onPress={handlePhonePress}>
        <Text style={styles.enText}>Enquire Now</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.callButton} onPress={handleWhatsAppPress}>
    <FontAwesome name="whatsapp" size={20.96} color="white" /> 
    </TouchableOpacity>
    <TouchableOpacity style={styles.msgButton} onPress={handleEmailPress}>
    <MaterialIcons name="email" size={20.96} color="white" />
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    enContainer:{
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
    },
    Enquirebutton:{
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 5,
        backgroundColor: '#1D9BF0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    enText:{
        fontFamily: 'Poppins',
        fontSize: 14,
        fontWeight: '500',
        color: 'white'
    },
    callButton:{
        padding: 10,
        width: 48,
        borderRadius: 24,
        backgroundColor: '#25D366',
        justifyContent: 'center',
        alignItems: 'center'
    },
    msgButton:{
        padding: 10,
        width: 48,
        borderRadius: 24,  
        backgroundColor: '#FF4949',
        justifyContent: 'center',
        alignItems: 'center'
    }

});

export default EnquireContainer;