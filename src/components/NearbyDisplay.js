import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../constants/styles/propertydetailsstyles';


const NearbyDisplay = ({ nearby }) => (
    <View style={styles.nbContainer}>
    <Text style={styles.nbHeader}>Nearby attractions:</Text>
    <View style={styles.NearbyContainer}>
      {nearby.map((nearby, index) => (
        <View key={index} style={styles.nearby}>
        <Image source={{ uri: nearby.logo }} style={styles.icon} />
        <Text style={styles.text}>{nearby.name}</Text>
      </View>
      ))}
    </View>
  </View>
);

export default NearbyDisplay