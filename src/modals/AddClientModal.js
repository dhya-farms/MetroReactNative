import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { PRIMARY_COLOR } from '../constants/constantstyles/colors';
import { fetchSoCustomersList } from '../apifunctions/fetchSoCustomerList';



const AddClientModal = ({ label, modalVisible, setModalVisible, selectedValue, setSelectedValue, initialOptions, onDone, showSuccessMessage, navigation, propertyId, nextCustomerPageUrl=null, setCustomers}) => {
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [options, setOptions] = useState(initialOptions); // Use state to manage options
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState(nextCustomerPageUrl);


  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const isClose = layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
    console.log("Is close to bottom:", isClose);
    return isClose;
  };



  
  const fetchMoreCustomers = async () => {
    if (!nextPageUrl || loadingMore) {
      console.log('Fetch halted or no more pages', { nextPageUrl, loadingMore });
      return;
    }
    setLoadingMore(true);
    try {
      const response = await fetchSoCustomersList(null, null, nextPageUrl);
      if (response.customers.length > 0) {
        const newCustomers = response.customers;
        const newOptions = new Set([...options, ...newCustomers.map(customer => customer.name)]);
        setOptions(Array.from(newOptions));
        setCustomers(prev => [...new Set([...prev, ...newCustomers])]); // Assuming unique objects
        setNextPageUrl(response.nextPage || null);
      } else {
        setNextPageUrl(null); // No more data to fetch
      }
    } catch (error) {
      console.error('Failed to fetch more customers:', error);
    } finally {
      setLoadingMore(false);
    }
  };
  
  


  const CustomDropdownIcon = () => (
    <Image
      source={require('../../assets/images/cross.png')} // Ensure the path is correct
      style={{ width: 24, height: 24 }}
    />
  );

  const toggleDropdown = () => setVisible(!visible);

  const pickItem = (itemName) => {
    setVisible(false);
    if (itemName === "Add New Customer") {
      handleAddNewClient();
    } else {
      setSelectedValue(itemName);
    }
  };

  const handleAddNewClient = () => {
    setModalVisible(false); // Close the modal
    navigation.navigate('Add', {
      propertyId: propertyId,  // Assuming prId holds the effective property ID
      fromPropertyDetails: true  // This is to keep track of navigation origin
    }); // Navigate to Add Customer screen
  };

  const handleClose = () => {
    setModalVisible(false); // Function to close the modal
  };




  return (
    <Provider>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Icon name="times" size={20} color={PRIMARY_COLOR} />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Add Client</Text>
        <Text style={[styles.modalTitle, {marginVertical: 10, fontSize: 14, fontWeight: '400'}]}>Adding customer to the property</Text>
        <View style={styles.inputContainer}>
            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} onPress={toggleDropdown}>
            <TextInput
                label={label}
                value={selectedValue}
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
            <ScrollView nestedScrollEnabled={true} style={styles.dropdown} onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
                fetchMoreCustomers();
            }
            }}
            scrollEventThrottle={400}>
            {options.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => pickItem(item)} style={styles.dropdownItem}>
                <Text style={styles.dropdownText}>{item}</Text>
                </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
           {errorMessage !== '' && (
            <Text style={styles.errorText}>{errorMessage}</Text> // Display the error message
          )}
            {showSuccessMessage && (
                    <Text style={styles.successMessage}>Property assigned to the customer successfully!</Text>
                )}
          <TouchableOpacity style={styles.doneButton} onPress={onDone}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent background
    width: '100%',
    height: '100%',
  },
  modalView: {
    width: '90%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "flex-start", // Ensure content starts from the top
    alignItems: "center",
    position: 'relative' 
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  modalTitle: {
    fontFamily: 'Poppins',
    marginBottom: 15,
    textAlign: "center",
    fontWeight: '600',
    fontSize: 18,
  },
  input: {
    width: '100%',
    height: 50, // Set the height
    backgroundColor: 'white', // Set the background color
    marginBottom: 20,
    marginTop: 20, // Add a bottom margin
  },

  doneButton: {
    backgroundColor: "#1D9BF0",
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 28,
    elevation: 2,
    marginTop: 10,
  },
  doneButtonText: {
    color: "white",
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
  },
  locationText:{
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
  },
  errorText: {
    color: 'red', // Example style for error message
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
  },
  inputContainer: {
    width: '100%',
  },
  dropdown: {
    width: '100%', // Match the width of the input container
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#1D9BF0',
    borderRadius: 5,
    marginVertical: 10, // Add space above and below the dropdown
    maxHeight: 90, // Set a max height for scrollable content
    zIndex: 2, // Ensure it stacks above other items
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
  },
  successMessage: {
    color: 'green',
    fontSize: 12,
    marginBottom: 10, // Adjust spacing as needed
  },
  dnContainer:{
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
  // ... Add other styles you might need
});

export default AddClientModal