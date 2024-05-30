import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { formatPropertyName } from '../functions/formatPropertyName';







const Card = ({ name, number, mail, personimage, propertyName, currentApprovalStatus, currentCRMStatus }) => {


  const steps = ['SITE_VISIT', 'TOKEN_ADVANCE', 'DOCUMENTATION', 'PAYMENT', 'DOCUMENT_DELIVERY'];

  // Safe access using optional chaining and providing default values if undefined
  const currentStepIndex = steps.indexOf(currentCRMStatus?.name?.toUpperCase() ?? "");
  const approvalStatus = currentApprovalStatus?.name?.toUpperCase() ?? "PENDING"; // Default to "PENDING" if undefined

    // Determines the icon for each step based on the current status
    const stepIcons = steps.map((step, index) => {
        if (index < currentStepIndex) {
            // All previous steps are completed
            return { name: 'check-double', color: '#80FF00' }; // Green check for completed steps
        } else if (index === currentStepIndex) {
            // Current step
            if (approvalStatus === 'COMPLETED') {
                return { name: 'check-double', color: '#80FF00' }; // Completed current step
            } else if (approvalStatus === 'APPROVED') {
                return { name: 'check', color: '#1D9BF0' }; // Approved but not yet completed
            } else if (approvalStatus === 'PENDING') {
                return { name: 'hourglass-half', color: '#FFA500' }; // Pending current step
            } else if (approvalStatus === 'REJECTED') {
                return { name: 'times', color: '#FF0000' }; // Rejected current step
            }
        } else if (index === currentStepIndex + 1 && approvalStatus === 'COMPLETED') {
            // Next step becomes pending only if the current step is completed
            return { name: 'hourglass-half', color: '#FFA500' }; // Pending next step
        }
        // Future steps remain inactive
        return { name: 'times', color: '#C4C4C4' }; // Grey times for future steps
    });


  const handleWhatsAppPress = () => {
    let whatsappUrl = `https://wa.me/${number}`;
    Linking.openURL(whatsappUrl).catch(err => console.error('An error occurred', err));
  };

  const handleCallPress = () => {
    const callLink = `tel:${number}`;
    Linking.openURL(callLink);
  };

  const handleMailPress = () => {
    let emailUrl = `mailto:${mail}`;
    Linking.openURL(emailUrl).catch(err => console.error('An error occurred', err));
  };
  return (
    <View style={styles.cardContainer}>
     <View style={styles.textWithImageContainer}>
        <View style={styles.textContainer}>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.mmText}>{number}</Text>
            <Text style={styles.mmText}>{mail}</Text>
        </View>
        <View style={styles.imageContainer}>
        <Image source={personimage} style={styles.personImage} />
        </View>
     </View>
     <View style={styles.prContainer}>
      <Text style={styles.prHeader}>Property Name: </Text>
      <Text style={styles.prText}>{formatPropertyName(propertyName)}</Text>
     </View>
     <View style={styles.separator} />
     <Text style={styles.progressTitle}>Progress State:</Text>
     <View style={styles.progressContainer}>
                {stepIcons.map((icon, index) => (
                    <View key={index} style={styles.iconContainer}>
                        <View style={[styles.checkicon, { backgroundColor: icon.color }]}>
                            <Icon name={icon.name} size={12} color="white" />
                        </View>
                        <Text style={styles.progressLabel}>{['Site Visit', 'Token Adv', 'Documents', 'Payment', 'Delivery'][index]}</Text>
                    </View>
                ))}
            </View>
      <View style={styles.smIconsContainer}>
      <TouchableOpacity onPress={handleWhatsAppPress}>
          <Image source={require("../../assets/images/wpicon.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCallPress}>
          <Image source={require("../../assets/images/clicon.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleMailPress}>
          <Image source={require("../../assets/images/mpicon.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ItemSeparator = () => (
  <View style={styles.itemSeparator} />
);

const CustomerCard = ({customerData, isHorizontal = true, onCardPress})=>{

    return (
        <FlatList
          data={customerData}
          horizontal={isHorizontal}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onCardPress(item.uniqueId)}>
            <Card
              name={item.name}
              number={item.number}
              mail={item.mailId}
              personimage={item.personimage}
              propertyName={item.property}
              currentApprovalStatus= {item.currentApprovalStatus} 
              currentCRMStatus= {item.currentCRMStatus}

            />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.uniqueId}
          ItemSeparatorComponent={isHorizontal ? null : ItemSeparator}
          style={styles.flatList}
        />
      );
}

const styles = StyleSheet.create({
    flatList: {
      flexGrow: 0,
    },
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#C4C4C4',
        padding: 15,
        marginHorizontal: 20,
        width: 330,
        shadowColor: '#000', // Shadow color
        shadowOffset: {
            width: 0,
            height: 2, // Shadow direction (downwards)
        },
        shadowOpacity: 0.25, // Shadow opacity
        shadowRadius: 3.84, // Shadow blur radius
        elevation: 5, 
        marginVertical: 10,// This adds a shadow on Android // Allows absolute positioning within
    },
    textWithImageContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    nameText:{
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 20,
        marginBottom: 5
    },
    mmText:{
        fontFamily: 'Poppins',
        fontWeight: '400',
        fontSize: 10,
        marginBottom: 2
    },
    separator: {
        height: 2,
        backgroundColor: '#C4C4C4',
        alignSelf: 'center',
        width: '100%',
        marginVertical: 16,
    },
    progressContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        shadowColor: '#000', // Shadow color
        shadowOffset: {
            width: 0,
            height: 3, // Shadow direction (downwards)
        },
        shadowOpacity: 0.25, // Shadow opacity
        shadowRadius: 3.84, // Shadow blur radius
        elevation: 0.2,
        borderWidth: 1,
        borderColor: '#C4C4C4',
        borderRadius: 6,
        padding: 10,
        marginVertical: 10,
    },
    progressTitle:{
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 16,
    },
    progressLabel:{
        fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: 10,
    },
    iconContainer:{
        alignItems: 'center',
        margin: 5, 
  
    },
    smIconsContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 5,
    },
    itemSeparator: {
      height: 2,
      backgroundColor: '#C4C4C4',
      alignSelf: 'center',
      width: '90%',
      marginVertical: 16,
    },
    prContainer:{
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },
    prHeader:{
      fontFamily: 'Poppins',
      fontWeight: '400',
      fontSize: 14,
    },
    prText:{
      fontFamily: 'Poppins',
      fontWeight: '600',
      fontSize: 16,
    },
    imageContainer:{
      width: 60,
      height: 60,
    },
    personImage:{
      width: '100%',
      height: '100%',
      borderRadius: 30,
      resizeMode: 'cover'
    },
    checkicon: {
      width: 32,
      height: 32,
      backgroundColor: '#1D9BF0',
      borderRadius: 16,
      justifyContent: 'center', // Center the icon vertically
      alignItems: 'center', // Center the icon horizontally
    },
    completedStatusCheck:{
      backgroundColor: '#80FF00'
    },
    approvedStatusCheck:{
      backgroundColor: '#1D9BF0',
    },
    pendingStatusCheck:{
      backgroundColor: '#FDF525'
    },
    rejectedStatusCheck:{
      backgroundColor: '#FF0000',
    },
 });

export default CustomerCard