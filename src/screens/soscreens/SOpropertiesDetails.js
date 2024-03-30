import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView} 
from 'react-native';
import SlidingCarousel from '../../components/SlidingCarousel';
import { SafeAreaView } from 'react-native';
import LayoutHeader from '../../components/LayoutHeader';
import { TabBar } from '../../components/TabComponent';
import EnquireContainer from '../../components/EnquireContainer';
import HeaderContainer from '../../components/HeaderContainer';
import styles from '../../constants/styles/commonpropertydetailsstyles';





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





const SOpropertiesDetails = ({navigation}) => {
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
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}/>
      
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

export default SOpropertiesDetails;