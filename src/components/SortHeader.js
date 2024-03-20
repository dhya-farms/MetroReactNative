import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SortHeader = ({ title, isSortVisible = true }) => {

  const [isSortDropdownVisible, setIsSortDropdownVisible] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionPress = (option) => {
    setSelectedOption(option);
  };

  const toggleSortVisibility = () => {
    setIsSortDropdownVisible(!isSortDropdownVisible);
  };

  return (
    <View style={[styles.container, !isSortVisible && styles.fullWidth]}>
      <Text style={styles.title}>{title}</Text>
      {isSortVisible && (
        <TouchableOpacity style={styles.sortButton} onPress={toggleSortVisibility}>
          <Text style={styles.sortButtonText}>Sort by</Text>
          <MaterialIcons name="sort" size={17} color="#1D9BF0" />
        </TouchableOpacity>
      )}
      {isSortDropdownVisible && (
       <View style={styles.dropdown}>
        <View style={styles.sortdropContainer}> 
          <Text style={styles.sortbyText}>Sort By</Text>
          <MaterialIcons name="close" size={15} color="#1D9BF0"  onPress={toggleSortVisibility}/>
        </View>
        <View style={styles.separator} />
       <TouchableOpacity
         style={styles.dropdownOption}
         onPress={() => handleOptionPress('newest')}>
         <View style={[styles.outerCircle, selectedOption === 'newest' && styles.selected]}>
           {selectedOption === 'newest' && <View style={styles.innerCircle} />}
         </View>
         <Text style={styles.optionText}>Newest First</Text>
       </TouchableOpacity>
       <TouchableOpacity
         style={styles.dropdownOption}
         onPress={() => handleOptionPress('oldest')}>
         <View style={[styles.outerCircle, selectedOption === 'oldest' && styles.selected]}>
           {selectedOption === 'oldest' && <View style={styles.innerCircle} />}
         </View>
         <Text style={styles.optionText}>Oldest First</Text>
       </TouchableOpacity>
       {selectedOption && (
         <TouchableOpacity style={styles.okButton}>
           <Text style={styles.okButtonText}>Ok</Text>
         </TouchableOpacity>
       )}
     </View>
   )}
 </View>

  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  fullWidth: {
    width: '95%',
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
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    width: 241,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    zIndex: 2000,
    margin: 20,
    // Adjust the padding and margin as needed
  },
  dropdownOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    // Adjust the padding as needed
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#1D9BF0',
  },
  okButton: {
    width: 93,
    backgroundColor: '#1D9BF0',
    paddingVertical: 7,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  okButtonText: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 12,
    color: '#FFFFFF'
  },
  sortdropContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  sortbyText:{
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: '#C4C4C4',
    alignSelf: 'center',
    width: '90%',
    marginVertical: 10,
  },
  optionText:{
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 12,
  }
});

export default SortHeader;