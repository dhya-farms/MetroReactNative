import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const requestTypes = {
  SV: 'Site Visit',
  AP: 'Token Advance',
  DOC: 'Documentation',
  PAY: 'Payment',
  DD: 'Document Delivery',
};

const Card = ({ name, customer, property, requestDate, initialRequestType, onPress }) => {
  const [selectedRequestIndex, setSelectedRequestIndex] = useState(null);

  // Set the initial selected state based on the initialRequestType prop
  useEffect(() => {
    if (initialRequestType) {
      const typeKey = Object.keys(requestTypes).find(key => requestTypes[key] === initialRequestType);
      if (typeKey) {
        setSelectedRequestIndex(Object.keys(requestTypes).indexOf(typeKey));
      }
    }
  }, [initialRequestType]);

  const RequestButton = ({ type, index }) => {
    const isSelected = index <= selectedRequestIndex; // Check if this button is selected

    return (
      <View
        style={[
          styles.requestButton,
          isSelected && styles.selectedRequestButton
        ]}
      >
        <Text style={[styles.buttonText, isSelected && styles.selectedButtonText]}>{type}</Text>
      </View>
    );
  };

  // Determine if the currently displayed request type is selected
  const progressText = requestTypes[Object.keys(requestTypes)[selectedRequestIndex]] || '';


  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View>
        <Text style={styles.name}>{name}(SO)</Text>
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
          {Object.keys(requestTypes).map((type, index) => (
            <RequestButton key={type} type={type} index={index} />
          ))}
        </View>
        <View style={styles.separator} />
        <View style={styles.requestTypeContainer}>
          <Text style={styles.requestedLabel}>Requested For: </Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.requestedValue}>{progressText}</Text>
          </View>
        </View>

      </View>
    </TouchableOpacity>
  );
};

const CardScrollView = ({ data, isHorizontal= true, onCardPress }) => (
  <ScrollView horizontal={isHorizontal} showsHorizontalScrollIndicator={false} 
  style={styles.scrollView} contentContainerStyle={!isHorizontal ? styles.contentStyle : {}}>
    {data.map((item, index) => (
      <Card
        key={index}
        name={item.name}
        customer={item.customer}
        property={item.property}
        requestDate={item.requestDate}
        initialRequestType={item.requestType}
        onPress={() => onCardPress(item.id)}
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
  requestedLabel:{
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
    marginRight: 4
  },
  requestedValue:{
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
    color: '#5C5C5C'
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
    backgroundColor: '#D9D9D9',
  },
  selectedRequestButton: {
    backgroundColor: '#1D9BF0',
  },
  buttonText:{
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 10,
    color: '#000'
  },
  selectedButtonText:{
    color: '#fff'
  },
  requestButtonText: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 10,
    color: '#fff'
  },
  contentStyle:{
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default CardScrollView;