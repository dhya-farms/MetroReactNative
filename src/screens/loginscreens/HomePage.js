import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import SkipNextButton from '../../components/SkipNextButton';

const HomePage = ({navigation}) => {
  const onSkip = () => {
    navigation.navigate('LoginScreens')
  };

  const onNext = () => {
    navigation.navigate('Home1')
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/metrologo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.imageWithBtnContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/images/homeimage1.png')}
            style={styles.contentImage}
            resizeMode="cover"
          />
        </View>
        <SkipNextButton onSkip={onSkip} onNext={onNext} />
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  logo: {
    width: width * 0.8,
    height: 100,
    marginTop: 50,
    marginBottom: 40,
  },
  imageWithBtnContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    position: 'relative',
    marginTop: 20,
  },
  contentImage: {
    flex: 1,
    width: width, // Adjust the width as needed
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
  },
});

export default HomePage;
