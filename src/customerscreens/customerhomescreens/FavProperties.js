import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions} 
from 'react-native';
import { SafeAreaView } from 'react-native';
import LayoutHeader from '../../components/LayoutHeader';
import HeaderContainer from '../../components/HeaderContainer';
import Carousel from '../../components/Carousel';


const dataArray = [
    {
      id: '1',
      title: 'Sri Shivashakti Residency',
      description: '200 plots available, starts from 750sqft',
      location: '34, Keeranatham Road, Saravanampatti',
      imageUrl: require('../../../assets/images/building.png'),
      rating: '4.3'
    },
    {
      id: '2',
      title: 'Lotus Apartments',
      description: '150 apartments ready to move in',
      location: '22, Ganapathy Road, Coimbatore',
      imageUrl: require('../../../assets/images/Sarav.png'),
      rating: '4.6'
    },
    {
      id: '3',
      title: 'Greenfield Villas',
      description: 'Eco-friendly community villas',
      location: '58, Peelamedu, Coimbatore',
      imageUrl: require('../../../assets/images/Sarav2.png'),
      rating: '4.8'
    },
    // ... add more objects as needed for each property
  ];




const FavProperties = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
    <HeaderContainer title="Favourites" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}/>
    <Carousel data={dataArray} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 50,
  },
});

export default FavProperties;