import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SkipNextButton = ({ onSkip, onNext , buttonStyle, textStyle, showSkipButton = true}) => {
  const containerStyle = showSkipButton ? styles.buttonContainer : [styles.buttonContainer, styles.centerButton];

  return (
    <View style={containerStyle}>
      {showSkipButton && (
        <TouchableOpacity onPress={onSkip} style={[styles.button, buttonStyle]}>
          <Text style={[styles.buttonText, textStyle]}>Skip</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={onNext} style={[styles.button, buttonStyle, showSkipButton ? null : styles.singleButton]}>
        <Text style={[styles.buttonText, textStyle]}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // This will center the buttons
    alignItems: 'center',
    padding: 10,
    position: 'absolute',
    left: 0,  // Stretch the button container from the left edge of the screen
    right: 0, // to the right edge of the screen
    bottom: 30, // Position the container at the bottom of the screen
  },
  button: {
    width: 90,
    backgroundColor: 'white',
    borderRadius: 7,
    padding: 10,
    
  },
  centerButton: {
    justifyContent: 'flex-end', // Center the button when Skip is not shown
  },
  
  buttonText: {
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#000',
    textAlign: 'center'
  },
});

export default SkipNextButton;
