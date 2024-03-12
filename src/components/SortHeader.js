import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SortHeader = ({ title, onSortPress, isSortVisible = true }) => {
  return (
    <View style={[styles.container, !isSortVisible && styles.fullWidth]}>
      <Text style={styles.title}>{title}</Text>
      {isSortVisible && (
        <TouchableOpacity style={styles.sortButton} onPress={onSortPress}>
          <Text style={styles.sortButtonText}>Sort by</Text>
          <MaterialIcons name="sort" size={17} color="#1D9BF0" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  fullWidth: {
    width: '80%',
  },
  title: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 16,
    color: '#000',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  sortButtonText: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 14,
    color: '#1D9BF0',
    marginRight: 4,
  },
});

export default SortHeader;