import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, FlatList, Dimensions, StatusBar} 
from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProgressBar from '../../components/ProgressBar';
import styles from '../../constants/styles/customerhomestyles';
import AdvisorCard from '../../components/AdvisorCard';
import ShowAllButton from '../../components/ShowAllButton';
import Card from '../../components/Card';

const categories = [
  { key: '1', name: 'Filter' }, 
  { key: '2', name: 'DTCP plots' },
  { key: '3', name: 'Farmlands' },
  { key: '4', name: 'Dhya' },
  { key: '5', name: 'Innovations' },
  { key: '6', name: 'Farmlands' },
  { key: '7', name: 'Farmlands' },
  { key: '8', name: 'Farmlands' },
  { key: '9', name: 'Farmlands' },
  { key: '10', name: 'Farmlands' },
  { key: '11', name: 'Farmlands' },
  { key: '12', name: 'Farmlands' },
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
      image1: require('../../../assets/images/Sarav.png'),
      image2: require('../../../assets/images/Sarav2.png'),
      image3: require('../../../assets/images/building.png'), // replace with your local image
      rating: '4.3',
      description: '200 plots available, starts from 750sqft',
      address: '34, Keeranatham Road, Saravanampatti',
    },
    {
      name: 'Pink City',
      image1: require('../../../assets/images/Sarav2.png'),
      image2: require('../../../assets/images/Sarav.png'),
      image3: require('../../../assets/images/building.png'), // replace with your local image
      rating: '4.3',
      description: '200 plots available, starts from 750sqft',
      address: '34, Keeranatham Road, Saravanampatti',
    },
    {
      name: 'Dhya City',
      image1: require('../../../assets/images/building.png'), // replace with your local image
      rating: '4.3',
      description: '200 plots available, starts from 750sqft',
      address: '34, Keeranatham Road, Saravanampatti',
    },
    // Add more card data here
  ];


const { width } = Dimensions.get('window'); 



const CustomerHome = ({navigation}) => {
  const [selectedCategoryKey, setSelectedCategoryKey] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const flatListRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
        // Scroll to the next index using the FlatList ref
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
        }
        return nextIndex;
      });
    }, 3000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const renderPagination = () => {
    return (
      <View style={styles.mainPaginationContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              currentIndex === index ? styles.paginationDotActive : styles.paginationDotInactive,
            ]}
          />
        ))}
      </View>
    );
  };


 

  const renderItem = ({ item }) => {
    const isSelected = item.key === selectedCategoryKey;
    return (
      <TouchableOpacity
        style={[
          styles.categoryButton,
          isSelected ? styles.categoryButtonSelected : null, // Apply selected styles if the item is selected
        ]}
        onPress={() => setSelectedCategoryKey(item.key)} // Update the selected key
      >
        <Text style={[
          styles.categoryText,
          isSelected ? styles.categoryTextSelected : null, // Apply selected text styles if the item is selected
        ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderImageItem = ({ item }) => (
    <View style={styles.bannerContainer}>
      <Image source={item.source} style={styles.bannerImage} />
      <View style={styles.bannerTextContainer}>
        <Text style={styles.bannerText}>{item.text}</Text>
        <Text style={[styles.bannerText, { fontWeight: '500', fontSize: 10 }]}>
          {item.description}
        </Text>
        <Text style={[styles.bannerText, { fontWeight: '500', fontSize: 7 }]}>
          {item.address}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
       <StatusBar
        backgroundColor="black" // Works on Android
        barStyle="light-content" // Works on iOS and Android
        />
       <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Home</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Image
            source={require('../../../assets/images/belliconblue.png')}
            style={styles.bellIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.searchSection}>
        <Icon style={styles.searchIcon} name="search" size={20} color="#C4C4C4" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search here"
          placeholderTextColor="#C4C4C4"
        />
      </View>

      <View style={{width: '100%', marginVertical: 20, marginHorizontal: 5,}}>
      <FlatList
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
      </View>
      <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
      <FlatList
          ref={flatListRef}
          data={images}
          renderItem={renderImageItem}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true} 
          onMomentumScrollEnd={(event) => {
            // Calculate the current page after scrolling ends
            const currentPage = Math.floor(event.nativeEvent.contentOffset.x / width);
            setCurrentIndex(currentPage);
          }}
          getItemLayout={(data, index) => ({
            length: 320, // Use fixed width of 320 as per your requirement
            offset: 320 * index,
            index,
          })}
          style={{width: 320,}}
        />
        {renderPagination()}
      </View>
      <ShowAllButton text="Updates"  onPress={() => {}}/>
      <ProgressBar progress={0.2} />
      <ShowAllButton text="properties"  onPress={() => {
            navigation.navigate("properties", { screen: "Customer Properties", params: { selected: "properties" }});
          }}/>
      <ScrollView
      style={{width: '100%'}}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {cards.map((card, index) => (
        <Card key={index} card={card} onPress={() => {
          navigation.navigate("properties", { screen: "Property Details"});
       }}/>
      ))}
    </ScrollView>
    <ShowAllButton text="New Projects"  onPress={() => {
            navigation.navigate("properties", { screen: "Customer Properties", params: { selected: "newProjects" }});
          }}/>
    <ScrollView
      style={{width: '100%'}}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {cards.map((card, index) => (
        <Card key={index} card={card}  onPress={() => {
          navigation.navigate("properties", { screen: "Show Properties"});
       }} />
      ))}
    </ScrollView>
    <AdvisorCard/>
    </ScrollView>
  );
};

export default CustomerHome;