import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions, StatusBar, ActivityIndicator, FlatList} 
from 'react-native';
import SortHeader from '../../components/SortHeader';
import HeaderContainer from '../../components/HeaderContainer';
import CardScrollView from '../../components/CarousalCardView';
import { fetchStatusRequests } from '../../apifunctions/fetchStatusRequests';
import _ from 'lodash'; 






const SOApprovals = ({route, navigation}) => {
  const [requests, setRequests] = useState([]);
  const routeRequests = route.params?.soRequests;
  const routeNextPage = route.params?.nextPage;
  const effectiveSoId = route.params?.effectiveSoId || null
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState('newest');
  
  const toggleSortOrder = () => {
    setSortOrder(prevSortOrder => prevSortOrder === 'newest' ? 'oldest' : 'newest');
  };

  const soRequestsData = useMemo(() => {
    const sortedRequests = [...routeRequests];
    sortedRequests.sort((a, b) => {
      const dateA = new Date(a.requested_at);
      const dateB = new Date(b.requested_at);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
    return sortedRequests;
  }, [routeRequests, sortOrder]);

  

  useEffect(() => {
    setRequests(soRequestsData);
    console.log("route requests", soRequestsData)
    setNextPageUrl(routeNextPage)
  }, [soRequestsData, routeNextPage]);

  const fetchMoreRequests = useCallback(_.debounce(async () => {
    if (!nextPageUrl || loading) {
      console.log('Fetch more halted:', { nextPageUrl, loading });
      return;
    }
  
    console.log('Fetching more properties from:', nextPageUrl);
    console.log('Setting loading true');
    setLoading(true);
    try {
      const { soRequests: newRequests, nextPageUrl: newNextPageUrl } = await fetchStatusRequests(null, effectiveSoId, nextPageUrl);
      console.log('New properties fetched:', newRequests.length);
      if (newRequests.length > 0) {
        console.log('New properties fetched:', newRequests.length);
        const combinedRequests = [...requests, ...newRequests];
        combinedRequests.sort((a, b) => {
          const dateA = new Date(a.requested_at);
          const dateB = new Date(b.requested_at);
          return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });
        setRequests(combinedRequests);
        setNextPageUrl(newNextPageUrl);
      }
    } catch (error) {
      console.error('Failed to fetch more properties:', error);
    } finally {
      console.log('Setting loading false');
      setLoading(false);
    }
  }, 300), [nextPageUrl, loading, requests, sortOrder]);

  const renderItem = ({ item }) => {
    return (
      <View style={{width: '100%'}}>
          <CardScrollView data={item} isHorizontal= {false} onCardPress={(customerId) => {
              navigation.navigate("Client", { 
                screen: "List Customer Details",
                params: { customerId: customerId, backScreen: "soManager"} // Pass customerId to the detail screen
            });
          }}/>
      </View>
    );
  };

  const renderFooter = () => {
    console.log('Render footer, loading:', loading);  // Check if this logs
    return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
  };

  const renderEmptyComponent = () => {
    return (
      <View style={styles.npContainer}>
            <Text style={styles.nopText}>No Approvals Created by the Sales Officer</Text>
      </View>
    );
  };
  
  return (
    <View style={styles.mainContainer}>
      <StatusBar/>
      <HeaderContainer title="Approval List" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}/>
      <View style={{zIndex: 2000, justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
      <SortHeader title="Approval" onSort={toggleSortOrder}/>
      </View>
      <FlatList
        data={requests.length > 0 ? [requests] : []} // Wrap properties in an array since FlatList expects an array
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={fetchMoreRequests}
        onEndReachedThreshold={0.02}
        extraData={loading}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}  
        style={{ flex: 1 }} 
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,  // Use flex to take up the whole screen
    backgroundColor: 'white',
    paddingBottom: 30,
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
  
});

export default SOApprovals;