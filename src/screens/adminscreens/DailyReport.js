import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions, StatusBar} 
from 'react-native';
import SortHeader from '../../components/SortHeader';
import HeaderContainer from '../../components/HeaderContainer';
import ReportCard from '../../components/ReportCards';
import ShowAllButton from '../../components/ShowAllButton';
import LineChartGraph from '../../components/LineChart';
import styles from '../../constants/styles/dailyreportstyles';


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
      <StatusBar/>
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



export default DailyReport;