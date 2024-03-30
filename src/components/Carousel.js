import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions, TouchableOpacity, ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



const { width: screenWidth } = Dimensions.get('window');
const cardWidth = 320;

const Carousel = ({ data, onSortPress, isHeartVisible = true }) => {
  

  const PropertyCard = ({ item }) => {
    const [liked, setLiked] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const imageScrollRef = useRef();
    const images = [item.image1, item.image2, item.image3].filter(Boolean);

    useEffect(() => {
      if (images.length <= 1) return;

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

    const onLikePress = () => setLiked(!liked);

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
      <View style={styles.card}>
        <TouchableOpacity onPress={onSortPress}>
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
        <View style={styles.lrContainer}>
          {isHeartVisible && (
            <TouchableOpacity onPress={onLikePress}>
              <MaterialIcons name={liked ? 'favorite' : 'favorite-border'} size={24} color={liked ? 'red' : 'white'} />
            </TouchableOpacity>
          )}
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={20} color="gold" />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>
        {renderPagination()}
        <View style={styles.cardContent}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.locationContainer}>
            <MaterialIcons name="place" size={20} color="#757575" />
            <Text style={styles.location}>{item.location}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <PropertyCard item={item} onSortPress={onSortPress} isHeartVisible={isHeartVisible} />
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
    // Add additional styling if necessary
  },
  flatListStyle: {
    flexGrow: 0, // This prevents the FlatList from growing to accommodate all items
    width: screenWidth,
    borderRadius: 10 // Set the width of the FlatList to the width of a single card
  },
  card: {
    width: cardWidth, // Adjust the width as necessary
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginVertical: 20,
  },
  image: {
    width: '100%',
    height: '100%', // Adjust the height as necessary
    borderRadius: 10,
    resizeMode: 'cover'
  },
  lrContainer:{
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    left: 5,
    right: 5,
    justifyContent: 'space-between'
  },
  cardContent: {
    width: '100%',
    padding: 10,
  },
  title: {
   fontFamily: 'Poppins',
   fontWeight: '600',
   fontSize: 18,
   marginVertical: 5,
  },
  description: {
   fontFamily: 'Poppins',
   fontWeight: '500',
   fontSize: 12,
   marginVertical: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  location: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
    marginVertical: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'black',
    borderRadius: 20,
  },
  rating: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
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
  scrollViewContainer:{
    width: cardWidth,
    
  }
});

export default Carousel;