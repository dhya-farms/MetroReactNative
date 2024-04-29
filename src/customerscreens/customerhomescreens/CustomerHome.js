import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, FlatList, ActivityIndicator} 
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
  const [selectedCategoryKey, setSelectedCategoryKey] = useState('filter');
  const [categories, setCategories] = useState([{ key: 'filter', name: 'Filter' }]);
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
        setCategories([{ key: 'filter', name: 'Filter' }, ...fetchedCategories]);

        // Fetch properties
        const propertiesResponse = await fetchCustomerProperties(paramsToken, paramsUserId);
        setCustomerProperties(propertiesResponse);
        setLoadingCustomerProperties(false);

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
  
  const filterCustomerPropertiesByCategory = (customerProperties, categoryId) => {
    return customerProperties.filter(property => property.property.property_type.id === parseInt(categoryId));
  };

  const filterPropertiesByCategory = (properties, categoryId) => {
    return properties.filter(property => property.property_type.id === parseInt(categoryId));
  };


  const renderItem = ({ item }) => {
    const isSelected = item.key === selectedCategoryKey;
    return (
      <TouchableOpacity
        style={[styles.categoryButton, isSelected ? styles.categoryButtonSelected : null]}
        onPress={() => {
          if (item.key === 'filter') {
            setSelectedCategoryKey('filter'); // Reset to show all
          } else {
            setSelectedCategoryKey(item.key); // Set to the selected category
          }
        }}
      >
        <Text style={[styles.categoryText, isSelected ? styles.categoryTextSelected : null]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  if (properties.length > 0) {
    console.log("Rendering properties:", customerProperties);
  }

  const filteredProperties = properties.filter(property =>
    !customerProperties.some(customerProperty =>
      customerProperty.property.id === property.id

    )
  );
  
  const finalProperties = selectedCategoryKey && selectedCategoryKey !== 'filter'
  ? filterPropertiesByCategory(filteredProperties, selectedCategoryKey)
  : filteredProperties;

  const finalCustomerProperties = selectedCategoryKey && selectedCategoryKey !== 'filter'
  ? filterCustomerPropertiesByCategory(customerProperties, selectedCategoryKey): customerProperties


  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Home</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Image source={require('../../../assets/images/belliconblue.png')} style={styles.bellIcon} />
        </TouchableOpacity>
      </View>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.searchSection}>
        <Icon style={styles.searchIcon} name="search" size={20} color="#C4C4C4" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search here"
          placeholderTextColor="#C4C4C4"
        />
      </View>

      <View style={{width: '100%', marginVertical: 20, marginHorizontal: 2, paddingHorizontal: 12,}}>
      <FlatList
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.key.toString()}
      />
      </View>
      <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
      {loadingProperties ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : finalProperties.length ? (
        <ImageScrollView properties={finalProperties} navigation={navigation} />
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
      ) : finalCustomerProperties.length ? (
        finalCustomerProperties.slice(0, 2).map((property, index) => {
          const imageUrls = property.property.images.map(img => img.image);
          return (
            <Card
              key={property.id}
              property={property.property}
              displayText={property.displayText}
              imageUrls={imageUrls}
              onPress={() => {
                navigation.navigate("properties", {
                  screen: "Property Details",
                  params: {
                    propertyId: property.id,
                    backScreen: "Home"  // Indicating that the navigation originated from the Properties screen
                  }
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
      ) : finalProperties.length ? (
        finalProperties.slice(0, 2).map((property, index) => {
    // Extract image URLs from the property's images array
    const imageUrls = property.images.map(img => img.image);
    return (
      <Card
        key={property.id}
        property={property}
        displayText={property.displayText}
        imageUrls={imageUrls} // Pass the extracted URLs here
        onPress={() => {
          navigation.navigate("properties", {
            screen: "Show Properties",
            params: {
              propertyId: property.id,
              backScreen: "Home"  // Indicating that the navigation originated from the Properties screen
            }
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
    </View>
  );
};

export default CustomerHome;