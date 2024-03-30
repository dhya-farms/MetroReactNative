import React from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, Text } from 'react-native';
import SkipNextButton from '../../components/SkipNextButton';

const Home2 = ({navigation}) => {
  const onSkip = () => {
    navigation.navigate('LoginScreens')
  };

  const onNext = () => {
    navigation.navigate('Home3')
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
            source={require('../../../assets/images/metrocity.png')}
            resizeMode='stretch'
            style={styles.imageBackground}
    >
    <View style={styles.textContainer}>
    <Text style={styles.title}>Well connected & {'\n'} Affordable cost</Text>
    </View>
    <SkipNextButton 
    onSkip={onSkip} 
    onNext={onNext} 
    buttonStyle={customButtonStyles}
    textStyle={customTextStyles}/>
    </ImageBackground>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
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
    bottom: 210,
    padding: 20,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '500',
  }
});

export default Home2;
