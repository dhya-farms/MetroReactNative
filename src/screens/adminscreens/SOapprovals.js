import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions, StatusBar} 
from 'react-native';
import SortHeader from '../../components/SortHeader';
import HeaderContainer from '../../components/HeaderContainer';
import CardScrollView from '../../components/CarousalCardView';


const data = [
    {
      name: 'Hari Kowshick (SO)',
      customer: 'Suraj',
      property: 'Metro Shiva Shakthi Residency',
      requestDate: '12/12/2022',
    },
    {
        name: 'Hari Kowshick (SO)',
        customer: 'Suraj',
        property: 'Metro Shiva Shakthi Residency',
        requestDate: '12/12/2022',
        requestType: 'Site visit',
    },
    {
        name: 'Hari Kowshick (SO)',
        customer: 'Suraj',
        property: 'Metro Shiva Shakthi Residency',
        requestDate: '12/12/2022',
        requestType: 'Site visit',
    },
    // ... other card data
  ];




const SOApprovals = ({navigation}) => {

  
  return (
    <View style={styles.mainContainer}>
      <StatusBar/>
      <HeaderContainer title="Approval List" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}/>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={{zIndex: 2000, justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
      <SortHeader title="Approval"  />
      </View>
      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <CardScrollView data={data} isHorizontal= {false} onCardPress={() => {
           navigation.navigate("Client", { screen: "List Customer Details"});
        }}/>
        </View>
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
  filterText: {
    color: '#ffffff',
  }
  
});

export default SOApprovals;