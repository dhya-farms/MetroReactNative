import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, ScrollView, Image, Text, Dimensions, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { toggleFavorite } from '../apifunctions/toggleFavouritesApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatPropertyName } from '../functions/formatPropertyName';


// If `styles` are defined within this component, keep them here,
// or move to a separate file if they are shared across components.


const { width: screenWidth } = Dimensions.get('window');
const cardWidth = 320;


const Card = ({ property={}, displayText, imageUrls = [], onPress, paramsToken }) => {

    const imageSource = imageUrls.length > 0 ? { uri: imageUrls[0] } : require('../../assets/images/Sarav.png');
    

    return (
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <View style={styles.imageContainer}>
          <View  style={{ width: cardWidth, height: 196 }}>
          <Image source={imageSource} style={styles.image} />
        </View>
        </View>
        <View style={styles.cardContent}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
          <Text style={styles.cardTitle}>{formatPropertyName(property.name)}</Text>
          <View style={styles.ratingStarContainer}>
              <View style={styles.starContainer}>
                <MaterialIcons name="star" size={16} color="#FEC623" />
              </View>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>{property.rating}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.cardDescription}>{displayText}</Text>
          <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginVertical: 5,}}>
            <MaterialIcons name="location-on" size={16} color="#424242" />
            <Text style={styles.cardAddress}>{property.location}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
    mainPaginationContainer: {
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
    favoriteButton: {
      position: 'absolute',
      top: 10,
      left: 10,
      // Add additional styling if needed, like padding or a background color
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
    ratingStarContainer:{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#424242',
      borderRadius: 12,
      overflow: 'hidden',
    },
    starContainer:{
      backgroundColor: '#fff',
      width: 20,
      height: 20,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 4,
    },
    ratingContainer: {
      paddingRight: 6,
      paddingLeft: 0, 
      backgroundColor: '#424242',
    },
    rating: {
      fontFamily: 'Poppins',
      fontSize: 12,
      fontWeight: '400',
      color: 'white',
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
      color: '#424242'
    },
    paginationContainer: {
      position: 'absolute', // Absolute position for the pagination container
      bottom: 132, // Position at the bottom of the image view
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    scrollViewContainer:{
      width: cardWidth,
      
    }
  });

export default Card;