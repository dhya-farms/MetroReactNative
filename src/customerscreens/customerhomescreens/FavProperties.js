import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, StatusBar, View, Text, ActivityIndicator} from 'react-native';
import HeaderContainer from '../../components/HeaderContainer';
import Carousel from '../../components/Carousel';
import { useFocusEffect } from '@react-navigation/native';
import { fetchMyFavourites } from '../../apifunctions/fetchMyFavouritesApi';

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
    navigation.navigate("Show Properties", { params: { propertyId } });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <HeaderContainer title="Favourites"
        ImageLeft={require('../../../assets/images/back arrow icon.png')}
        ImageRight={require('../../../assets/images/belliconblue.png')}
        onPress={() => navigation.goBack()} />
      
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