import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions, TouchableOpacity, ScrollView, Alert} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { toggleFavorite } from '../apifunctions/toggleFavouritesApi';


const { width: screenWidth } = Dimensions.get('window');
const cardWidth = 330;

const Carousel = ({ data, onCardPress, favorites=[], isHeartVisible = true, paramsToken, onFavoriteStatusChange }) => {

  const PropertyCard = ({ item }) => {
    const [liked, setLiked] = useState(favorites.includes(item.id));
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const imageScrollRef = useRef();


    const images = item.property ? item.property.images.map(img => ({ uri: img.image })) 
    : item.images.map(img => ({ uri: img.image }));

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



    

    useEffect(() => {
      setLiked(favorites.includes(item.id));
    }, [favorites, item.id]);

    const handleLikePress = () => {
      const newLikedStatus = !liked;
      toggleFavorite(item.id, newLikedStatus, paramsToken, (id, status) => {
        setLiked(status);
        if (onFavoriteStatusChange) {
          onFavoriteStatusChange(id, status);
        }
      });
      setLiked(newLikedStatus);
    };

    const renderPagination = () => {
      if (images.length <= 1) return null;
  
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
        <TouchableOpacity onPress={() => onCardPress(item.propertyId, item.id)}>
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
            <View key={index} style={{ width: cardWidth, height: 196 }}>
              <Image source={imgSrc} style={styles.image} />
            </View>
          ))}
          </ScrollView>
        </TouchableOpacity>
        <View style={isHeartVisible ? styles.lrContainer : styles.lrContainerWithoutHeart}>
            {isHeartVisible && (
              <TouchableOpacity onPress={handleLikePress}>
                <MaterialIcons name={liked ? 'favorite' : 'favorite-border'} size={24} color={liked ? 'red' : 'black'} />
              </TouchableOpacity>
            )}
            <View style={styles.ratingStarContainer}>
              <View style={styles.starContainer}>
                <MaterialIcons name="star" size={16} color="#FEC623" />
              </View>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>{item.rating}</Text>
              </View>
            </View>
          </View>
        {renderPagination()}
        <View style={styles.cardContent}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description}>{item.displayText}</Text>
          <View style={styles.locationContainer}>
            <MaterialIcons name="place" size={16} color="#757575" />
            <Text style={styles.location}>{item.location}</Text>
          </View>
        </View>
      </View>
    );
  };

  const onPressHandler = () => {
    const propertyId = item.property.id
    const phaseId = item.id;
    onCardPress(propertyId, phaseId);
  };

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <PropertyCard item={item} onCardPress={onPressHandler} isHeartVisible={isHeartVisible} />
        )}
        keyExtractor={item => `${item.propertyId}-${item.id}`}
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
    marginVertical: 12,
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
  lrContainerWithoutHeart: {
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    right: 5, // Keeps the rating container on the right
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
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  location: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
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
    backgroundColor: '#FFFFFF',
  },
  scrollViewContainer:{
    width: cardWidth,
    
  }
});

export default Carousel;