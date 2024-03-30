import React from 'react';
import { ScrollView, StyleSheet, StatusBar} from 'react-native';
import HeaderContainer from '../../components/HeaderContainer';
import Carousel from '../../components/Carousel';


const dataArray = [
  {
    id: '1',
    title: 'Sri Shivashakti Residency',
    description: '200 plots available, starts from 750sqft',
    location: '34, Keeranatham Road, Saravanampatti',
    image1: require('../../../assets/images/building.png'),
    image2: require('../../../assets/images/Sarav.png'),
    image3: require('../../../assets/images/Sarav2.png'),
    rating: '4.3'
  },
  {
    id: '2',
    title: 'Lotus Apartments',
    description: '150 apartments ready to move in',
    location: '22, Ganapathy Road, Coimbatore',
    image1: require('../../../assets/images/building.png'),
    image2: require('../../../assets/images/Sarav.png'),
    image3: require('../../../assets/images/Sarav2.png'),
    rating: '4.6'
  },
  {
    id: '3',
    title: 'Greenfield Villas',
    description: 'Eco-friendly community villas',
    location: '58, Peelamedu, Coimbatore',
    image1: require('../../../assets/images/building.png'),
    rating: '4.8'
  },
  // ... add more objects as needed for each property
];





const FavProperties = ({navigation}) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
    <StatusBar/>
    <HeaderContainer title="Favourites" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}/>
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
    backgroundColor: 'white'
  },
});

export default FavProperties;