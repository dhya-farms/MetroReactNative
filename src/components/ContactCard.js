import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomerCard = ({ name, number, mailId, progress, personimage }) => {
  return (
    <View style={styles.cardContainer}>
     <View style={styles.textWithImageContainer}>
        <View style={styles.textContainer}>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.mmText}>{number}</Text>
            <Text style={styles.mmText}>{mailId}</Text>
          <View style={styles.smIconsContainer}>
           <View style={styles.iconContainer}><Image source={require("../../assets/images/wpicon.png")} style={styles.iconImage}/></View> 
           <View style={styles.iconContainer}><Image source={require("../../assets/images/clicon.png")} style={styles.iconImage}/></View>
           <View style={styles.iconContainer}><Image source={require("../../assets/images/mpicon.png")} style={styles.iconImage}/></View>
          </View>
        </View>
        <View style={styles.imageContainer}>
        <Image source={personimage} style={styles.personImage} />
        </View>
     </View>
     <View style={styles.separator} />
      <View style={styles.progressContainer}>
        <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.progressText}>Progress:</Text>
        <Text style={[styles.progressText, {color: '#5C5C5C', fontWeight: '500', fontSize: 18}]}>{progress}</Text>
        </View>
        <Icon name="check-circle" size={34} color="#80FF00"/>
      </View>
      <View style={styles.separator} />
    </View>
    
  );
};

const ContactCard = ({ customerData, onCardPress }) => {
    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => onCardPress()}>
      <CustomerCard
        name={item.name}
        number={item.number}
        mailId={item.mailId}
        progress={item.progress}
        personimage={item.personimage}
      />
      </TouchableOpacity>
    );
  
    return (
      <FlatList
        data={customerData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      
    );
};

const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: 'white',
      borderRadius: 10,
      marginVertical: 8,
      marginHorizontal: 16,
      shadowColor: '#000', // Shadow color
      shadowOffset: {
          width: 0,
          height: 2, // Shadow direction (downwards)
      },
      shadowOpacity: 0.25, // Shadow opacity
      shadowRadius: 3.84, // Shadow blur radius
      elevation: 5, 
      marginVertical: 10,
      padding: 10,
      width: 320,
    },
    textWithImageContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 5,
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
    smIconsContainer:{
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
  },
    image: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginLeft: 10,
    },
    name: {
      fontWeight: 'bold',
      fontSize: 18,
    },
    detail: {
      fontSize: 14,
      color: '#666',
    },
    progressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },
    progressText: {
      fontSize: 14,
      color: '#666',
      flexShrink: 1,
    },
    separator: {
      height: 2,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      alignSelf: 'center',
      width: '100%',
      marginVertical: 10,
    },
    iconContainer:{
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    iconImage:{
      width: '100%',
      height: '100%',
      resizeMode: 'cover'
    },
    progressText:{
      fontFamily: 'Poppins',
      fontWeight: '400',
      fontSize: 12,
      marginRight: 5,
    }
    // Add other styles for status indicators and checkmark
  });

export default ContactCard