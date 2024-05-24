import React, { useEffect, useRef, useState, useMemo } from 'react';
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
import { PRIMARY_COLOR } from '../../constants/constantstyles/colors';



  

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
  const [nextCustomerPageUrl, setNextCustomerPageUrl] = useState(null)
  const [nextPropertyPageUrl, setNextPropertyPageUrl]= useState(null)
  const [searchTerm, setSearchTerm] = useState('');
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
        const {properties: propertiesResponse, nextPageUrl: nextPage} = await fetchCustomerProperties(paramsToken, paramsUserId);
        setCustomerProperties(propertiesResponse);
        console.log("customer properties", propertiesResponse)
        setNextCustomerPageUrl(nextPage)
        setLoadingCustomerProperties(false);

        const {properties: commonProperties, nextPageUrl: nextPropertyPage} = await fetchProperties(paramsToken);
        setProperties(commonProperties);
        console.log("images",commonProperties)
        setNextPropertyPageUrl(nextPropertyPage)
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

  const filteredProperties = properties.filter(property =>
    !customerProperties.some(customerProperty =>
      customerProperty.id === property.id
    )
  );
  
  const finalProperties = selectedCategoryKey && selectedCategoryKey !== 'filter'
  ? filterPropertiesByCategory(filteredProperties, selectedCategoryKey)
  : filteredProperties;

  const finalCustomerProperties = selectedCategoryKey && selectedCategoryKey !== 'filter'
  ? filterCustomerPropertiesByCategory(customerProperties, selectedCategoryKey): customerProperties

  const filterPropertiesByName = (properties, searchTerm) => {
    return properties.filter(property => 
      property.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };


  const finalPropertiesFiltered = useMemo(() => {
    return searchTerm
      ? filterPropertiesByName(finalProperties, searchTerm)
      : finalProperties;
  }, [finalProperties, searchTerm]);


  const finalCustomerPropertiesFiltered = useMemo(()=>{
    return searchTerm
      ? filterPropertiesByName(finalCustomerProperties, searchTerm)
      : finalCustomerProperties;
  }, [finalCustomerProperties, searchTerm]);

  const calculateProgress = (property) => {
    let stagesCompleted = 1; // Start with 1 to always fill the first stage
    let progressText = "Site Visit in Progress";

    if (property.is_site_visit_done) {
        stagesCompleted += 1;
        progressText = "Token Advance in Progress";
    }
    if (property.is_token_advance_done) {
        stagesCompleted += 1;
        progressText = "Documentation in Progress";
    }
    if (property.is_documentation_done) {
        stagesCompleted += 1;
        progressText = "Payment in Progress";
    }
    if (property.is_payment_done) {
        stagesCompleted += 1;
        progressText = "Document Delivery in Progress";
    }
    if (property.is_document_delivery_done) {
        stagesCompleted += 1;
        progressText = "All stages completed";
    }

    return {
        progress: stagesCompleted / 5,
        progressText
    };
  };






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
          onChangeText={text => setSearchTerm(text)}
          value={searchTerm}
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
        <ActivityIndicator size="large" color={PRIMARY_COLOR} style={styles.loadingIndicator} />
      ) : finalPropertiesFiltered.length ? (
        <ImageScrollView properties={finalPropertiesFiltered} navigation={navigation} />
      ) : (
      <View style={styles.npContainer}>
          <Text style={styles.nopText}>No New Projects for now</Text>
      </View>
      )}
      </View>
      <ShowAllButton text="Updates"  onPress={() => {
            navigation.navigate("properties", { screen: "Customer Properties", 
            params: { customerProperties: customerProperties, source: "myProperties", nextPage: nextCustomerPageUrl, token: token}});
          }}/>
      {loadingCustomerProperties ? (
    <ActivityIndicator size="large" color={PRIMARY_COLOR} style={styles.loadingIndicator} />
      ) : customerProperties.map(property => {
          const { progress, progressText } = calculateProgress(property);
          return (
              <View key={property.id} style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                  <ProgressBar progress={progress} propertyName={property.name} progressText={progressText} />
              </View>
          );
      })}
      <ShowAllButton text="My properties"  onPress={() => {
            navigation.navigate("properties", { screen: "Customer Properties", 
            params: { customerProperties: customerProperties, source: "myProperties", nextPage: nextCustomerPageUrl, token: token}});
          }}/>

      <ScrollView
      style={{width: '100%'}}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
     {loadingCustomerProperties ? (
        <ActivityIndicator size="large" color={PRIMARY_COLOR} style={styles.loadingIndicator} />
      ) : finalCustomerPropertiesFiltered.length ? (
        finalCustomerPropertiesFiltered.map((property, index) => {
          const imageUrls = property.property.images.map(img => img.image);
          return (
            <Card
              key={property.id}
              property={property}
              displayText={property.displayText}
              imageUrls={imageUrls}
              onPress={() => {
                navigation.navigate("properties", {
                  screen: "Property Details",
                  params: {
                    propertyId: property.propertyId,
                    phaseId: property.id,
                    backScreen: "Home" // Indicating that the navigation originated from the Properties screen
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
            params: { properties: properties, source: "properties", nextPropertyPage: nextPropertyPageUrl, token: token}});
          }}/>
        <ScrollView
      style={{width: '100%'}}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
    {loadingProperties ? (
       <ActivityIndicator size="large" color={PRIMARY_COLOR} style={styles.loadingIndicator} />
      ) : finalPropertiesFiltered.length ? (
        finalPropertiesFiltered.slice(0, 2).map((property, index) => {
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
              propertyId: property.propertyId,
              phaseId: property.id,
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
        <ActivityIndicator size="large" color={PRIMARY_COLOR} style={styles.loadingIndicator} />
      ) : (
        <AdvisorCard advisor={advisor} />
      )}
    </ScrollView>
    </View>
  );
};

export default CustomerHome;