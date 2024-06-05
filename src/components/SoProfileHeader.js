import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
      <Text style={[styles.contextText, styles.labelText]}>{label}</Text>
      <Text style={[styles.contextText, styles.valueText]}>{value}</Text>
    </View>
  );


const SoProfileHeader = ({ soDetails }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Pad the month and day with leading zeros if they are single-digit.
        const paddedDay = ('0' + date.getDate()).slice(-2);
        const paddedMonth = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed in JavaScript
        return `${paddedDay}-${paddedMonth}-${date.getFullYear()}`;
      };
      
  return (
    <View style={styles.headerContainer}>
      <View style={{marginTop: 60, width: '90%'}}>
      <InfoRow label="Joined Date:" value={formatDate(soDetails.date_joined) || ""} />
        <InfoRow label="Email Id:" value={soDetails.email || ""} />
        <InfoRow label="Mobile No:" value={soDetails.mobile_no || ""} />
        <InfoRow label="Address:" value={soDetails.address || ''} />  
        <InfoRow label="Metro Points:" value={soDetails.points}/>  
        <InfoRow label="Customers:" value={soDetails.clients} /> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameText: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 20,
    color: '#424242',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 35,
    paddingHorizontal: 20,
  },
  labelText: {
    width: 110, // Set a fixed width for labels
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500',
    color: '#424242',
    marginRight: 10,
  },
  valueText: {
    flex: 1, // This will take up the rest of the space in the container
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    color: '#424242',
    textAlign: 'left', // Align the text to the left
  },
});

export default SoProfileHeader;