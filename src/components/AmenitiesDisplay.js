import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../constants/styles/propertydetailsstyles';

const AmenitiesDisplay = React.forwardRef(({ amenities }, ref) => (
    <View ref={ref} style={styles.amContainer}>
      <Text style={styles.amHeader}>Amenities:</Text>
      <View style={styles.amenitiesContainer}>
        {amenities.map((amenity, index) => (
          <View key={index} style={styles.amenity}>
            <Image source={{ uri: amenity.logo }} style={styles.icon} />
            <Text style={styles.text}>{amenity.name}</Text>
          </View>
        ))}
      </View>
    </View>
));

export default AmenitiesDisplay;