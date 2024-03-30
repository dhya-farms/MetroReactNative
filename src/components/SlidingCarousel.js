import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const images = [
  require('../../assets/images/caurosal1.png'),
  require('../../assets/images/caurosal2.png'),
  require('../../assets/images/caurosal3.png'),
  require('../../assets/images/caurosal1.png'), // Assuming you have a fourth image
];


const imageWidth = 170;
const imageHeight = 170; 
const marginHorizontal = 20;

const Pagination = ({ index, scrollToIndex }) => {
  return (
    <View style={styles.paginationWrapper}>
      {images.map((_, i) => (
        <TouchableOpacity
          key={i}
          style={[styles.dot, index === i && styles.activeDot]}
          onPress={() => scrollToIndex(i)}
        />
      ))}
    </View>
  );
};

export default function SlidingCarousel() {
  const [index, setIndex] = useState(0);
  const flatListRef = useRef();
  const indexRef = useRef(0);

  const updateIndex = (newIndex) => {
    indexRef.current = newIndex;
    setIndex(newIndex);
  };

  const scrollToIndex = (i) => {
    // Corrected offset calculation to include the margins
    const offset = i * (imageWidth + (marginHorizontal * 2));
    flatListRef.current.scrollToOffset({ animated: true, offset });
    updateIndex(i);
  };


  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (indexRef.current + 1) % images.length;
      scrollToIndex(nextIndex);
    }, 2500);

    return () => clearInterval(interval);
  }, []);


  return (
    <View style={styles.carouselContainer}>
      <View style={styles.imageContainer}>
        <FlatList
          style={{width: 320, borderRadius: 10}}
          ref={flatListRef}
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            // Calculate the visible part of the FlatList, which should match the width of a single item including margins
            const contentOffset = event.nativeEvent.contentOffset.x;
            const newIndex = Math.floor(contentOffset / (imageWidth + (styles.image.marginHorizontal * 2)));
            if (newIndex !== index) {
              setIndex(newIndex);
            }
          }}
          renderItem={({ item }) => (
            <Image source={item} style={styles.image} />
          )}
          keyExtractor={(_, i) => i.toString()}
        />
        <Pagination index={index} scrollToIndex={scrollToIndex} />
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1, // Takes the full height of the parent container
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
  imageContainer: {
    width: 525, // Fixed width as requested
    height: imageHeight, // Make sure the container has enough height for the images
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: imageWidth, // Set to the fixed width of 170 as requested
    height: imageHeight, // Set to the fixed height of 170 as requested
    borderRadius: 10,
    // Adjust the margin so that the total width of the item equals to the view size used in onMomentumScrollEnd
    marginHorizontal: marginHorizontal,
  },
  paginationWrapper: {
    position: 'absolute',
    top: 160,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
    margin: 5,
  },
  activeDot: {
    backgroundColor: 'blue',
  },
});