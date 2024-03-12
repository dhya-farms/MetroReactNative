import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ progress }) => {
    return (
      <View style={styles.container}>
        <View style={[styles.progressOverlay, { width: `${progress * 100}%` }]} />
        <Text style={styles.headerText}>Progress Status</Text>
        <Text style={styles.progressText}>Next step is to update the required documents</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      width: '80%',
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#1D9BF0', // Blue border color
      margin: 10,
      backgroundColor: '#FFF', // White background color of the container
      overflow: 'hidden',
      paddingHorizontal: 20, // Ensures the overlay doesn't spill outside the border radius
    },
    progressOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      backgroundColor: '#1D9BF0', // Blue color for the filled part of the bar
      borderRadius: 10, // Ensure the filled part also has rounded corners
    },
    headerText: {
        fontFamily: 'Poppins',
        fontWeight: '600',
        color: '#424242', 
        fontSize: 14,// Black color for the progress text
        marginVertical: 10,
        zIndex: 1, // Ensure the text is above the colored overlay
    },
    progressText: {
      fontFamily: 'Poppins',
      fontWeight: '400',
      color: '#424242', 
      fontSize: 10,// Black color for the progress text
      marginVertical: 10,
      zIndex: 1, // Ensure the text is above the colored overlay
    },
});

// Usage:
// <ProgressBar progress={0.5} /> // For 50% progress

export default ProgressBar;
