import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions, StatusBar} 
from 'react-native';
import SortHeader from '../../components/SortHeader';
import Carousel from '../../components/Carousel';
import HeaderContainer from '../../components/HeaderContainer';
import CustomerCard from '../../components/CustomerCard';
import SOcards from '../../components/SOcard';
import ReportCard from '../../components/ReportCards';
import ShowAllButton from '../../components/ShowAllButton';
import { LineChart } from 'react-native-chart-kit';
import TabSelector from '../../components/TabSelector';
import { BarChart } from 'react-native-chart-kit';
import CustomDateSelector from '../../components/CustomDateSelector';
import ViewReportButton from '../../components/ViewReportButton';


const Chart = () => {
  const data = {
    labels: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    datasets: [
      {
        data: [5, 20, 25, 22, 20, 13, 5],
        colors: [
          (opacity = 1) => '#A4B6C6',
          (opacity = 1) => '#A4B6C6',
          (opacity = 1) => '#A4B6C6',
          (opacity = 1) => '#A4B6C6',
          (opacity = 1) => '#A4B6C6',
          (opacity = 1) => '#A4B6C6',
          (opacity = 1) => '#A4B6C6',
        ]
      }
    ]
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(29, 155, 240, ${opacity})`, // Background line color
    barPercentage: 0.7,
    barRadius: 5, 
    decimalPlaces: 0,
    chartStyle: {
      borderRadius: 6
    },
    propsForLabels: {
      fontSize: 10,
      fontFamily: 'Poppins',
      fontWeight: '500',
      fill: '#C4C4C4' // Axis label color
    },
    propsForVerticalLabels: {
      fill: '#C4C4C4' // Y axis label color
    },
    propsForHorizontalLabels: {
      fill: '#C4C4C4' // X axis label color
    },
    showValuesOnTopOfBars: false // Remove values on top of bars
  };

  return (
    <View>
      <BarChart
        data={data}
        width={320}
        height={220}
        yAxisLabel=""
        withCustomBarColorFromData={true}
        flatColor={true}
        chartConfig={chartConfig}
        verticalLabelRotation={0}
        showBarTops={false} 
        fromZero={true}
      />
    </View>
  );
};

const inputData = [
  {
    name: 'Revenue',
    value: '₹80,000'
  },
  {
    name: 'Bookings',
    value: '5'
  },
  {
    name: 'Allotments',
    value: '10'
  },
  {
    name: 'Registration',
    value: '5'
  },

]

const ProjectReportBookings = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('Today');

  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar/>
      <HeaderContainer title="Project Report" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}/>
      <View style={{width: '90%' , marginVertical: 10,}}>
        <TabSelector selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
      </View>
      {selectedTab === 'Today' && (
      <View style={styles.todayContainer}>
         <SortHeader title="Graph Report"  isSortVisible={false} />
      <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <Chart />
      </View>
      <View style={styles.inputContainer}>
      {inputData.map((item, index) => {
        return (
          <View key={index} style={styles.inputBox}>
            <Text style={styles.inputText}>{item.name}</Text>
            <Text style={styles.inputText}>{item.value}</Text>
          </View>
        );
      })}
      </View>
      <TouchableOpacity style={styles.dorContainer}>
        <Text style={styles.dorText}>Download Report</Text>
     </TouchableOpacity>
    </View>
      )}
      {selectedTab === 'Week' && (
      <View style={styles.weekContainer}>
      <SortHeader title="Graph Report"  isSortVisible={false} />
      <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <Chart />
      </View>
      <View style={styles.inputContainer}>
      {inputData.map((item, index) => {
        return (
          <View key={index} style={styles.inputBox}>
            <Text style={styles.inputText}>{item.name}</Text>
            <Text style={styles.inputText}>{item.value}</Text>
          </View>
        );
      })}
      </View>
      <TouchableOpacity style={styles.dorContainer}>
        <Text style={styles.dorText}>Download Report</Text>
     </TouchableOpacity>
     </View>
      )}
     {selectedTab === 'Month' && (
     <View style={styles.monthContainer}>
         <SortHeader title="Graph Report"  isSortVisible={false} />
      <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <Chart />
      </View>
      <View style={styles.inputContainer}>
      {inputData.map((item, index) => {
        return (
          <View key={index} style={styles.inputBox}>
            <Text style={styles.inputText}>{item.name}</Text>
            <Text style={styles.inputText}>{item.value}</Text>
          </View>
        );
      })}
      </View>
      <TouchableOpacity style={styles.dorContainer}>
        <Text style={styles.dorText}>Download Report</Text>
     </TouchableOpacity>
      </View>
      )}
      {selectedTab === 'Custom' && (
      <View style={styles.customContainer}>
        <CustomDateSelector/>
        <ViewReportButton/>
      </View>
       )}
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
  inputContainer:{
    width: '90%'
  },
  inputBox:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1D9BF0',
    padding: 10,
    borderRadius:4,
    marginVertical: 20,
  },
  inputText:{
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 12,
    color: 'black'
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
  weekContainer:{
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  todayContainer:{
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  monthContainer:{
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  customContainer:{
    width: '90%',
    alignItems: 'center'
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
  }
});

export default ProjectReportBookings;