import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, Text, StyleSheet, Image } from 'react-native';
import { TextInput, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CustomDropdownInput = ({ label, selectedValues=[], setSelectedValues, options }) => {
  const [visible, setVisible] = useState(false);

  const CustomDropdownIcon = () => (
    <Image
      source={require('../../assets/images/cross.png')} // Ensure the path is correct
      style={{ width: 24, height: 24 }}
    />
  );
  

  const toggleDropdown = () => setVisible(!visible);

  const pickItem = (item) => {
    setVisible(false); // Close the dropdown when an item is picked
    // Check if the item is already selected
    if (selectedValues.includes(item)) {
      // If already selected, remove it from the array
      setSelectedValues(selectedValues.filter(value => value !== item));
    } else {
      // If not selected, add it to the array
      setSelectedValues([...selectedValues, item]);
    }
  };

  return (
    <Provider>
      <View style={styles.inputContainer}>
      <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} onPress={toggleDropdown}>
      <TextInput
        label={label}
        value={selectedValues.join(', ')}
        mode="outlined"
        outlineColor="#1D9BF0"
        editable={false}
        theme={{ colors: { primary: '#1D9BF0', underlineColor: 'transparent', background: 'white' , onSurface: 'black'} }}
        right={<CustomDropdownIcon />}
        style={styles.input}
      />
      <Icon name= "chevron-down" size={14} color="#1D9BF0" style={{ position: 'absolute', right: 10 }}/>

    </TouchableOpacity>


        {visible && (
           <View style={styles.dropdown}>
          <ScrollView nestedScrollEnabled={true}>
          {options.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => pickItem(item)} style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        </View>
        )}
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    width: '50%',
    backgroundColor: 'white',
    top: 60, // Adjust the position based on your TextInput height
    left: 0,
    borderWidth: 1,
    borderColor: '#1D9BF0',
    zIndex:2500,
    maxHeight: 140, 
    borderRadius: 5,
    marginVertical: 10
  
  }, 
  dropdownItem: {
    padding: 4,
  },
  input: {
    width: '100%',
    height: 50, // Set the height
    backgroundColor: 'white', // Set the background color
    marginBottom: 10, 
  },
  dropdownText:{
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 12,
  }
});

export default CustomDropdownInput;