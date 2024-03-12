import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions} 
from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SlidingCarousel from '../../components/SlidingCarousel';
import { SafeAreaView } from 'react-native';
import LayoutHeader from '../../components/LayoutHeader';
import { TabBar } from '../../components/TabComponent';
import EnquireContainer from '../../components/EnquireContainer';
import HeaderContainer from '../../components/HeaderContainer';





const amenities = [
  { icon: require('../../../assets/images/playground.png'), text: 'Playground' },
  { icon: require('../../../assets/images/pool.png'), text: 'Pool' },
  { icon: require('../../../assets/images/market.png'), text: 'Market' },
  { icon: require('../../../assets/images/kidspark.png'), text: 'Kids Park' },
  { icon: require('../../../assets/images/busstand.png'), text: 'Bus Stand' },
  { icon: require('../../../assets/images/walkingarea.png'), text: 'Walking Area' },
  { icon: require('../../../assets/images/school.png'), text: 'School' },
  // ... add other amenities as needed
];



const galleryImages = [
  { source: require('../../../assets/images/land.webp'), id: '1' },
  { source: require('../../../assets/images/land.webp'), id: '2' },
  { source: require('../../../assets/images/land.webp'), id: '3' },
  { source: require('../../../assets/images/land.webp'), id: '4' },
  { source: require('../../../assets/images/land.webp'), id: '5' },
  { source: require('../../../assets/images/land.webp'), id: '6' },
  // ... add other images as needed
];





