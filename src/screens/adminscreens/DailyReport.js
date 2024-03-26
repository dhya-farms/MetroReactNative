import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions} 
from 'react-native';
import SortHeader from '../../components/SortHeader';
import Carousel from '../../components/Carousel';
import HeaderContainer from '../../components/HeaderContainer';
import ReportCard from '../../components/ReportCards';
import ShowAllButton from '../../components/ShowAllButton';
import { LineChart } from 'react-native-chart-kit';
import LineChartGraph from '../../components/LineChart';


const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 56, 75, 60, 70, 80, 85],
        color: (opacity = 1) => `rgba(164, 205, 60, ${opacity})`, // Line color set to black
        strokeWidth: 3 
        // Line stroke width
      }
    ],
    legend: ['Revenue']
  };



const reportData  = [
    {
        id: 1,
        name: 'Bookings',
        number: '10',
    },
    {   id: 2,
        name: 'Allotments',
        number: '20',
    },
    {
        id: 3,
        name: 'Registration',
        number: '17'
    },
    {
        id: 4,
        name: 'Enquires',
        number: '20'
    }

]




const DailyReport = ({navigation}) => {

  const handleReportPress=()=>{
    navigation.navigate("Daily Report Bookings")
  }


  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <HeaderContainer title="Daily Report" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}/>
      <SortHeader title="Overview"  isSortVisible={false} />
      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <ReportCard reportData={reportData} onPress={handleReportPress}/>
      </View>
      <ShowAllButton text="Revenue" onPress={()=>{}}/>
      <View style={styles.rlContainer}>
        <View style={styles.rlCircle}></View>
        <Text style={styles.rlText}>Revenue</Text>
      </View>
      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <LineChartGraph
        data={data}
      />
      </View>
    <TouchableOpacity style={styles.dorContainer}>
        <Text style={styles.dorText}>Download Overall Report</Text>
    </TouchableOpacity>
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
  dorContainer:{
    width: 234,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D9BF0',
    borderRadius: 4,
    marginVertical: 10,
  },
  dorText:{
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF'
  },
  rlContainer:{
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
  rlCircle:{
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#A4CD3C',
    marginRight: 5,
 
    
  },
  rlText:{
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
    textAlign: 'center'
  }
});

export default DailyReport;