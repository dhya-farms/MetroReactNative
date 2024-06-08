import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, Text, StyleSheet, Image } from 'react-native';
import { TextInput, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CustomDropdownInput = ({ label, selectedValues, setSelectedValues, options }) => {

  const [visible, setVisible] = useState(false);

  const toggleDropdown = () => setVisible(!visible);

  const pickItem = (item) => {
    setVisible(false);
    if (selectedValues.some(value => value.key === item.key)) {
      setSelectedValues(selectedValues.filter(value => value.key !== item.key));
    } else {
      setSelectedValues(prevValues => [...prevValues, item]);
    }
  };

  return (
      <View style={styles.inputContainer}>
        <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} onPress={toggleDropdown}>
          <TextInput
            label={label}
            value={selectedValues.map(sv => sv.name).join(', ')} // Display names of selected items
            mode="outlined"
            outlineColor="#1D9BF0"
            editable={false}
            theme={{ colors: { primary: '#1D9BF0', underlineColor: 'transparent', background: 'white', onSurface: 'black'} }}
            style={styles.input}
          />
          <Icon name={visible ? "chevron-up" : "chevron-down"} size={14} color="#1D9BF0" style={{ position: 'absolute', right: 10 }}/>
        </TouchableOpacity>

        {visible && (
            <ScrollView nestedScrollEnabled={true} style={styles.dropdown}>
            {options.map((item) => (
                <TouchableOpacity key={item.key.toString()} onPress={() => pickItem(item)} style={styles.dropdownItem}>
                  <Text style={styles.dropdownText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
  },
  dropdown: {
    width: '50%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#1D9BF0',
    maxHeight: 140, 
    overflow: 'hidden', // Set a max height for scrollable content
    borderRadius: 5,
    marginVertical: 4,
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