const ShowProperties = () => {
  const fullText = `Lorem ipsum dolor sit amet consectetur. Malesuada urna egestas ultricies facilisi. Purus ut est faucibus habitasse. Sodales et justo pellentesque orci facilisis quam nulla. Lorem ipsum dolor sit amet consectetur. Malesuada urna egestas ultricies facilisi. Purus ut est faucibus habitasse. Sodales et justo pellentesque orci facilisis quam nulla. Lorem ipsum dolor sit amet consectetur. Malesuada urna egestas ultricies facilisi. Purus ut est faucibus habitasse. Sodales et justo pellentesque orci facilisis quam nulla. Lorem ipsum dolor sit amet consectetur. Malesuada urna egestas ultricies facilisi. Purus ut est faucibus habitasse. Sodales et justo pellentesque orci facilisis quam nulla.`;
  const [textShown, setTextShown] = useState(false);
  const scrollViewRef = useRef();
  const desRef = useRef();
  const amRef = useRef();
  const gmRef = useRef();
  
  const toggleTextShown = () => {
    setTextShown(!textShown);
  };

  const truncateText = (text, limit) => {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  };

  const scrollToSection = (sectionRef) => {
    sectionRef.current.measureLayout(
      scrollViewRef.current,
      (x, y, width, height) => {
        scrollViewRef.current.scrollTo({ x: 0, y, animated: true });
      },
      () => {} // Error callback method
    );
  };
  
  return (
    <SafeAreaView style={{flex: 1}}>
    <ScrollView ref={scrollViewRef} style={styles.container} contentContainerStyle={styles.contentContainer}>
    <HeaderContainer title="Properties" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}/>
      
    <SafeAreaView style={styles.slidingContainer}>
      <SlidingCarousel/>
    </SafeAreaView>
    <View style={styles.cityConatiner}>
      <Text style={styles.cityText}>Dawn City</Text>
      <Text style={styles.cityAmount}>₹ 2200/sqft</Text>
    </View>
    <LayoutHeader/>
    <View style={styles.separator} />
    <TabBar onTabSelect={(tab) => {
          if (tab === 'Overview') scrollToSection(desRef);
          else if (tab === 'Amenities') scrollToSection(amRef);
          else if (tab === 'Gallery') scrollToSection(gmRef);
    }} />
    <View ref={desRef} style={styles.desContainer}>
      <Text style={styles.desHeader}>Description:</Text>
      <Text style={styles.desText}>
      {textShown ? fullText : truncateText(fullText, 40)}
      </Text>
    <TouchableOpacity onPress={toggleTextShown}>
    <Text style={styles.smText}>{textShown ? 'Show Less -' : 'Show More +'}</Text>
    </TouchableOpacity>
    <View style={styles.LocationImageContainer}>
      <View style={styles.LocationImage}></View>
    </View>
    <View style={styles.plotContainer}>
      <Text style={styles.plotHeader}>Plots information:</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Plot Type</Text>
        <Text style={styles.infoContent}>Farm Land</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Property Id:</Text>
        <Text style={styles.infoContent}>1234FL</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>No of Plots:</Text>
        <Text style={styles.infoContent}>100 plots</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Sq.ft:</Text>
        <Text style={styles.infoContent}>from 200sq.ft</Text>
      </View>
    </View>
    </View>
    <View ref={amRef} style={styles.amContainer}>
      <Text style={styles.amHeader}>Amenities:</Text>
      <View style={styles.amenitiesContainer}>
        {amenities.map((amenity, index) => (
          <View key={index} style={styles.amenity}>
            <Image source={amenity.icon} style={styles.icon} />
            <Text style={styles.text}>{amenity.text}</Text>
          </View>
        ))}
      </View>
    </View>
    <View ref={gmRef} style={styles.gmContainer}>
      <Text style={styles.gmHeader}>Gallery:</Text>
      <View style={styles.galleryContainer}>
        {galleryImages.map((image, index) => (
          <TouchableOpacity key={index} style={styles.imageWrapper}>
            <Image source={image.source} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
    <EnquireContainer/>
    </ScrollView>
    </SafeAreaView>
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
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 20, // Adjust padding as needed
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitle: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '600',
  },
  filterButton: {
    // Define if you need specific styles for your button
  },
  bellIcon: {
    width: 34, // Adjust size as needed
    height: 34, // Adjust size as needed
  },
  filterText: {
    color: '#ffffff',
  },
  slidingContainer:{
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityConatiner:{
    marginVertical: 20,
    marginLeft: 40,
    width: '90%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  cityText:{
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '600',
  },
  cityAmount:{
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
  },
  separator: {
    height: 2,
    backgroundColor: '#ADADAD',
    width: '90%',
    marginVertical: 16,
  },
  desContainer:{
    width: '90%',
    alignItems: 'flex-start',
    marginLeft: 30,
  },
  desHeader:{
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 10,
  },
  desText:{
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 12,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  smText:{
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#1D9BF0',
    fontSize: 12,
    marginVertical: 5
  },
  LocationImageContainer:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  },
  LocationImage:{
    width: 320,
    height: 128,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 15
  },
  plotContainer: {
    width: '90%',
    backgroundColor: '#fff', // Assuming a white background
  },
  plotHeader: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#424242',
    fontSize: 14,
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    marginHorizontal: 10,
    alignItems: 'flex-start', // Align items to the start of the cross axis
  },
  infoLabel: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#424242',
    fontSize: 12,
    minWidth: 100, // Set a minimum width for labels
    textAlign: 'left',
  },
  infoContent: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#424242',
    fontSize: 12,
    textAlign: 'left',
    width: '100%'
  },
  amContainer:{
    width: '90%',
    marginVertical: 20,
  },
  amHeader:{
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
    color: '#424242',
    marginVertical: 20,
  },
  amenitiesContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  amenity: {
    alignItems: 'center',
    marginBottom: 20,
    width: '27%', // Set this to control the number of items per row
  },
  icon: {
    width: 35,
    height: 35,
    // Include other styling for your icons
  },
  text: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 10,
  },
  gmContainer:{
    width: '90%',
  },
  gmHeader: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 16,
    marginBottom: 10,
  },
  galleryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
    width: '30%', 
  },
  image: {
    width: 83,
    height: 83,
    resizeMode: 'cover',
    borderRadius: 15
  },
});

export default ShowProperties;