import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ImageCard = ({ name, date, title, description, source, personimage }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={source} style={styles.cardImage} />
      <View style={styles.topTextContainer}>
        <Image source={personimage} style={styles.personImage} />
        <View style={styles.ndContainer}>
        <Text style={styles.cardName}>{name}</Text>
        <Text style={styles.cardDate}>{date}</Text>
        </View>
      </View>
      <View style={styles.textContainer}>
        <View style={{flex: 1}}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
        </View>
        <TouchableOpacity style={styles.cardButton}>
          <Icon name="chevron-right" size={14} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const OfficeUpdateView = ({cardData})=>{
    return (
        <FlatList
          data={cardData}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <ImageCard
              name={item.name}
              date={item.date}
              title={item.title}
              description={item.description}
              source={item.source}
              personimage={item.personimage}
            />
          )}
          keyExtractor={item => item.id}
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
        width: 268, // Set your desired card width
        height: 179, // Set your desired card height
        position: 'relative',
        marginHorizontal: 15, // Allows absolute positioning within
      },
    cardImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10, // Set this to your desired border radius
    },
      textContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        padding: 10, // Adjust to your padding
      },
      cardTitle: {
        fontFamily: 'Poppins',
        fontWeight: '700',
        color: '#fff', 
        fontSize: 12, // Adjust font size
      },
      cardDescription: {
        fontFamily: 'Poppins',
        fontWeight: '400',
        color: '#fff',  // Description color
        fontSize: 10, // Adjust font size
      },
      cardButton: {
        width: 24,
        height: 24,
        backgroundColor: '#0086FF',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
      },
      topTextContainer: {
        position: 'absolute',
        top: 10, // Adjust to your padding
        left: 10, // Adjust to your padding
        flexDirection: 'row',
        alignItems: 'center'
      },
      personImage:{
        width: 47,
        height: 47,
        borderRadius: 47/2,
        marginRight: 10,
      },
      cardName: {
        fontFamily: 'Poppins',
        fontWeight: '700',
        color: '#424242', // Name color
        fontSize: 16,
      },
      cardDate: {
        fontFamily: 'Poppins',
        fontWeight: '700',
        color: '#424242', // Date color
        fontSize: 12, // Adjust font size
      },
 });

export default OfficeUpdateView