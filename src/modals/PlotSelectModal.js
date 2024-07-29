import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { PRIMARY_COLOR } from '../constants/constantstyles/colors';
import CustomTokenDropdown from '../components/CustomTokenDropdown';
import axios from 'axios';
import CustomerPlotDropdown from '../components/CustomerPlotDropdown';

const FloatingLabelInput = ({ label, value, onChangeText, editable = false, ...props }) => {
    return (
      <View style={styles.tiContainer}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, { fontFamily: 'Poppins', fontSize: 14, fontWeight: '500' }]}
        mode="outlined"
        outlineColor="#1D9BF0" // Here you set the border color
        theme={{
          colors: { primary: '#1D9BF0', underlineColor: 'transparent', onSurface: 'black' },
          fonts: { regular: { fontFamily: 'Poppins', fontWeight: '400', fontSize: 12 } } // Custom font family and weight
        }}
        editable={editable}
        {...props}
      />
      </View>
    );
  };

  


const PlotSelectModal = ({ modalVisible, setModalVisible, customerDetails, phaseId, onDone}) => {
  const [selectedPlotNumber, setSelectedPlotNumber] = useState('');
  const [selectedPlotId, setSelectedPlotId] = useState(null);
  const [plotsData, setPlotsData] = useState([]); 
  const [plotDropDownVisible, setPlotDropdownVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage]= useState('')
  const [plotInfo, setPlotInfo] = useState({})
  const [nextUrl, setNextUrl] = useState(null); 

  const [plot, setPlot] = useState({
    propertyName: customerDetails?.property?.name || '',
    propertyType: customerDetails?.property?.property_type?.name_vernacular || '',
    phaseNumber: customerDetails?.phase?.phase_number?.toString() || '',
    plotNumber: '',
    sqft: '',
    is_corner_site: false,
  });

  const fetchPlotsData = async (url = `https://dhya.app/metro/api/plots/?phase_id=${phaseId}`) => {
  try {
    const response = await axios.get(url);
    setPlotsData(prevPlots => [...prevPlots, ...response.data.results]);
    setNextUrl(response.data.next); // Store the next URL for pagination
  } catch (error) {
    console.error('Failed to fetch plots data:', error);
   }
}

useEffect(() => {
  setPlotsData([]); 
  fetchPlotsData(); 
}, [phaseId]); 
 

  const handlePlotNumberSelect = (plot) => {
    console.log("plot", plot)
    setPlotInfo(plot)
    setSelectedPlotNumber(plot.plot_number.toString());
    setSelectedPlotId(plot.id); // Store the selected plot's ID
    setPlot(prevPlot => ({
      ...prevPlot,
      plotNumber: plot.plot_number,
      is_corner_site: plot.is_corner_site,
      sqft: `${plot.area_size} ${plot.area_size_unit.name_vernacular}`

    }));
  };

  const handleDonePress = () => {
    if (selectedPlotId) {
      onDone(selectedPlotId, plotInfo);  // Passing the entire plot object
      setModalVisible(false);
    } else {
      setErrorMessage("Please select a plot before proceeding.");
    }
  };
  


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Icon name="times" size={20} color={PRIMARY_COLOR} />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Select a Plot</Text>
        <FloatingLabelInput
                label="Property Name"
                value={plot.propertyName}
            />
            <FloatingLabelInput
                label="Property Type"
                value={plot.propertyType}
            />
            <FloatingLabelInput
                label="Phase Number"
                value={plot.phaseNumber}
            />
            <FloatingLabelInput
                label="Sq.ft"
                value={plot.sqft}
            />
            <View style={{width: '100%'}}>
            <CustomerPlotDropdown
                label="Plot Num"
                selectedValue={selectedPlotNumber}
                onSelect={handlePlotNumberSelect}
                options={plotsData}
                visible={plotDropDownVisible}
                setVisible={setPlotDropdownVisible} 
                fetchPlotsData={fetchPlotsData}
                nextUrl={nextUrl}
                customInputStyle={{
                    width: '100%',
                    height: 50,
                    backgroundColor: 'white',
                    marginBottom: 10,

                }}
              />
            </View>
            <View style={styles.radioButtonContainer}>
                <Text style={styles.radioButtonText}>Is plot in corner: {plot.is_corner_site ? "YES": "NO"}</Text>
            </View>
          {errorMessage !== '' && (
            <Text style={styles.errorText}>{errorMessage}</Text> // Display thei  error message
          )}
          <TouchableOpacity style={styles.doneButton} onPress={handleDonePress}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      },
      modalView: {
        width: '80%',
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
  tiContainer:{
    width: '100%', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  input: {
    width: '100%',
    height: 50, // Set the height
    backgroundColor: 'white', // Set the background color
    marginBottom: 20, // Add a bottom margin
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
  errorText: {
    color: 'red', // Example style for error message
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
  },
  radioButtonContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 10,
    // Add other styling as needed
  },
  radioButtonText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600'
  },
  // ... Add other styles you might need
});

export default PlotSelectModal