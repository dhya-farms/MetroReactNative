import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, StatusBar, FlatList, Text} 
from 'react-native';
import SortHeader from '../../components/SortHeader';
import HeaderContainer from '../../components/HeaderContainer';
import SOcards from '../../components/SOcard';
import { fetchSoUsers } from '../../apifunctions/fetchSoApi';
import _ from 'lodash'; 


const SalesOfficerList = ({route, navigation}) => {
  const [backscreen, setBackScreen] = useState('')
   const [soUser, setSoUser] = useState([]);
  const routeNextPage = route.params?.nextPage
  const nextPageData = routeNextPage 
  const unsortedSoUsers = route.params?.soUsers
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState('newest');
  
  const setSortOrderExplicitly = (order) => {
    setSortOrder(order);
  };

  const sortSoUsers = (soUsers) => {
    return soUsers.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  };

  // Sort SO users when sortOrder changes or when initial data is loaded
  useEffect(() => {
    setSoUser(sortSoUsers([...unsortedSoUsers]));
    setNextPageUrl(nextPageData)
  }, [unsortedSoUsers, sortOrder, nextPageData]);

  const fetchMoreSo = useCallback(_.debounce(async () => {
    if (!nextPageUrl || loading) {
      console.log('Fetch more halted:', { nextPageUrl, loading });
      return;
    }
  
    console.log('Fetching more SO from:', nextPageUrl);
    console.log('Setting loading true');
    setLoading(true);
    try {
      const { so: newSo, nextPageUrl: newNextPageUrl } = await fetchSoUsers(null, nextPageUrl);
      console.log('New properties fetched:', newSo.length);
      setSoUser(prevSo => sortSoUsers([...prevSo, ...newSo]));
      setNextPageUrl(newNextPageUrl);
    } catch (error) {
      console.error('Failed to fetch more SO:', error);
    } finally {
      console.log('Setting loading false');
      setLoading(false);
    }
  }, 300), [nextPageUrl, loading, sortOrder]);

  const renderItem = ({ item }) => {
    return (
      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
         <SOcards data={item} isHorizontal={false}  onCardPress={(SoId) => {
           navigation.navigate("SO", {
            screen: "SO Officers Details",
            params: { SoId: SoId, soUsers: item, backScreen: 'SOList' },
          });
        }}/>
      </View>
    );
  };

  const renderFooter = () => {
    console.log('Render footer, loading:', loading);  // Check if this logs
    return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
  };

  

  useEffect(() => {
  const nestedBackScreen = route.params?.params?.backScreen;
  const directBackScreen = route.params?.backScreen;
  const effectiveBackScreen = nestedBackScreen || directBackScreen;
  console.log("Effective Back Screen for use:", effectiveBackScreen);
    if (effectiveBackScreen) {
      console.log("Navigated from:", effectiveBackScreen);
      setBackScreen(effectiveBackScreen)
    } else {
      console.log("No Back Screen provided in route params.");
    }

  }, [backscreen]);

    

  return (
    <View style={styles.mainContainer}>
      <StatusBar/>
      <HeaderContainer title="Sales Officer List" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>navigation.goBack()}/>
      <View style={{zIndex: 2000, justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
      <SortHeader title="SO List" onSort={setSortOrderExplicitly}/>
      </View>
      <>
     {soUser.length > 0 ? (
      <FlatList
        data={[soUser]} // Wrap properties in an array since FlatList expects an array
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={fetchMoreSo}
        onEndReachedThreshold={0.04}
        extraData={loading}
        showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.npContainer}>
          <Text style={styles.nopText}>Error Occured. Please Try Again</Text>
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

export default SalesOfficerList;