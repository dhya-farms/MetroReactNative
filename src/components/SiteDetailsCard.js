import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { formatPropertyName } from '../functions/formatPropertyName';


const windowWidth = Dimensions.get('window').width;
const cardWidth = windowWidth - 40; // Assuming 15px margin on each side

const SdCard = ({ sitename, detailInfo, pricePerSqFt, phaseName, bgimage, onPress }) => {
  // Formatting changes here based on the properties
  const formattedSiteName = `${sitename}\n${detailInfo}`;
  const formattedPrice = `Starts @ \n₹${pricePerSqFt} ${phaseName}`;

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
              sitename={formatPropertyName(item.name)}
              detailInfo={item.detailInfo} // pass additional info if necessary
              pricePerSqFt={item.sqFtFrom}
              phaseName={item.phaseName}
              bgimage={item.bgimage}
              onPress={() => onCardPress(item.propertyId, item.id)}
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
      flexGrow: 0,
      width: '100%', // Ensure FlatList takes full width
    },
    cardContainer: {
        width: cardWidth,
        minHeight: 179, // Minimum height to accommodate content
        maxHeight: 200,
        position: 'relative',
        marginHorizontal: 15, // Allows absolute positioning within
        borderRadius: 10,
        overflow: 'hidden',
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
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderBottomLeftRadius: 10, // Round bottom left corner
        borderBottomRightRadius: 10,
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