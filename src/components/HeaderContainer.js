import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HeaderContainer = ({ title, ImageLeft, ImageRight, onPress, hideBackArrow = false }) => {
  return (
    <View style={styles.headerContainer}>
      {!hideBackArrow && (
        <TouchableOpacity style={styles.backArrowButton} onPress={onPress}>
          <Image
            source={ImageLeft}
            style={styles.bellIcon}
          />
        </TouchableOpacity>
      )}
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Image
            source={ImageRight}
            style={styles.bellIcon}
          />
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
    headerContainer: {
        zIndex:9999,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,// Adjust padding as needed
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      headerTitle: {
        fontFamily: 'Poppins',
        fontSize: 18,
        fontWeight: '600',
      },
      filterButton: {
        // Define if you need specific styles for your button
      },
      bellIcon: {
        width: 34, // Adjust size as needed
        height: 34, // Adjust size as needed
      },
});

export default HeaderContainer;