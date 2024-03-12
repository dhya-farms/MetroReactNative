import React, { useRef } from 'react';
import { View, Dimensions, StyleSheet, Image } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

const { width: windowWidth } = Dimensions.get('window');

const images = [
    require('../../assets/images/caurosal1.png'),
    require('../../assets/images/caurosal2.png'),
    require('../../assets/images/caurosal3.png'),
];

const ImageCarousel = () => {
  const scrollX = useSharedValue(0);
  const scrollViewRef = useRef(null);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: 220,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  image: {
    width: '100%',
    height: 180, // or any other height
  },
});

export default ImageCarousel;