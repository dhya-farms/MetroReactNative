import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ShowAllButton = ({text, onPress}) => {
  
  return (
    <View style={styles.showAllContainer}>
        <View style={styles.showAllTextContainer}>
          <Text style={styles.showAllText}>{text}</Text>
        </View>
        <TouchableOpacity onPress={onPress} style={styles.showAllButton}>
            <Text style={styles.buttonText}>Show All</Text>
        </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  showAllContainer: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 10,
    margin: 5, 
  },
  
  showAllText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000',
    textAlign: 'center'
  },
  buttonText:{
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#1D9BF0'
  }
});

export default ShowAllButton;