import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Modal, StyleSheet } from 'react-native';
import { TextInput, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomTokenDropdown = ({ label, selectedValue, onSelect, options, visible, setVisible, paymentMethod=false, customInputStyle }) => {

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const pickItem = (item) => {
    onSelect(item); // Pass the entire item to the onSelect function
    toggleDropdown();
  };
  return (
      <View style={styles.inputContainer}>
            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} onPress={toggleDropdown}>
            <TextInput
                label={label}
                value={selectedValue}
                mode="outlined"
                outlineColor="#1D9BF0"
                editable={false}
                theme={{ colors: { primary: '#1D9BF0', underlineColor: 'transparent', background: 'white' , onSurface: 'black'} }}
                style={[styles.input, customInputStyle, { fontFamily: 'Poppins', fontSize: 14, fontWeight: '500' }]}
            />
           <Icon name= "chevron-down" size={14} color="#1D9BF0" style={{ position: 'absolute', right: '8%', top: '38%' }}/>
          </TouchableOpacity>


          {visible && (
          <View style={styles.dropdown}>
            <ScrollView nestedScrollEnabled={true}>
              {options.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => pickItem(item)} style={styles.dropdownItem}>
                  <Text style={styles.dropdownText}>{item.name_vernacular}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',  // This should match inputContainer to ensure uniformity
    
  },
  input: {
    flex: 1,
    height: 34, // Set the height
    backgroundColor: 'white', // Set the background color
    marginVertical: 2,
    borderColor: '#1D9BF0',
    borderRadius: 4,
    fontSize: 16,
  },
  dropdown: {
    width: '96%', // Match the width of the input container
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#1D9BF0',
    borderRadius: 5,
    maxHeight: 140, // Set a max height for scrollable content
    zIndex: 2, // Ensure it stacks above other items
    borderRadius: 5,
    marginTop: 10,
  
  }, 
  dropdownItem: {
    padding: 5,
    fontSize: 16,
  },
  dropdownText: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 12,
  },
});

export default CustomTokenDropdown;
