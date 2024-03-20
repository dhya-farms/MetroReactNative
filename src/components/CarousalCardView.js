import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const requestTypes = {
  SV: 'Site visit',
  AP: 'Amount payment',
  DOC: 'Document verification',
  PAY: 'Payment',
  DD: 'Due diligence',
};

const Card = ({ name, customer, property, requestDate, navigation }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requestType, setRequestType] = useState('Select a request');

  const handleCardPress = () => {
    navigation.navigate("Client", { 
      screen: "List Customer Details" 
    })
  };


  const handleRequestPress = (type) => {
    setSelectedRequest(type);
    setRequestType(requestTypes[type]);
  };

  const RequestButton = ({ type }) => (
    <TouchableOpacity
      style={[
        styles.requestButton,
        selectedRequest === type && styles.selectedRequestButton
      ]}
      onPress={() => handleRequestPress(type)}
    >
      <Text style={styles.requestButtonText}>{type}</Text>
    </TouchableOpacity>
  );

  return (
    <TouchableOpacity style={styles.card} onPress={handleCardPress}>
    <View>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Customer: </Text>
        <Text style={styles.value}>{customer}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Property: </Text>
        <Text style={styles.value}>{property}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Requested On: </Text>
        <Text style={styles.value}>{requestDate}</Text>
      </View>
      <View style={styles.requestButtonsContainer}>
        {Object.keys(requestTypes).map((type) => (
          <RequestButton key={type} type={type} />
        ))}
      </View>
      <View style={styles.separator} />
      <View style={styles.requestTypeContainer}>
        <Text style={styles.label}>Requested For: </Text>
        <View style={{ flex: 1 }}>
        <Text style={styles.value}>{requestType}</Text>
        </View>
        <Icon name="check" size={21} color="orange" />
      </View>
    </View>
    </TouchableOpacity>
  );
};

const CardScrollView = ({ data, isHorizontal= true, navigation }) => (
  <ScrollView horizontal={isHorizontal} showsHorizontalScrollIndicator={false} 
  style={styles.scrollView} contentContainerStyle={!isHorizontal ? styles.contentStyle : {}}>
    {data.map((item, index) => (
      <Card
        key={index}
        name={item.name}
        customer={item.customer}
        property={item.property}
        requestDate={item.requestDate}
        requestType={item.requestType}
        navigation={navigation}
      />
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
  },
  card: {
  backgroundColor: 'white',
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#C4C4C4',
  padding: 20,
  marginHorizontal: 20,
  width: 320,
  shadowColor: '#000', // Shadow color
  shadowOffset: {
    width: 0,
    height: 2, // Shadow direction (downwards)
  },
  shadowOpacity: 0.25, // Shadow opacity
  shadowRadius: 3.84, // Shadow blur radius
  elevation: 5, 
  marginVertical: 10,// This adds a shadow on Android
  },
  detailRow: {
    flexDirection: 'row', // Align label and value in the same row
    marginBottom: 4, 
    alignItems: 'center',// Add some margin between rows
  },
  name: {
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#1D9BF0',
    marginBottom: 10,
    // other text styling
  },
  requestTypeContainer: {
    flexDirection: 'row', // Align children horizontally
    justifyContent: 'space-between', // Align children with space between them
    alignItems: 'center',
    margin: 5,
    
  },
  label:{
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 10,
    marginRight: 4
  },
  value:{
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 12,
  },
  separator: {
    height: 2,
    backgroundColor: '#C4C4C4',
    alignSelf: 'center',
    width: '100%',
    marginVertical: 16,
  },
  requestButtonsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  requestButton: {
    width: 25,
    height: 25,
    borderRadius: 20,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
  },
  selectedRequestButton: {
    backgroundColor: '#1D9BF0',
  },
  requestButtonText: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 10,
    color: '#000'
  },
  contentStyle:{
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default CardScrollView;