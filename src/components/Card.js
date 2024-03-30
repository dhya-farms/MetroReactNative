import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, ScrollView, Image, Text, Dimensions, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// If `styles` are defined within this component, keep them here,
// or move to a separate file if they are shared across components.


const { width: screenWidth } = Dimensions.get('window');
const cardWidth = 320;


const Card = ({ card, onPress }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const imageScrollRef = useRef();
    const images = [card.image1, card.image2, card.image3].filter(Boolean);

    useEffect(() => {
      if (images.length <= 1) return; // If only one image, do nothing
  
      const interval = setInterval(() => {
        setCurrentImageIndex(prevIndex => {
          const nextIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
          if (imageScrollRef.current) {
            imageScrollRef.current.scrollTo({ x: cardWidth * nextIndex, animated: true });
          }
          return nextIndex;
        });
      }, 3000);
  
      return () => clearInterval(interval);
    }, [images.length]);

    const renderPagination = () => {
      if (images.length <= 1) return null; // Don't render pagination for a single image
  
      return (
        <View style={styles.paginationContainer}>
          {images.map((_, index) => (
            <View key={index} style={[
              styles.paginationDot,
              currentImageIndex === index ? styles.paginationDotActive : styles.paginationDotInactive,
            ]} />
          ))}
        </View>
      );
    };

    return (
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <TouchableOpacity onPress={onPress}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            ref={imageScrollRef}
            style={styles.scrollViewContainer}
            onMomentumScrollEnd={(e) => {
              const pageIndex = Math.round(e.nativeEvent.contentOffset.x / cardWidth);
              setCurrentImageIndex(pageIndex);
            }}
          > 
           {images.map((imgSrc, index) => (
            // Each image is wrapped in a View with the correct width.
            <View key={index} style={{ width: cardWidth, height: 196 }}>
              <Image source={imgSrc} style={styles.image} />
            </View>
          ))}
          </ScrollView>
        </TouchableOpacity>
        {renderPagination()}
        <View style={styles.cardContent}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
          <Text style={styles.cardTitle}>{card.name}</Text>
          <Text style={styles.rating}>{card.rating}</Text>
          </View>
          <Text style={styles.cardDescription}>{card.description}</Text>
          <View style={{flexDirection: 'row',alignItems: 'center',}}>
            <MaterialIcons name="location-on" size={16} color="#424242" />
            <Text style={styles.cardAddress}>{card.address}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    image: {
      width: '100%',
      height: '100%', // Adjust the height as necessary
      borderRadius: 10,
      resizeMode: 'cover'
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