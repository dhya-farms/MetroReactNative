import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,FlatList } from 'react-native';

const Card = ({ name, number }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{name}</Text>
      <Text style={styles.cardNumber}>{number}</Text>
      <TouchableOpacity style={{alignSelf: 'flex-start'}}>
        <Text style={styles.showMoreText}>Show more</Text>
      </TouchableOpacity>
    </View>
  );
};

const ReportCard = ({ reportData, onPress }) => {
   
    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={onPress}>
      <Card name={item.name} number={item.number} />
      </TouchableOpacity>
    );
   
  
    return (
      <FlatList
        data={reportData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Display two columns
        columnWrapperStyle={styles.row} 
        nestedScrollEnabled={true} // Styles to ensure that items are spaced correctly
      />
    );
};

const styles = StyleSheet.create({
    card: {
      width: 140,
      margin: 5, // Spacing between cards
      padding: 16, // Inner spacing within the card
      alignItems: 'center', // Center the content horizontally
      justifyContent: 'center', // Center the content vertically
      backgroundColor: '#5C5C5C', // Background color of the card
      borderRadius: 8,
    },
    cardTitle: {
      fontFamily: 'Poppins',
      fontWeight: '600',
      fontSize: 16,
      alignSelf: 'flex-start',
      color: '#FFFFFF'
    },
    cardNumber: {
      fontSize: 57,
      fontFamily: 'Poppins',
      fontWeight: '600',
      marginVertical: 8,
      color: '#fff' ,
      alignSelf: 'flex-start'
    },
    showMoreText: {
      fontFamily: 'Poppins',
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
      alignSelf: 'flex-start',// Underline the text to indicate it is clickable
    },
    // Add other styles you might need
  });
export default ReportCard