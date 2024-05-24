import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Modal, StyleSheet } from 'react-native';
import { TextInput, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomerPlotDropdown = ({ label, selectedValue, onSelect, options, visible, setVisible, fetchPlotsData, nextUrl, customInputStyle }) => {
    const [showEndOfDataMessage, setShowEndOfDataMessage] = useState(false);

    const onScroll = (e) => {
        console.log('Scrolling...', e.nativeEvent.contentOffset.y);
    };


    const onScrollEnd = (e) => {
        const paddingToBottom = 20;
        const scrollHeight = e.nativeEvent.layoutMeasurement.height;
        const contentHeight = e.nativeEvent.contentSize.height;
        const offset = e.nativeEvent.contentOffset.y;
    
        const isAtBottom = contentHeight - scrollHeight - offset <= paddingToBottom;
    
        console.log(`At bottom: ${isAtBottom}, Next URL: ${nextUrl}`);
    
        if (isAtBottom) {
            if (nextUrl) {
                fetchPlotsData(nextUrl);
            } else if (!showEndOfDataMessage) {
                console.log("No more data to fetch, showing end of data message.");
                setShowEndOfDataMessage(true);
            }
        }
    };
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
            <ScrollView
                nestedScrollEnabled={true}
                style={styles.dropdown}
                onScroll={onScroll}
                onMomentumScrollEnd={onScrollEnd}
                scrollEventThrottle={16} // Controls event firing rate
            >
                {options.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.dropdownItem} onPress={() => pickItem(item)}>
                        <Text style={styles.dropdownText}>{item.plot_number}</Text>
                    </TouchableOpacity>
                ))}
                {showEndOfDataMessage && (
                    <Text style={styles.noMorePlotsText}>No Other Plots Available</Text>
                )}
            </ScrollView>
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
    width: '100%', // Match the width of the input container
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#1D9BF0',
    borderRadius: 5,
    maxHeight: 200,
    overflow: 'hidden', // Set a max height for scrollable content
    zIndex: 2, // Ensure it stacks above other items
    borderRadius: 5,
  
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
  noMorePlotsText: {
    textAlign: 'center',
    color: '#888',
    padding: 10,
    fontSize: 14,
  }
});

export default CustomerPlotDropdown;