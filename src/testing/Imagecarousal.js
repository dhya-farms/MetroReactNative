import * as React from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  Platform
} from 'react-native';
import Constants from 'expo-constants';
const { width, height } = Dimensions.get('window');

const SPACING = 7;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.62 : width * 0.64;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);

const dummyMovies = [
  {
    key: '1',
    poster: require('../../assets/images/caro.jpg')
  },
  {
    key: '2',
    poster: require('../../assets/images/caurosal1.png')
  },
  {
    key: '3',
    poster: require('../../assets/images/caurosal2.png')
  },
  // Add more items as needed
];



export default function ImageCarousel() {
  const [movies, setMovies] = React.useState([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Initially load the dummy data into state
    setMovies([{ key: 'empty-left' }, ...dummyMovies, { key: 'empty-right' }]);
  }, []);

  if (movies.length === 0) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => item.key}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        
        renderToHardwareTextureAndroid
        contentContainerStyle={{ alignItems: 'center' }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment='start'
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          if (!item.poster) {
            return <View style={{ width: EMPTY_ITEM_SIZE }} />;
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [80, 50, 80],
            extrapolate: 'clamp'
          });

          return (
            <View style={{ width: ITEM_SIZE }}>
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  alignItems: 'center',
                  transform: [{ translateY }],
                  backgroundColor: 'white',
                  borderRadius: 34,
                }}
              >
                <Image
                 source={item.poster}
                  style={styles.posterImage}
                />
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 0.8,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});