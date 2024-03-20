import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProjectDropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelect = (option) => {
    setSelectedOption(option); // Set the selected option
    setIsOpen(false); // Close the dropdown
    onSelect(option); // Pass the selected option up to the parent component
  };

  return (
    <View style={styles.dropdown}>
      <TouchableOpacity style={styles.header} onPress={() => setIsOpen(!isOpen)}>
        <Text style={styles.title}>{selectedOption || 'Choose Property'}</Text>
        <View style={styles.dropdownContainer}>
        <Icon name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} style={styles.dropIcon}/>
        </View>
      </TouchableOpacity>
      {isOpen && (
        <ScrollView style={styles.optionsContainer} contentContainerStyle={{justifyContent: 'center'}}>
          {options.map((option, index) => (
            <TouchableOpacity key={index} style={styles.option} onPress={() => handleSelect(option)}>
              <Icon name={selectedOption === option ? 'check-box' : 'check-box-outline-blank'} size={24} style={styles.tickIcon}/>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    borderRadius: 4,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#1D9BF0',
    borderWidth: 1,
    backgroundColor: '#FFF',
    paddingLeft: 10,
    borderRadius: 5
  },
  title: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 12,
    textAlign: 'center'
  },
  icon: {
    fontSize: 16,
  },
  optionsContainer: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    // Set a maximum height for the dropdown options to scroll
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    backgroundColor: '#FFF',
    padding: 5
    
   
  },
  tickIcon:{
    color: '#1D9BF0',
    marginRight: 5,
  },
  dropdownContainer:{
    width: 30,
    height: 30,
    backgroundColor: '#1D9BF0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
  dropIcon:{
    width: 10,
    color: 'white'
  },
  optionText:{
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 12,
    textAlign: 'center'
  }
});

export default ProjectDropdown