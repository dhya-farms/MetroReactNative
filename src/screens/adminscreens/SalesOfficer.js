import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions} 
from 'react-native';
import SortHeader from '../../components/SortHeader';
import Carousel from '../../components/Carousel';
import HeaderContainer from '../../components/HeaderContainer';
import CustomerCard from '../../components/CustomerCard';
import SOcards from '../../components/SOcard';


const SOdata  = [
    {
        id: 1,
        name: 'Hari Kowshick',
        number: '+91-9486077810',
        mailId: 'hari@gmail.com',
        points: '7Metro Points',
        clients: '3 Clients',
        source: require('../../../assets/images/soperson.png')
    },
    {
        id: 2,
        name: 'Ranjith',
        number: '+91-9486077810',
        mailId: 'ranjith@gmail.com',
        points: '6Metro Points',
        clients: '2 Clients',
        source: require('../../../assets/images/soperson.png')
    },
    {
        id: 3,
        name: 'Dinesh',
        number: '+91-9486077810',
        mailId: 'dinesh@gmail.com',
        points: '10Metro Points',
        clients: '5 Clients',
        source: require('../../../assets/images/soperson.png')
    }
]




const SalesOfficerList = ({navigation}) => {

  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <HeaderContainer title="Sales Officer List" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}/>
      <View style={{zIndex: 2000, justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
      <SortHeader title="SO List"  />
      </View>
      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <SOcards data={SOdata} isHorizontal={false}  navigation={navigation}/>
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

export default SalesOfficerList;