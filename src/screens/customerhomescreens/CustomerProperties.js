import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet,  StatusBar, View, Text, FlatList, ActivityIndicator, } 
from 'react-native';
import SortHeader from '../../components/SortHeader';
import Carousel from '../../components/Carousel';
import HeaderContainer from '../../components/HeaderContainer';
import { useProperties } from '../../contexts/usePropertiesContext';
import { useCustomerProperties } from '../../contexts/useCustomerPropertiesApi';
import { fetchCustomerProperties } from '../../apifunctions/fetchCustomerPropertiesApi';
import { fetchProperties } from '../../apifunctions/fetchPropertiesApi';
import _ from 'lodash'; 
import { PRIMARY_COLOR } from '../../constants/constantstyles/colors';
import { fetchMyFavourites } from '../../apifunctions/fetchMyFavouritesApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropertiesToggleTab from '../../components/PropertiesTab';


const RenderCustomerFooter = React.memo(({ loading }) => {
  console.log('Render Customer footer, loading:', loading);
  return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
});

const RenderPropertyFooter = React.memo(({ loading }) => {
  return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
});

const sortProperties = (properties, sortOrder) => {
  // Create a new array from properties to avoid mutating the original array
  return [...properties].sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });
};



 
const CustomerProperties = ({ navigation, route }) => {
  const [customerPropertyData, setCustomerPropertyData] = useState([])
  const [commonPropertyData, setCommonPropertyData] = useState([])
  const [nextCustomerPagesUrl, setNextCustomerPagesUrl] = useState(null)
  const [nextPropertyPageUrl, setNextPropertyPageUrl]= useState(null)
  const [customerloading, setCustomerLoading] = useState(false);
  const [propertyLoading, setPropertyLoading] = useState(false)
  const [initialCustomerLoading, setInitialCustomerLoading] = useState(true);
  const [initialPropertyLoading, setInitialPropertyLoading] = useState(true)
  const {nextGlobalPageUrl} = useProperties();
  const {nextCustomerPageUrl} = useCustomerProperties();
  const [sortOrder, setSortOrder] = useState('newest');
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('My Properties');


  const { token, customerProperties: routeCustomerProperties, properties: routeProperties, nextPage: routeNextPage, nextPropertyPage: routePropertyPage, source } = 
  route.params || {};
  

  const { customerProperties: contextCustomerProperties = [], properties: contextProperties = []} = {
    ...useCustomerProperties(),
    ...useProperties()
  };

  const customerProperties = routeCustomerProperties || contextCustomerProperties;
  const properties = routeProperties || contextProperties;
  const nextCustomerPageData = routeNextPage || nextCustomerPageUrl
  const nextPropertyPageData = routePropertyPage || nextGlobalPageUrl

  const customerPropertyIds = useMemo(() => {
    console.log('customer ids', customerProperties.map(p => p.id))
    return new Set(customerProperties.map(p => p.id));
    
  }, [customerProperties]);
  
  // Initial filter for general properties
  const generalProperties = useMemo(() => {
    console.log('property ids', properties)
    return properties.filter(p => !customerPropertyIds.has(p.id));
  }, [properties, customerPropertyIds]);

  const sortedCustomerProperties = useMemo(() => {
    return sortProperties(customerProperties, sortOrder);
}, [customerProperties, sortOrder]);

 
  useEffect(() => {
    setCustomerPropertyData(sortedCustomerProperties);
    setCommonPropertyData(generalProperties)
    setNextCustomerPagesUrl(nextCustomerPageData)
    setNextPropertyPageUrl(nextPropertyPageData)
    setInitialCustomerLoading(false)
    setInitialPropertyLoading(false)
  }, [sortedCustomerProperties, generalProperties, nextCustomerPageData, nextPropertyPageData]);

  useEffect(() => {
    let isSubscribed = true;
  
    const loadFavorites = async () => {
      const paramsToken = await AsyncStorage.getItem('userToken');
      if (!paramsToken || !isSubscribed) return;
  
      try {
        const fetchedFavorites = await fetchMyFavourites(paramsToken);
        if (isSubscribed) {
          console.log("Fetched Favorites:", fetchedFavorites);
          setFavorites(fetchedFavorites.properties.map(fav => fav.id));
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };
  
    loadFavorites();
  
    return () => { isSubscribed = false; };
  }, [commonPropertyData]);

  const handlePropertyPress = useCallback((propertyId, phaseId, isCustomer) => {
    const target = isCustomer ? "Property Details" : "Show Properties";
    navigation.navigate(target, { 
        params: { 
            propertyId: propertyId, 
            phaseId: phaseId, 
            backScreen: "Properties" 
        }
    });
  }, [navigation]);


  const fetchMoreCustomerProperties = async () => {
    if (!nextCustomerPagesUrl || customerloading) {
      console.log('Fetch more halted:', { nextCustomerPagesUrl, customerloading });
      return;
    }
    setCustomerLoading(true);
    try {
      const response = await fetchCustomerProperties(token, null, nextCustomerPagesUrl); 
      let nextCustomerProperties = response.properties;
      const newNextPageUrl = response.nextPageUrl;
    
      nextCustomerProperties = sortProperties(nextCustomerProperties, sortOrder);

    console.log('New Customer properties fetched:', nextCustomerProperties.length);
    setCustomerPropertyData(prevCustomerProperties => [...prevCustomerProperties, ...nextCustomerProperties]);
    setNextCustomerPagesUrl(newNextPageUrl); // Ensure this is updated correctly
    } catch (error) {
      console.error('Failed to fetch more Customer properties:', error);
    } finally {
      setCustomerLoading(false);
      console.log('Setting Customer loading false');
    }
  }

const fetchMoreCommonProperties = async () => {
  if (!nextPropertyPageUrl || propertyLoading) {
    console.log('Fetch more halted:', { nextPropertyPageUrl, propertyLoading });
    return;
  }

  console.log('Fetching more properties from:', nextPropertyPageUrl);
  setPropertyLoading(true);
  try {
    const response = await fetchProperties(null, nextPropertyPageUrl);
    const nextPageUrl = response.nextPageUrl;
    let nextCommonProperties = response.properties;

    // Filter properties directly here, avoiding reassignment
    nextCommonProperties = nextCommonProperties.filter(property => !customerPropertyIds.has(property.id));

    console.log('New properties fetched after filtering:', nextCommonProperties.length);
    setCommonPropertyData(prevCommonProperties => [...prevCommonProperties, ...nextCommonProperties]);
    setNextPropertyPageUrl(nextPageUrl);
  } catch (error) {
    console.error('Failed to fetch more Common properties:', error);
  } finally {
    setPropertyLoading(false);
  }
};


  const renderCustomerItem = ({ item }) => {
    return (
      <View style={{width: '100%'}}>
        <Carousel
            data={item}
            onCardPress={(propertyId, phaseId) => handlePropertyPress(propertyId, phaseId, true)}
            isHeartVisible={false}
            paramsToken={token}
            keyExtractor={(item) => `customer-${item.id}`}
        />
      </View>
    );
  };

  const renderPropertyItem = ({ item }) => {
    return (
      <View style={{width: '100%'}}>
        <Carousel
                    data={item}
                    onCardPress={(propertyId, phaseId) => handlePropertyPress(propertyId, phaseId, false)}
                    favorites={favorites}
                    isHeartVisible={true}
                    paramsToken={token}
                    keyExtractor={(item) => `property-${item.id}`}
          />
      </View>
    );
  };


  const setSortOrderExplicitly = useCallback((newSortOrder) => {
    setSortOrder(newSortOrder);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <StatusBar/>
      <HeaderContainer 
        title={source ? (source === "myProperties" ? "My Properties" : "Properties") : "All Properties"}
        ImageLeft={require('../../../assets/images/back arrow icon.png')}
        ImageRight={require('../../../assets/images/belliconblue.png')}
        onPress={() => { navigation.navigate("Home") }}
      />
       {source === "myProperties" ? 
       <>
       <View style={{ zIndex: 3000, justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <SortHeader title="My Properties" onSort={setSortOrderExplicitly} />
        </View>
       </>: null}
       {source === "myProperties" && (
          <>
            {initialCustomerLoading ? (
          <ActivityIndicator size="large" color={PRIMARY_COLOR} style={styles.loadingIndicator} />
           ) : customerProperties.length > 0 ? (
              <FlatList
                    data={[customerPropertyData]} 
                    renderItem={renderCustomerItem}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={<RenderCustomerFooter loading={customerloading} />}
                    onEndReached={fetchMoreCustomerProperties}
                    onEndReachedThreshold={0.02}
                    extraData={customerloading}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}  
                    style={{ flex: 1 , paddingBottom: 70 }} 
              />
            ) : (
              <View style={styles.npContainer}>
                <Text style={styles.nopText}>No New Properties Chosen By Customer</Text>
              </View>
            )}
          </>
        )}
        {source === "properties" && (
          <>
            <SortHeader title="Properties" onSortPress={() => {}} isSortVisible={false} />
            {initialPropertyLoading ? (
             <ActivityIndicator size="large" color={PRIMARY_COLOR} style={styles.loadingIndicator} />
            ) : generalProperties.length > 0 ? (
              <FlatList
                  data={[commonPropertyData]} // Wrap properties in an array since FlatList expects an array
                  renderItem={renderPropertyItem}
                  keyExtractor={(item, index) => index.toString()}
                  ListFooterComponent={<RenderPropertyFooter loading={propertyLoading} />}
                  onEndReached={fetchMoreCommonProperties}
                  onEndReachedThreshold={0.02}
                  extraData={propertyLoading}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ flexGrow: 1 }}  
                  style={{ flex: 1 , paddingBottom: 70 }}
                />
            ) : (
              <View style={styles.npContainer}>
                <Text style={styles.nopText}>No New Projects for now</Text>
              </View>
            )}
          </>
        )}
        {!source && (
        <>
        <PropertiesToggleTab activeTab={activeTab} setActiveTab={setActiveTab}/>
        <>
        {activeTab === 'My Properties' && (
          <>
          <SortHeader title="My Properties" onSortPress={() => {}} isSortVisible={false} />
          <>
          {initialCustomerLoading ? (
          <ActivityIndicator size="large" color={PRIMARY_COLOR} style={styles.loadingIndicator} />
           ): customerPropertyData.length > 0 ? (
          <FlatList
                    data={[customerPropertyData]} // Wrap properties in an array since FlatList expects an array
                    renderItem={renderCustomerItem}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={<RenderCustomerFooter loading={customerloading} />}
                    onEndReached={fetchMoreCustomerProperties}
                    onEndReachedThreshold={0.02}
                    extraData={customerloading}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}  
                    style={{ flex: 1, paddingBottom: 30, }} 
                    />
                  ) : (
                   <View style={styles.npContainer}>
                     <Text style={styles.nopText}>No New Properties Choosen By Customer</Text>
                   </View>
                   )}
           </>
           </>
           )}
          {activeTab === 'Properties' && (
          <>
          <SortHeader title="Properties" onSortPress={() => {}} isSortVisible={false} />
          <>
          {initialPropertyLoading ? (
             <ActivityIndicator size="large" color={PRIMARY_COLOR} style={styles.loadingIndicator} />
            ) : commonPropertyData.length > 0 ? (
          <FlatList
            data={[commonPropertyData]}
            renderItem={renderPropertyItem}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={<RenderPropertyFooter loading={propertyLoading} />}
            onEndReached={fetchMoreCommonProperties}
            onEndReachedThreshold={0.02}
            showsVerticalScrollIndicator={false}
            extraData={propertyLoading}
            contentContainerStyle={{ flexGrow: 1 }}  
            style={{ flex: 1 , paddingBottom: 70 }}
          />
         ) : (
          <View style={styles.npContainer}>
            <Text style={styles.nopText}>No New Projects For Now</Text>
          </View>
          )}
        </>
        </> 
        )}
        </>
        </>
      )}
        
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,  // Use flex to take up the whole screen
    backgroundColor: 'white',
    paddingBottom: 50,
  },
  container: {
    width: '100%',  // Ensures the ScrollView takes the full width
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  
  },
  filterText: {
    color: '#ffffff',
  },
  npContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  nopText: {
    fontSize: 14,
    color: '#757575',
    fontFamily: 'Poppins'
  },
  loadingIndicator:{
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginVertical: 20,
  },
  
});

export default CustomerProperties;