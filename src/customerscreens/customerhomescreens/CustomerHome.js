import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, FlatList, Dimensions, StatusBar, ActivityIndicator} 
from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProgressBar from '../../components/ProgressBar';
import styles from '../../constants/styles/customerhomestyles';
import AdvisorCard from '../../components/AdvisorCard';
import ShowAllButton from '../../components/ShowAllButton';
import Card from '../../components/Card';
import { fetchPropertyTypes } from '../../apifunctions/propertyTypesApi';
import ImageScrollView from '../../components/ImageScrollView';
import { fetchCustomerProperties } from '../../apifunctions/fetchCustomerPropertiesApi';
import { fetchProperties } from '../../apifunctions/fetchPropertiesApi';
import { fetchSoDetails } from '../../apifunctions/fetchSoDetailsApi';



  

const CustomerHome = ({route, navigation}) => {
  const token = route.params?.token
  const [selectedCategoryKey, setSelectedCategoryKey] = useState(null);
  const [categories, setCategories] = useState([]);
  const [customerProperties, setCustomerProperties] = useState([])
  const [properties, setProperties] = useState([]);
  const [advisor, setAdvisor] = useState({});
  const [loadingProperties, setLoadingProperties] = useState(true);
  const [loadingCustomerProperties, setLoadingCustomerProperties] = useState(true);
  const [loadingAdvisor, setLoadingAdvisor] = useState(true); 
  const flatListRef = useRef();


  useEffect(() => {
    const initializeScreen = async () => {
      const paramsToken = route.params?.token;
      const paramsUserId = route.params?.userId;
      const paramsAdvisorId = route.params?.soId;

      try {
        // Fetch categories synchronously as example (though you might not need a loading state for this)
        const fetchedCategories = await fetchPropertyTypes(paramsToken);
        setCategories(fetchedCategories);

        // Fetch properties
        const propertiesResponse = await fetchCustomerProperties(paramsToken, paramsUserId);
        setCustomerProperties(propertiesResponse);
        setLoadingCustomerProperties(false); // Data fetched for customer properties

        const fetchedProperties = await fetchProperties(paramsToken);
        setProperties(fetchedProperties);
        setLoadingProperties(false); // Data fetched for general properties

        // Fetch advisor details
        const advisorDetails = await fetchSoDetails(paramsAdvisorId, paramsToken);
        setAdvisor(advisorDetails);
        setLoadingAdvisor(false); // Advisor data fetched
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setLoadingProperties(false);
        setLoadingCustomerProperties(false);
        setLoadingAdvisor(false);
      }
    };

    initializeScreen();
  }, [route.params?.token, route.params?.userId]);


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

  if (properties.length > 0) {
    console.log("Rendering properties:", customerProperties);
  }

  const filteredProperties = properties.filter(property => 
    !customerProperties.some(customerProperty => customerProperty.id === property.id));


  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
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

      {loadingProperties ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : filteredProperties.length ? (
        <ImageScrollView properties={filteredProperties} navigation={navigation} />
      ) : (
      <View style={styles.npContainer}>
          <Text style={styles.nopText}>No New Projects for now</Text>
      </View>
      )}
      </View>
      <ShowAllButton text="Updates"  onPress={() => {}}/>
      <ProgressBar progress={0.2} />
      <ShowAllButton text="My properties"  onPress={() => {
            navigation.navigate("properties", { screen: "Customer Properties", 
            params: { customerProperties: customerProperties, source: "myProperties", token: token}});
          }}/>

      <ScrollView
      style={{width: '100%'}}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
     {loadingCustomerProperties ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : customerProperties.length ? (
        customerProperties.map((property, index) => {
          const imageUrls = property.images.map(img => img.image);
          return (
            <Card
              key={property.id}
              property={property}
              imageUrls={imageUrls}
              onPress={() => {
                navigation.navigate("properties", {
                  screen: "Property Details",
                  params: { propertyId: property.id },
                });
              }}
            />
          );
        })
      ) : (
      <View style={styles.npContainer}>
        <Text style={styles.nopText}>No New Properties Chosen By Customer</Text>
      </View>
      )}
    </ScrollView>
    <ShowAllButton text="New Projects"  onPress={() => {
            navigation.navigate("properties", { screen: "Customer Properties", 
            params: { properties: filteredProperties, source: "properties",  token: token}});
          }}/>
        <ScrollView
      style={{width: '100%'}}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
    {loadingProperties ? (
       <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : filteredProperties.length ? (
     filteredProperties.map((property, index) => {
    // Extract image URLs from the property's images array
    const imageUrls = property.images.map(img => img.image);
    return (
      <Card
        key={property.id}
        property={property}
        imageUrls={imageUrls} // Pass the extracted URLs here
        onPress={() => {
          navigation.navigate("properties", {
            screen: "Show Properties",
            params: { propertyId: property.id },
          });
        }}
        paramsToken={route.params?.token}
      />
    );
  })
    ) : (
      <View style={styles.npContainer}>
          <Text style={styles.nopText}>No New Projects for now</Text>
      </View>
    )}
    </ScrollView>
    {loadingAdvisor ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : (
        <AdvisorCard advisor={advisor} />
      )}
    </ScrollView>
  );
};

export default CustomerHome;