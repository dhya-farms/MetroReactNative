import React from 'react';
import { ScrollView, StyleSheet, StatusBar} 
from 'react-native';
import SortHeader from '../../components/SortHeader';
import Carousel from '../../components/Carousel';
import HeaderContainer from '../../components/HeaderContainer';
import { useProperties } from '../../contexts/usePropertiesContext';
import { useCustomerProperties } from '../../contexts/useCustomerPropertiesApi';


 
const CustomerProperties = ({ navigation, route }) => {
  // Extract properties from params or context as fallback
  const token = route.params?.token
  const customerProperties = route.params?.customerProperties || useCustomerProperties().customerProperties;
  const properties = route.params?.properties || useProperties().properties;
  const allProperties = useProperties().properties;

  const taggedCustomerProperties = customerProperties.map(item => ({ ...item, originalSource: 'customer' }));
  const taggedProperties = properties.map(item => ({ ...item, originalSource: 'property' }));

  const customerPropertyIds = new Set(customerProperties.map(p => p.id));
  const generalProperties = allProperties.filter(p => !customerPropertyIds.has(p.id));


  let propertiesToDisplay = [];
  const title = route.params?.source === "myProperties" ? "My Properties" :
                route.params?.source === "properties" ? "Properties" :
                "All Properties";

  const noPropertiesMessage = route.params?.source === "myProperties" ?
            "No Properties Chosen By Customer" :
            "No New Projects for Now";

  // Determine navigation target based on the context
  const navigationTarget = route.params?.source === "myProperties" ? "Property Details" : "Show Properties";

  // Conditionally set propertiesToDisplay based on the source
  if (route.params?.source === "myProperties") {
    propertiesToDisplay = customerProperties;
  } else if (route.params?.source === "properties") {
    propertiesToDisplay = properties;
  } else {
    // For "All Properties", combine and remove duplicates
    const combinedProperties = [...taggedCustomerProperties, ...taggedProperties];
    propertiesToDisplay = Array.from(new Map(combinedProperties.map(item => [item.id, item])).values());
  }

  const handleCustomerPropertyPress = (propertyId) => {
    navigation.navigate("Property Details", { params: { propertyId } });
  };

  // Define a function for general property card press
  const handleGeneralPropertyPress = (propertyId) => {
    navigation.navigate("Show Properties", { params: { propertyId } });
  };
  
  const isHeartVisible = route.params?.source !== "myProperties";


  // Render component
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar/>
      <HeaderContainer title={title}
        ImageLeft={require('../../../assets/images/back arrow icon.png')}
        ImageRight={require('../../../assets/images/belliconblue.png')}
        onPress={() => { navigation.navigate("Home") }}
      />
       {/* Render conditionally based on the source */}
    {route.params?.source ? (
      <>
        <SortHeader title={title} onSortPress={() => {}} isSortVisible={title === "My Properties"} />
      {propertiesToDisplay.length > 0 ? (
        <Carousel
          data={propertiesToDisplay}
          onCardPress={(propertyId) => navigation.navigate(navigationTarget, { params: { propertyId } })}
          isHeartVisible={isHeartVisible}
          paramsToken={token}
          keyExtractor={(item, index) => `property-${item.originalSource}-${item.id}-${index}`}
        />
      ) : (
        <View style={styles.npContainer}>
          <Text style={styles.nopText}>{noPropertiesMessage}</Text>
        </View>
      )}
      </>
    ) : (
      <>
        {/* Customer Properties Section */}
        <SortHeader title="My Properties" onSortPress={() => {}} isSortVisible={false} />
      {customerProperties.length > 0 ? (
        <Carousel
          data={customerProperties}
          onCardPress={handleCustomerPropertyPress}
          isCustomerProperty={true}
          isHeartVisible={false}
          paramsToken={token}
          keyExtractor={(item) => `customer-${item.id}`}
        />
      ) : (
      <View style={styles.npContainer}>
        <Text style={styles.nopText}>No New Properties Chosen By Customer</Text>
      </View>
      )}


    <SortHeader title="Properties" onSortPress={() => {}} isSortVisible={false} />
      {generalProperties.length > 0 ? (
        <Carousel
          data={generalProperties}
          onCardPress={handleGeneralPropertyPress}
          isCustomerProperty={false}
          isHeartVisible={true}
          paramsToken={token}
          keyExtractor={(item) => `property-${item.id}`}
        />
      ) : (
      <View style={styles.npContainer}>
        <Text style={styles.nopText}>No New Projects for now</Text>
      </View>
      )}
      </>
    )}
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
  
});

export default CustomerProperties;