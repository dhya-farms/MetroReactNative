import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';

// ReportCard Component
const ReportCard = ({ name, source, onPress }) => {
  return (
    <TouchableOpacity style={styles.reportCard} onPress={onPress}>
      <Text style={styles.reportName}>{name}</Text>
      <Image source={source} style={styles.reportImage} />
    </TouchableOpacity>
  );
};

const ReportsScrollView = ({ reportData, navigation }) => {
  const handleCardPress = (reportName) => {
    // Determine which screen to navigate to based on the report name
    if (reportName === 'Daily Report') {
      navigation.navigate('Daily Report');
    } else if (reportName === 'Project Report') {
      navigation.navigate('Project Report');
    }
  };
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {reportData.map((report, index) => (
          <ReportCard key={index} name={report.name} source={report.source} onPress={() => handleCardPress(report.name)}/>
        ))}
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    reportCard: {
      backgroundColor: '#FFF',
      borderRadius: 8,
      padding: 16,
      marginLeft: 16,
      marginVertical: 10,
      marginHorizontal: 20,
      width: 263,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    reportImage: {
      width: 162, // Set image width
      height: 135, // Set image height
      margin: 20, // Space between image and text
      resizeMode: 'contain'
    },
    reportName: {
      fontFamily: 'Poppins',
      fontSize: 16,
      fontWeight: '500',
      color: '#000000',
      alignSelf: 'flex-start',
      marginBottom: 10,
    },
    scrollView: {
        width: '100%'
    },
  });
  
  export default ReportsScrollView;