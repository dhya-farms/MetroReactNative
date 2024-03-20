import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const ContactButton = ({ iconName, onPress, title }) => {
  // The iconSource prop would be something like require('./path-to-your-icon.png')
  const iconSource = iconName === 'chat' 
    ? require('../../assets/images/message.png') 
    : require('../../assets/images/call.png');

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Image source={iconSource} style={styles.icon} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '80%',
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center items vertically in the container
    padding: 10,
    borderWidth: 2,
    borderColor: '#25A36F', // Use your app's color scheme
    borderRadius: 25, // Rounded corners
    marginVertical: 15, // Space between buttons
  },
  icon: {
    marginRight: 10, // Space between icon and text
  },
  text: {
    flex: 1, // Take up as much space as possible to center the text
    textAlign: 'center', // Center the text
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
  },
});

export default ContactButton