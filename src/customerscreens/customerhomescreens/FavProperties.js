import React, { useCallback, useState } from 'react';
import { StyleSheet, StatusBar, View, Text, ActivityIndicator, FlatList} from 'react-native';
import HeaderContainer from '../../components/HeaderContainer';
import Carousel from '../../components/Carousel';
import { useFocusEffect } from '@react-navigation/native';
import { fetchMyFavourites } from '../../apifunctions/fetchMyFavouritesApi';
import _ from 'lodash';
import SortHeader from '../../components/SortHeader';

const FavProperties = ({ route, navigation }) => {
  const [favourites, setFavourites] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ favouriteId, setFavouriteId] = useState([]);

  const loadFavourites = async (paramsToken, url) => {
    setLoading(true);
    try {
      const { properties, nextPageUrl } = await fetchMyFavourites(paramsToken, url);
      setFavourites(prev => url ? [...prev, ...properties] : properties);
      setFavouriteId(properties.map(fav => fav.id)) // Append properties if paginating
      setNextPageUrl(nextPageUrl);
      console.log('Favourites fetched:', properties);
    } catch (error) {
      console.error('Failed to fetch favourites:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const paramsToken = route.params?.token;
      loadFavourites(paramsToken);
    }, [route.params?.token])
  );

  const fetchMoreFavourites = useCallback(() => {
    if (nextPageUrl && !loading) {
      console.log('Fetching more properties from:', nextPageUrl);
      loadFavourites(null, nextPageUrl);
    }
  }, [nextPageUrl, loading]);

  const renderItem = ({ item }) => {
    return (
      <View style={{width: '100%'}}>
        {item.length > 0 ? (
        <Carousel
          data={item}
          onCardPress={handleGeneralPropertyPress}
          favorites={favouriteId}
          isHeartVisible={true}
          paramsToken={route.params?.token}
          keyExtractor={(item, index) => `property-${item.id}-${index}`}
          onFavoriteStatusChange={handleFavoriteStatusChange}
        />
      ) : (
        <View style={styles.noFavouritesContainer}>
          <Text style={styles.noFavouritesText}>No Properties are chosen as Favourites</Text>
        </View>
      )}
      </View>
    );
  };

  const renderFooter = () => {
    console.log('Render footer, loading:', loading);  // Check if this logs
    return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
  };

  const handleFavoriteStatusChange = (phaseId, isFavorite) => {
    if (!isFavorite) {
      setFavourites(current => current.filter(item => item.id !== phaseId));
    }
  };


  const handleGeneralPropertyPress = (propertyId, phaseId) => {
    navigation.navigate("properties", {
      screen: "Show Properties", 
      params: { 
        propertyId: propertyId, 
        phaseId: phaseId, 
        backScreen: "Favorites" 
    }});
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar/>
      <HeaderContainer title="Favourites"
        ImageLeft={require('../../../assets/images/back arrow icon.png')}
        ImageRight={require('../../../assets/images/belliconblue.png')}
        onPress={() => navigation.goBack()} />
        
         <FlatList
        data={[favourites]} // Wrap properties in an array since FlatList expects an array
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={<SortHeader title="Favourites" isSortVisible={false} />}
        ListFooterComponent={renderFooter}
        onEndReached={fetchMoreFavourites}
        onEndReachedThreshold={0.01}
        extraData={loading}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}  
        style={{ flex: 1 , paddingBottom: 70 }} 
      />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noFavouritesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noFavouritesText: {
    fontSize: 14,
    color: '#757575',
    fontFamily: 'Poppins'
  },
});

export default FavProperties;