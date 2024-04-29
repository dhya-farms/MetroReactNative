import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SdCard = ({ sitename, detailInfo, pricePerSqFt, bgimage, onPress }) => {
  // Formatting changes here based on the properties
  const formattedSiteName = `${sitename}\n${detailInfo}`;
  const formattedPrice = `Starts @ \n₹${pricePerSqFt}/sqft`;

  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <Image source={bgimage} style={styles.cardImage} />
      <View style={styles.bottomTextContainer}>
        <Text style={styles.siteName}>{formattedSiteName}</Text>
        <Text style={styles.siteprice}>{formattedPrice}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SiteDetailsCard = ({siteData=[], onCardPress})=>{

    return (
        <FlatList
          data={siteData}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <SdCard
              sitename={item.siteName}
              detailInfo={item.detailInfo} // pass additional info if necessary
              pricePerSqFt={item.pricePerSqFt}
              bgimage={item.bgimage}
              onPress={() => onCardPress(item.id)}
            />
          )}
          keyExtractor={item => item.id.toString()}
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
        width: 252, // Set your desired card width
        height: 179, // Set your desired card height
        position: 'relative',
        marginHorizontal: 15, // Allows absolute positioning within
        borderRadius: 10,
      },
    cardImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10, // Set this to your desired border radius
    },
    bottomTextContainer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 6, // Adjust to your padding
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
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
      siteName:{
        fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: 14,
        color: '#FFFFFF',
        flexWrap: 'wrap',
      },
      siteprice:{
        textAlign: 'right',
        fontFamily: 'Poppins',
        fontWeight: '400',
        fontSize: 13,
        color: '#FFFFFF',
        flexWrap: 'wrap',
      }
 });

export default SiteDetailsCard