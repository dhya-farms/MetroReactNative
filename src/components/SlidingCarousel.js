import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const images = [
  require('../../assets/images/caurosal1.png'),
  require('../../assets/images/caurosal2.png'),
  require('../../assets/images/caurosal3.png'),
];

const windowWidth = Dimensions.get('window').width;
const windowHeight = windowWidth * (9 / 16); // example for a 16:9 aspect ratio

const Pagination = ({index, scrollToIndex}) => {

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
  const indexRef = useRef(0); // Create a ref to keep track of the current index

  // Update both the state and the ref whenever the index changes
  const updateIndex = (newIndex) => {
    indexRef.current = newIndex;
    setIndex(newIndex);
  };

  const scrollToIndex = (i) => {
    flatListRef.current.scrollToIndex({ animated: true, index: i });
    updateIndex(i); // Use updateIndex to keep state and ref in sync
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Use the ref to get the current index inside the interval
      const nextIndex = indexRef.current === images.length - 1 ? 0 : indexRef.current + 1;
      scrollToIndex(nextIndex);
    }, 4000); // Change image every 4 seconds

    // Clear the interval when the component unmounts or index changes
    return () => clearInterval(interval);
  }, []); 


  return (
    <View style={styles.imageContainer}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / windowWidth);
          setIndex(newIndex);
        }}
        renderItem={({ item }) => (
          <Image source={item} style={styles.image} />
        )}
        keyExtractor={(_, i) => i.toString()}
      />
      <Pagination index={index} scrollToIndex={scrollToIndex} />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationWrapper: {
    position: 'absolute',
    top: 190,
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
  imageContainer:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image:{
    width: 170,
    height: 170,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 20,
  }
});