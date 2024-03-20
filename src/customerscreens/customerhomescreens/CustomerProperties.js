import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions} 
from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SortHeader from '../../components/SortHeader';
import Carousel from '../../components/Carousel';
import HeaderContainer from '../../components/HeaderContainer';


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




const images = [
  {
    source: require('../../../assets/images/Sarav.png'), // Path to the local image
    text: 'SWEET LIVING',
    description: '200 plots available, starts from 750sqft',
    address: '34, Keeranatham Road, Saravanampatti',
  },
  {
    source: require('../../../assets/images/Sarav2.png'), // Path to the local image
    text: 'SWEET LIVING',
    description: '200 plots available, starts from 750sqft',
    address: '34, Keeranatham Road, Saravanampatti',
  },
  // ... Add more images and text here
];
  const cards = [
    {
      name: 'Orange City',
      image: require('../../../assets/images/Sarav.png'), // replace with your local image
      rating: '4.3',
      description: '200 plots available, starts from 750sqft',
      address: '34, Keeranatham Road, Saravanampatti',
    },
    {
      name: 'Pink City',
      image: require('../../../assets/images/Sarav2.png'), // replace with your local image
      rating: '4.3',
      description: '200 plots available, starts from 750sqft',
      address: '34, Keeranatham Road, Saravanampatti',
    },
    // Add more card data here
  ];

  const Card = ({ card }) => {
    return (
      <View style={styles.card}>
        <Image source={card.image} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
          <Text style={styles.cardTitle}>{card.name}</Text>
          <Text style={styles.rating}>{card.rating}</Text>
          </View>
          <Text style={styles.cardDescription}>{card.description}</Text>
          <View style={{flexDirection: 'row',alignItems: 'center',}}>
            <MaterialIcons name="location-on" size={16} color="#424242" />
            <Text style={styles.cardAddress}>{card.address}</Text>
          </View>
        </View>
      </View>
    );
  };


const { width } = Dimensions.get('window'); 



const CustomerProperties = ({navigation}) => {

  const handleSortPress = () => {
    navigation.navigate('Show Properties')
  };  

  const handleMyPropPress = ()=>{
    navigation.navigate('Property Details')
  }
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <HeaderContainer title="Properties" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}/>
      <SortHeader title="My Properties" />
      <Carousel data={dataArray}  onSortPress={handleMyPropPress}/>
     <SortHeader title="Properties" onSortPress={handleSortPress} isSortVisible={false} />
     <Carousel data={dataArray}  onSortPress={handleSortPress} />
     <Carousel data={dataArray}  onSortPress={handleSortPress}/>
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
  filterText: {
    color: '#ffffff',
  }
  
});

export default CustomerProperties;