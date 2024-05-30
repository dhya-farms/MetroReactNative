import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet,  StatusBar, View, Text, FlatList, ActivityIndicator} from 'react-native';
import SortHeader from '../../components/SortHeader';
import Carousel from '../../components/Carousel';
import HeaderContainer from '../../components/HeaderContainer';
import { useProperties } from '../../contexts/usePropertiesContext';
import { fetchCommonProperties } from '../../apifunctions/fetchCommonProperties';
import _ from 'lodash'; 




const SOproperties = ({route, navigation}) => {
  const [soProperties, setSoProperties] = useState([]);
  const { properties } = useProperties();
  const {nextGlobalPageUrl} = useProperties();
  const routeProperties = route.params?.properties;
  const propertiesData = routeProperties || properties
  const routeNextPage = route.params?.nextPage;
  const nextPageData = routeNextPage || nextGlobalPageUrl
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setSoProperties(propertiesData);
    setNextPageUrl(nextPageData)
  }, [propertiesData, nextPageData]);

  const handleGeneralPropertyPress = (propertyId, phaseId) => {
    navigation.navigate("SO Properties Details", {
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
      const { properties: newProperties, nextPageUrl: newNextPageUrl } = await fetchCommonProperties(null, nextPageUrl);
      console.log('New properties fetched:', newProperties.length);
      setSoProperties(prevProperties => [...prevProperties, ...newProperties]);
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
    console.log('Render footer, loading:', loading); 
    return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
  };

  
  return (
    <View style={styles.mainContainer}>
      <StatusBar/>
      <HeaderContainer title="Properties" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{ navigation.navigate("SO home", {
        screen: "SO home",
      })}}/>
       <>
        {soProperties.length > 0 ? (
       <FlatList
        data={[soProperties]} // Wrap properties in an array since FlatList expects an array
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={<SortHeader title="Properties" isSortVisible={false} />}
        ListFooterComponent={renderFooter}
        onEndReached={fetchMoreProperties}
        onEndReachedThreshold={0.02}
        extraData={loading}
        showsVerticalScrollIndicator={false}
      />
    ) : (
      <View style={styles.npContainer}>
        <Text style={styles.nopText}>No New Projects For Now</Text>
      </View>
      )}
    </>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,  // Use flex to take up the whole screen
    backgroundColor: 'white'
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

export default SOproperties;