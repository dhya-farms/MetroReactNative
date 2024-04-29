import React, { useCallback, useState } from 'react';
import { StyleSheet, StatusBar, View, Text, ActivityIndicator} from 'react-native';
import HeaderContainer from '../../components/HeaderContainer';
import Carousel from '../../components/Carousel';
import { useFocusEffect } from '@react-navigation/native';
import { fetchMyFavourites } from '../../apifunctions/fetchMyFavouritesApi';
import { ScrollView } from 'react-native-virtualized-view';

const FavProperties = ({ route, navigation }) => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavourites = async (paramsToken) => {
    setLoading(true);
    try {
      const favouritesResponse = await fetchMyFavourites(paramsToken);
      setFavourites(favouritesResponse);
      console.log('Favourites fetched:', favouritesResponse);
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
      return () => {};
    }, [route.params?.token])
  );

  const handleFavoriteStatusChange = (propertyId, isFavorite) => {
    if (!isFavorite) {
      setFavourites(current => current.filter(item => item.id !== propertyId));
    }
  };


  const handleGeneralPropertyPress = (propertyId) => {
    navigation.navigate("properties", { screen: "Show Properties", 
    params: { propertyId: propertyId,
      backScreen: "Favorites"}});
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
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {favourites.length > 0 ? (
        <Carousel
          data={favourites}
          onCardPress={handleGeneralPropertyPress}
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
    </ScrollView>
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