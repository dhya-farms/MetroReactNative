import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, FlatList, Dimensions} 
from 'react-native';


const categories = [
  { key: '1', name: 'Filter' }, // assuming 'Filter' is also a category
  { key: '2', name: 'DTCP plots' },
  { key: '3', name: 'Farmlands' },
  { key: '4', name: 'Dhya' },
  { key: '5', name: 'Innovations' },
  { key: '6', name: 'Farmlands' },
  { key: '7', name: 'Farmlands' },
  { key: '8', name: 'Farmlands' },
  { key: '9', name: 'Farmlands' },
  { key: '10', name: 'Farmlands' },
  { key: '11', name: 'Farmlands' },
  { key: '12', name: 'Farmlands' },
];


const FlatListExample = () => {
    const [selectedCategoryKey, setSelectedCategoryKey] = useState(null);
    const flatListRef = useRef();

    const renderItem = ({ item }) => {
        const isSelected = item.key === selectedCategoryKey;
        return (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              isSelected ? styles.categoryButtonSelected : null, // Apply selected styles if the item is selected
            ]}
            onPress={() => setSelectedCategoryKey(item.key)} // Update the selected key
          >
            <Text style={[
              styles.categoryText,
              isSelected ? styles.categoryTextSelected : null, // Apply selected text styles if the item is selected
            ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      };

    return (
    <View style={{flex: 1}}>
    <FlatList
      ref={flatListRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      renderItem={renderItem}
      scrollEventThrottle={16}
      keyExtractor={item => item.key}
      contentContainerStyle={styles.categoryContainer}
      style={{width: '100%'}}
    />
    </View>
    )
}

const styles = StyleSheet.create({
    categoryContainer: {
      width: '100%',
      padding: 20,
    },
    categoryButton: {
      backgroundColor: '#fff', // Background color for category button
      marginRight: 10, // Spacing between buttons
      borderRadius: 5, // Adjust border radius to match your design
      shadowColor: '#000',
      borderWidth: 1,
      borderColor: '#D9D9D9', // Shadow color
      shadowOffset: {
        width: 0,
        height: 1, // Vertical shadow
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2, // Elevation for Android
      justifyContent: 'center',
      alignItems: 'center',
      height: 40, // Height of the button
      paddingHorizontal: 10,
    },
    categoryText: {
      color: '#000', // Text color
      fontSize: 16, // Text font size
    },
    bannerContainer: {
      width: 320,
      height: 209.52,
      overflow: 'hidden', // Ensure the image border radius is applied
      borderRadius: 10, 
      position: 'relative',// You can also apply the border radius here
    },
    bannerImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 10, // Make sure this is here, adjust value as needed
   },
   bannerTextContainer:{
    position: 'absolute', // Position the container absolutely
    bottom: 0, // Align it to the bottom of the bannerContainer
    left: 0, // Align it to the left of the bannerContainer
    right: 0, // Align it to the right of the bannerContainer
    padding: 10, // Add some padding
   },
   bannerText:{
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 4,
    color: '#fff',
   },
   categoryButtonSelected: {
    backgroundColor: '#1D9BF0', // New background color for selected button
    // Other styles you want to apply when selected
    },
    categoryTextSelected: {
      color: '#FFFFFF', // New text color for selected text
      // Other styles you want to apply when selected
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    paginationDot: {
      height: 10,
      width: 10,
      borderRadius: 5,
      marginHorizontal: 5,
    },
    paginationDotActive: {
      backgroundColor: '#1D9BF0',
    },
    paginationDotInactive: {
      backgroundColor: '#C4C4C4',
    },
    updateContainer:{
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 20,
      paddingHorizontal: 20,
    },
    updateText:{
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 16,
    },
    seeAllText:{
      fontFamily: 'Poppins',
      fontWeight: '400',
      fontSize: 12,
      color: '#1D9BF0'
    },
    card: {
      width: 320, // Adjust the width as necessary
      borderRadius: 10,
      backgroundColor: '#fff',
      marginHorizontal: 25,
      marginVertical: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5, // for Android
    },
    cardImage: {
      width: '100%',
      height: 186, // Adjust the height as necessary
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      resizeMode: 'cover',
    },
    cardContent: {
      width: '100%',
      padding: 10,
    },
    cardTitle: {
      fontFamily: 'Poppins',
      fontWeight: '600',
      fontSize: 18,
      marginVertical: 5,
    },
    rating: {
      backgroundColor: '#424242',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 2,
      color: 'white'
    },
    cardDescription: {
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 12,
      marginVertical: 5,
    },
    cardAddress: {
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 12,
      marginLeft: 5,
      marginVertical: 5,
    },
  });

export default FlatListExample