import React from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, Text } from 'react-native';
import SkipNextButton from '../../components/SkipNextButton';

const Home3 = ({navigation}) => {
  const onSkip = () => {
    console.log('Skip was pressed');
  };

  const onNext = () => {
    navigation.navigate('LoginScreens')
  };

  const customButtonStyles = {
    backgroundColor: '#B8B8B8', // The new background color
  };

  const customTextStyles = {
    color: 'white', // The new text color
  };


  return (
    <View style={styles.container}>
    <ImageBackground
            source={require('../../../assets/images/building.png')}
            resizeMode='stretch'
            style={styles.imageBackground}
    >
    <View style={styles.textContainer}>
    <Text style={styles.title}>Hollistic Amenities & {'\n'}Pocket friendly  budget</Text>
    </View>
    <SkipNextButton 
    onSkip={onSkip} 
    onNext={onNext} 
    buttonStyle={customButtonStyles}
    textStyle={customTextStyles}
    showSkipButton={false}/>
    </ImageBackground>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  imageBackground: {
    flex: 1,
    width: width,
    height: '100%',
    justifyContent: 'space-between', // To position your title at the top and buttons at the bottom
  },
  textContainer:{
    position: 'absolute',
    flex: 1,
    top: 70,
    padding: 20,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '500',
  }
});

export default Home3;
