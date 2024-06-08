import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet,  StatusBar, View, Text, FlatList, ActivityIndicator} from 'react-native';
import SortHeader from '../../components/SortHeader';
import Carousel from '../../components/Carousel';
import HeaderContainer from '../../components/HeaderContainer';
import { useAdminProperties } from '../../contexts/useAdminProperties';
import { fetchAdminProperties } from '../../apifunctions/fetchAdminPropertiesApi';
import _ from 'lodash'; 
import { PRIMARY_COLOR } from '../../constants/constantstyles/colors';




const AdminProperties = ({route, navigation}) => {
  const [properties, setProperties] = useState([]);
  const { adminProperties } = useAdminProperties();
  const { nextGlobalPageUrl } = useAdminProperties();
  const routeProperties = route.params?.properties;
  const routeNextPage = route.params?.nextPage;
  const propertiesData = routeProperties || adminProperties
  const nextPageData = routeNextPage || nextGlobalPageUrl
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProperties(propertiesData);
    setNextPageUrl(nextPageData)
  }, [propertiesData, nextPageData]);

  const handleGeneralPropertyPress = (propertyId, phaseId) => {
    navigation.navigate("Admin Properties Details", {
      params: { 
        propertyId: propertyId, 
        phaseId: phaseId, 
        backScreen: "Properties" 
    }});
  };

  const fetchMoreProperties = useCallback(_.debounce(async () => {
    if (!nextPageUrl || loading) {
      console.log('Fetch more halted:', { nextPageUrl, loading });
      return;
    }
  
    console.log('Fetching more properties from:', nextPageUrl);
    console.log('Setting loading true');
    setLoading(true);
    try {
      const { properties: newProperties, nextPageUrl: newNextPageUrl } = await fetchAdminProperties(null, null, nextPageUrl);
      console.log('New properties fetched:', newProperties.length);
      setProperties(prevProperties => [...prevProperties, ...newProperties]);
      setNextPageUrl(newNextPageUrl);
    } catch (error) {
      console.error('Failed to fetch more properties:', error);
    } finally {
      console.log('Setting loading false');
      setLoading(false);
    }
  }, 300), [nextPageUrl, loading]);

  const renderItem = ({ item }) => {
    return (
      <View style={{width: '100%'}}>
        <Carousel
          data={item}
          onCardPress={handleGeneralPropertyPress}
          isHeartVisible={false}
          keyExtractor={(item) => `property-${item.id}`}
        />
      </View>
    );
  };

  const renderFooter = () => {
    console.log('Render footer, loading:', loading);  // Check if this logs
    return loading ? <ActivityIndicator size="large" color={PRIMARY_COLOR} /> : null;
  };

  
  return (
    <View style={styles.mainContainer}>
      <StatusBar/>
      <HeaderContainer title="Properties" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{ navigation.navigate("Home", {
        screen: "Admin Home",
      })}}/>
      <FlatList
        data={[properties]} // Wrap properties in an array since FlatList expects an array
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={<SortHeader title="Properties" isSortVisible={false} />}
        ListFooterComponent={renderFooter}
        onEndReached={fetchMoreProperties}
        onEndReachedThreshold={0.02}
        extraData={loading}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,  // Use flex to take up the whole screen
    backgroundColor: 'white',
  },
  container: {
    width: '100%',  // Ensures the ScrollView takes the full width
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 50,
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

export default AdminProperties;