import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure to install react-native-vector-icons

const FaqDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState('Select an option');

  const options = ['Lorem ipsum dolor sit amet consectetur.', 'Option 2'];

  const handleSelectOption = (option) => {
    setSelection(option);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => setIsOpen(!isOpen)}>
        <View style={styles.selectionBox}>
          <Text style={styles.selectionText}>{selection}</Text>
          <Icon name="chevron-down" size={9} color="#1D9BF0" />
        </View>
      </TouchableWithoutFeedback>
      {isOpen && (
        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => handleSelectOption(option)}
            >
              <View style={styles.option}>
                <Text style={styles.optionText}>{option}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginVertical: 5,
  },
  selectionBox: {
    borderWidth: 2,
    borderColor: '#1D9BF0',
    borderRadius: 7,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 5,
    marginVertical: 10,
  },
  selectionText: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 12,
    color: '#000000'
  },
  optionsContainer: {
    borderWidth: 1,
    borderColor: '#1D9BF0',
    margin: 20,
    borderRadius: 5,
  },
  option: {
    padding: 15,
  },
  optionText: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 10,
    color: '#000000'
  },
});

export default FaqDropdown;