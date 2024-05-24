import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SECONDARY_COLOR } from '../constants/constantstyles/colors';


const Card = ({ name, number, mailId, points, clients, source }) => {
  const [showFullDetails, setShowFullDetails] = useState(false);
    return (
      <View style={styles.card}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={styles.name}>{name}</Text>
        <Image source={source} style={styles.profileImage} />
        </View>
        <View style={styles.infoContainer}>
          <Icon name="phone" size={14} color="#1D9BF0" style={styles.icon} />
          <Text style={styles.infoText}>{number}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon name="envelope" size={14} color="#1D9BF0" style={styles.icon}/>
          <Text style={styles.infoText}>{mailId}</Text>
        </View>
        {showFullDetails && (
          <>
            <View style={styles.infoContainer}>
              <Icon name="star" size={14} color="#1D9BF0" style={styles.icon}/>
              <Text style={styles.infoText}>{points}</Text>
            </View>
            <View style={[styles.infoContainer, {justifyContent: 'space-between'}]}>
              <Icon name="users" size={14} color="#1D9BF0" style={styles.icon}/>
              <Text style={styles.infoText}>{clients}</Text>
            </View>
          </>
        )}
        <View style={[styles.infoContainer, {justifyContent: 'space-between'}]}>
          <View style={{flex: 1}}>
          </View>
          <TouchableOpacity onPress={() => setShowFullDetails(!showFullDetails)}>
          <Text style={styles.showMore}>{showFullDetails ? 'Show less <<<' : 'Show more >>>'}</Text>
        </TouchableOpacity>
        </View>
        
      </View>
    );
  };

  const ItemSeparator = () => <View style={styles.itemSeparator} />;

  const SOcards = ({ data, isHorizontal = true , onCardPress}) => {

    const renderItem = (item, index) => (
      <React.Fragment key={item.id}>
        <TouchableOpacity  onPress={() => onCardPress(item.id)}>
        <Card
          name={item.name}
          number={item.number}
          mailId={item.mailId}
          points={item.points}
          clients={item.clients}
          source={item.source}
        />
        </TouchableOpacity>
        {/* Add a separator after each item except the last one */}
        {!isHorizontal && index !== data.length - 1 && <ItemSeparator />}
      </React.Fragment>
    );
  
    return (
      <ScrollView
        horizontal={isHorizontal}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={!isHorizontal ? styles.contentStyle : {}}
      >
        {/* Map over the data and render items */}
        {data.map((item, index) => renderItem(item, index))}
      </ScrollView>
    );
  };
  

  const styles = StyleSheet.create({
    scrollView: {
      width: '100%',
    },
    contentStyle:{
      justifyContent: 'center',
      alignItems: 'center'
    },
    card: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    padding: 20,
    marginLeft: 16,
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
    profileImage: {
        width: 50, 
        height: 50,
        borderRadius: 30, // Half the width/height to make it round
        // ... any other styling for the image
      },
      infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 8, 
        // Adjust spacing as needed
      },
      infoText:{
        fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: 13,
        flex: 1,
      },
      icon:{
        marginRight: 10,
      },
      name:{
        fontFamily: 'Poppins',
        fontSize: 20,
        fontWeight: '600',
        flex: 1,
      },
      showMore:{
        color: '#00C400',
        fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: 10
      },
      itemSeparator: {
      height: 2,
      backgroundColor: SECONDARY_COLOR,
      alignSelf: 'center',
      width: '80%',
      marginVertical: 16,

    },
  });
  
export default SOcards;