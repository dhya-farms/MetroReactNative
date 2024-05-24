import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';




const imageWidth = 170;
const imageHeight = 170; 
const marginHorizontal = 20;



export default function SlidingCarousel({images}) {
  const [index, setIndex] = useState(0);
  const flatListRef = useRef();
  const indexRef = useRef(0);

  const updateIndex = (newIndex) => {
    indexRef.current = newIndex;
    setIndex(newIndex);
  };

  const scrollToIndex = (i) => {
    const offset = i * (imageWidth + (marginHorizontal * 2));
    flatListRef.current.scrollToOffset({ animated: true, offset });
    updateIndex(i);
  };

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


  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (indexRef.current + 1) % images.length;
      scrollToIndex(nextIndex);
    }, 2500);

    return () => clearInterval(interval);
  }, [images.length]);


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
            item.key.startsWith('dummy-') ?
              <Image source={item.uri} style={styles.image} /> :
              <Image source={{ uri: item.uri }} style={styles.image} />
          )}
          keyExtractor={(item) => item.key.toString()}
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
    marginBottom: 20,
  },
  imageContainer: {
    width: 550, // Fixed width as requested
    height: imageHeight, // Make sure the container has enough height for the images
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: imageWidth, // Set to the fixed width of 170 as requested
    height: imageHeight, // Set to the fixed height of 170 as requested
    borderRadius: 10,
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
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#C4C4C4',
    margin: 5,
  },
  activeDot: {
    backgroundColor: '#1D9BF0',
  },
});