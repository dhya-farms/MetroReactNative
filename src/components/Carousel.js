import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const { width } = Dimensions.get('window');



const { width: screenWidth } = Dimensions.get('window');
const cardWidth = 320; // Fixed card width
const cardMargin = (screenWidth - cardWidth) / 2;

const Carousel = ({ data, onSortPress }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState(false);

  const flatListRef = useRef();

  const PropertyCard = ({ item }) => {
    const onLikePress = () => {
      setLiked(!liked);
    };
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onSortPress}>
      <Image source={item.imageUrl} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.lrContainer}>
             <TouchableOpacity onPress={onLikePress}>
                    <MaterialIcons
                    name={liked ? 'favorite' : 'favorite-border'}
                    size={24}
                    color={liked ? 'red' : 'white'}
                    />
        </TouchableOpacity>
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

const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              currentIndex === index ? styles.paginationDotActive : styles.paginationDotInactive,
            ]}
          />
        ))}
      </View>
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex === data.length - 1 ? 0 : prevIndex + 1;
        // Scroll to the next index using the FlatList ref
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
        }
        return nextIndex;
      });
    }, 3000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.carouselContainer}>
    <FlatList
      ref={flatListRef}
      data={data}
      renderItem={PropertyCard}
      keyExtractor={(_, index) => index.toString()}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={(event) => {
        const currentPage = Math.floor(event.nativeEvent.contentOffset.x / cardWidth);
        setCurrentIndex(currentPage);
      }}
      getItemLayout={(data, index) => ({
        length: cardWidth,
        offset: cardWidth * index,
        index,
      })}
      style={styles.flatListStyle}
      contentContainerStyle={{
        alignItems: 'center' // Ensures that the FlatList children are centered
      }}
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
    width: cardWidth, // Set the width of the FlatList to the width of a single card
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
    height: 186, // Adjust the height as necessary
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
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
    bottom: 122, // Position at the bottom of the image view
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
});

export default Carousel;

// Usage example:
// <Carousel data={dataArray} />