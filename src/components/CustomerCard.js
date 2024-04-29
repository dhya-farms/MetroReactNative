import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Card = ({ name, number, mail, personimage, propertyName }) => {

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
      <Text style={styles.prText}>{propertyName}</Text>
     </View>
     <View style={styles.separator} />
     <Text style={styles.progressTitle}>Progress State:</Text>
     <View style={styles.progressContainer}>
        <View style={styles.iconContainer}>
          <Icon name="check-circle" size={30} color="#80FF00" style={{marginBottom: 6}}/>
          <Text style={styles.progressLabel}>Site Visit</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon name="times-circle" size={30} color="#C4C4C4" style={{marginBottom: 6}} />
          <Text style={styles.progressLabel}>Token Adv</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon name="times-circle" size={30} color="#C4C4C4" style={{marginBottom: 6}} />
          <Text style={styles.progressLabel}>Documents</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon name="times-circle" size={30} color="#C4C4C4" style={{marginBottom: 6}} />
          <Text style={styles.progressLabel}>Payment</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon name="times-circle" size={30} color="#C4C4C4" style={{marginBottom: 6}} />
          <Text style={styles.progressLabel}>Delivery</Text>
        </View>
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
    // ... your previous styles
    flatList: {
      flexGrow: 0, // Ensure the FlatList doesn't expand beyond its content size
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
            height: 1, // Shadow direction (downwards)
        },
        shadowOpacity: 0.25, // Shadow opacity
        shadowRadius: 3.84, // Shadow blur radius
        elevation: 1,
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
      width: '90%',
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
    }
 });

export default CustomerCard