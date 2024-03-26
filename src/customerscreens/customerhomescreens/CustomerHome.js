import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, FlatList, Dimensions, StatusBar} 
from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProgressBar from '../../components/ProgressBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AdvisorCard from '../../components/AdvisorCard';


const categories = [
  { key: '1', name: 'Filter' }, // assuming 'Filter' is also a category
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

  const Card = ({ card, onPress }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={onPress}>
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
      </TouchableOpacity>
    );
  };


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
      <View style={styles.paginationContainer}>
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
       <StatusBar/>
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
      <View style={styles.updateContainer}>
        <Text style={styles.updateText}>Updates</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      <ProgressBar progress={0.2} />
      <View style={styles.updateContainer}>
        <Text style={styles.updateText}>Properties</Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate("properties", { screen: "Customer Properties"});
       }}>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
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
    <View style={styles.updateContainer}>
        <Text style={styles.updateText}>New Projects</Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate("properties", { screen: "Customer Properties"});
       }}>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
    </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 50,
    backgroundColor: 'white'
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15, // Adjust padding as needed
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
    fontSize: 20,
    fontWeight: '500',
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
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF', // Set to white or any other color you need
    borderRadius: 10,
    width: '80%', // Set the width of the input container
    marginBottom: 8, // Add space between input fields
    paddingHorizontal: 12, // Padding on the sides of the input container
    shadowColor: "#000",
    margin: 25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Elevation for Android
    
  },
  searchIcon: {
    paddingLeft: 10,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
    borderRadius: 5,
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '400',
  },
  categoryContainer: {
    width: '100%',
    padding: 20,
  },
  categoryButton: {
    backgroundColor: '#fff', // Background color for category button
    marginRight: 10, // Spacing between buttons
    borderRadius: 5, // Adjust border radius to match your design
    shadowColor: '#000',
    borderWidth: 1,
    borderColor: '#D9D9D9', // Shadow color
    shadowOffset: {
      width: 0,
      height: 1, // Vertical shadow
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2, // Elevation for Android
    justifyContent: 'center',
    alignItems: 'center',
    height: 40, // Height of the button
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  categoryText: {
    color: '#000', // Text color
    fontSize: 16, // Text font size
  },
  bannerContainer: {
    width: 320,
    height: 209.52,
    overflow: 'hidden', // Ensure the image border radius is applied
    borderRadius: 10, 
    position: 'relative',// You can also apply the border radius here
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10, // Make sure this is here, adjust value as needed
 },
 bannerTextContainer:{
  position: 'absolute', // Position the container absolutely
  bottom: 0, // Align it to the bottom of the bannerContainer
  left: 0, // Align it to the left of the bannerContainer
  right: 0, // Align it to the right of the bannerContainer
  padding: 10, // Add some padding
 },
 bannerText:{
  fontFamily: 'Poppins',
  fontWeight: '700',
  fontSize: 14,
  marginBottom: 4,
  color: '#fff',
 },
 categoryButtonSelected: {
  backgroundColor: '#1D9BF0', // New background color for selected button
  // Other styles you want to apply when selected
  },
  categoryTextSelected: {
    color: '#FFFFFF', // New text color for selected text
    // Other styles you want to apply when selected
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: '#1D9BF0',
  },
  paginationDotInactive: {
    backgroundColor: '#C4C4C4',
  },
  updateContainer:{
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
    paddingHorizontal: 20,
  },
  updateText:{
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 16,
  },
  seeAllText:{
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 12,
    color: '#1D9BF0'
  },
  card: {
    width: 320, // Adjust the width as necessary
    borderRadius: 10,
    backgroundColor: '#fff',
    marginHorizontal: 25,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, // for Android
  },
  cardImage: {
    width: '100%',
    height: 186, // Adjust the height as necessary
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  cardContent: {
    width: '100%',
    padding: 10,
  },
  cardTitle: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 18,
    marginVertical: 5,
  },
  rating: {
    backgroundColor: '#424242',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 2,
    color: 'white'
  },
  cardDescription: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
    marginVertical: 5,
  },
  cardAddress: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
    marginLeft: 5,
    marginVertical: 5,
  },
});

export default CustomerHome;