import React from 'react';
import { View, ScrollView, StyleSheet, StatusBar} 
from 'react-native';
import SortHeader from '../../components/SortHeader';;
import HeaderContainer from '../../components/HeaderContainer';
import OfficeUpdateView from '../../components/OfficeUpdateView';


const cardData = [
    {
      id: '1',
      name: 'Mr. Muralitharan',
      date: 'Sep 12th, 2022',
      title: 'METRO SHIVA SHAKTHI RESIDENCY',
      description: 'Total 190 plots from 720 sqft to 2500 sqft - Kinathukadavu, Arasampalayam',
      source: require('../../../assets/images/plotimage.png'), 
      personimage: require('../../../assets/images/ceoimage.png')// Replace with your actual image source
    },
    {
        id: '2',
        name: 'Mr. Muralitharan',
        date: 'Sep 12th, 2022',
        title: 'METRO SHIVA SHAKTHI RESIDENCY',
        description: 'Total 190 plots from 720 sqft to 2500 sqft - Kinathukadavu, Arasampalayam',
        source: require('../../../assets/images/plotimage.png'),
        personimage: require('../../../assets/images/ceoimage.png') // Replace with your actual image source
    },
  ]







  const AdminOfficeUpdates = ({navigation}) => {

  
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <StatusBar/>
        <HeaderContainer title="Office Updates" 
        ImageLeft={require('../../../assets/images/back arrow icon.png')}
        ImageRight={require('../../../assets/images/belliconblue.png')}
        onPress={()=>{navigation.goBack()}}/>
        <View style={{zIndex: 2000, justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
        <SortHeader title="Office Updates"  />
        </View>
        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <OfficeUpdateView cardData={cardData}
            textContainerStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }} isHorizontal= {false}/>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 50,
  },
  filterText: {
    color: '#ffffff',
  }
  
});

export default AdminOfficeUpdates;