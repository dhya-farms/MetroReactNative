import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions, StatusBar} 
from 'react-native';
import HeaderContainer from '../../components/HeaderContainer';
import { LineChart } from 'react-native-chart-kit';
import ProjectDropdown from '../../components/ProjectDropdown';
import SortHeader from '../../components/SortHeader';
import ReportCard from '../../components/ReportCards';
import ShowAllButton from '../../components/ShowAllButton';
import BarChart from '../../components/BarChart';
import styles from '../../constants/styles/projectreportstyles';



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

const data = [20, 45, 28, 80, 99, 43, 50, 75, 60, 85, 40, 70];


const ProjectReport = ({navigation}) => {
    const [selectedProperty, setSelectedProperty] = useState(null);

    const handleProjectPress=()=>{
      navigation.navigate("Project Report Bookings")
    }

  const properties = [
    'Metro sivasakthi residency',
    'Metro vadavelli plots',
    'Saravanampatti Residency',
    // Add other options here
  ];

  const handleSelection = (option) => {
    setSelectedProperty(option);
  };


   return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar/>
      <HeaderContainer title="Project Report" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}/>
      <SortHeader title="Project"  isSortVisible={false} />
      <View style={{ width: '90%', margin: 15 }}>
      <ProjectDropdown options={properties} onSelect={handleSelection} />
      </View>
      {selectedProperty && (
      <View style={styles.prContainer}>
      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <ReportCard reportData={reportData} onPress={handleProjectPress}/>
      </View>
      <ShowAllButton text="Revenue" onPress={()=>{}}/>
      <View style={styles.barContainer}>
      <BarChart data={data} barWidth={15} barColor="#FEC623" />
    </View>
    <TouchableOpacity style={styles.dorContainer}>
        <Text style={styles.dorText}>Download Overall Report</Text>
    </TouchableOpacity>
    </View>
      )}
    </ScrollView>
  );
};


export default ProjectReport