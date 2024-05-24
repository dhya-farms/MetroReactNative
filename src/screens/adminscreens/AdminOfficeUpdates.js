import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet, StatusBar, FlatList} 
from 'react-native';
import SortHeader from '../../components/SortHeader';;
import HeaderContainer from '../../components/HeaderContainer';
import OfficeUpdateView from '../../components/OfficeUpdateView';
import { fetchUpdates } from '../../apifunctions/fetchUpdatesApi';
import _ from 'lodash'; 



  const AdminOfficeUpdates = ({route, navigation}) => {
    const [officeUpdates, setOfficalUpdates] = useState([])
    const routeUpdates = route.params?.updates
    const routeNextPage = route.params?.nextPage
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [sortOrder, setSortOrder] = useState('newest');
    const [loading, setLoading] = useState(false);

    const toggleSortOrder = () => {
      setSortOrder(prevSortOrder => prevSortOrder === 'newest' ? 'oldest' : 'newest');
    };
  
    const UpdatesData = useMemo(() => {
      const sortedUpdates = [...routeUpdates]; // Create a copy of the updates array
      return sortedUpdates.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
      });
    }, [routeUpdates, sortOrder]);
  
    useEffect(() => {
      setOfficalUpdates(UpdatesData);
      setNextPageUrl(routeNextPage)
      console.log(UpdatesData)
    }, [UpdatesData, nextPageUrl]);  


    const fetchMoreUpdates = useCallback(_.debounce(async () => {
      if (!nextPageUrl || loading) {
        console.log('Fetch more halted:', { nextPageUrl, loading });
        return;
      }
    
      console.log('Fetching more updates from:', nextPageUrl);
      console.log('Setting loading true');
      setLoading(true);
      try {
        const { updates: newUpdates, nextPageUrl: newNextPageUrl } = await fetchUpdates(null, nextPageUrl);
        console.log('New updates fetched:', newUpdates.length);
        setOfficalUpdates(prevUpdates => [...prevUpdates, ...newUpdates]);
        setNextPageUrl(newNextPageUrl);
      } catch (error) {
        console.error('Failed to fetch more Updates:', error);
      } finally {
        console.log('Setting loading false');
        setLoading(false);
      }
    }, 300), [nextPageUrl, loading]);
  
    const renderItem = ({ item }) => {
      return (
        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <OfficeUpdateView cardData={item}
            textContainerStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }} isHorizontal= {false}/>
        </View>
      );
    };
  
    const renderFooter = () => {
      console.log('Render footer, loading:', loading);  // Check if this logs
      return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
    };

  
    return (
      <View style={styles.mainContainer}>
       <StatusBar/>
       <HeaderContainer title="Office Updates" 
        ImageLeft={require('../../../assets/images/back arrow icon.png')}
        ImageRight={require('../../../assets/images/belliconblue.png')}
        onPress={()=>{navigation.goBack()}}/>
        <View style={{ zIndex: 3000, justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <SortHeader title="Customer List" onSort={toggleSortOrder} />
        </View>
        <FlatList
            data={[officeUpdates]} // Wrap properties in an array since FlatList expects an array
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={renderFooter}
            onEndReached={fetchMoreUpdates}
            onEndReachedThreshold={0.04}
            extraData={loading}
            showsVerticalScrollIndicator={false}
          />
        </View>
    );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,  // Use flex to take up the whole screen
    backgroundColor: 'white'
  },
  filterText: {
    color: '#ffffff',
  }
  
});

export default AdminOfficeUpdates;