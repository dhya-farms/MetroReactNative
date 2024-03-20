import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateInput = ({ label, value, onChange, enabled }) => {
  const [show, setShow] = useState(false);

  const handleWebChange = (event) => {
    onChange(new Date(event.target.value));
  };

  const handleNativeChange = (event, selectedDate) => {
    setShow(Platform.OS === 'ios');
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const maybeRenderNativePicker = () => {
    if (show && Platform.OS !== 'web') {
      return (
        <DateTimePicker
          value={new Date(value)}
          mode="date"
          display="default"
          onChange={handleNativeChange}
          maximumDate={new Date(2300, 10, 20)}
          minimumDate={new Date(1950, 0, 1)}
        />
      );
    }
    return null;
  };

  const renderTouchablePicker = () => {

    if (Platform.OS !== 'web') {
      return (
        <TouchableOpacity onPress={() => enabled && setShow(true)} style={styles.iconContainer}>
          <Text style={styles.calendarIcon}>📅</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.fromText}>{label}</Text>
            <Text style={styles.dateText}>{value}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };




  return (
    <View style={styles.dateInputContainer}>
      {renderTouchablePicker()}
      {Platform.OS === 'web' ? (
        <input
          type="date"
          value={value}
          onChange={handleWebChange}
          style={styles.webDatePicker}
        />
      ) : (
        maybeRenderNativePicker()
      )}
    </View>
  );
};

const CustomDateSelector = () => {

    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
      };

    const [dateRange, setDateRange] = useState('single');
    const [fromDate, setFromDate] = useState(formatDate(new Date()));
    const [toDate, setToDate] = useState(formatDate(new Date()));

    const handleFromDateChange = (newDate) => {
        setFromDate(formatDate(newDate));
      };
    
      const handleToDateChange = (newDate) => {
        setToDate(formatDate(newDate));
      };
  
    const RadioButton = ({ id, label }) => {
      return (
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setDateRange(id)}
        >
          <View style={[
            styles.outerCircle,
            dateRange === id && styles.selectedOuterCircle
          ]}>
            {dateRange === id && <View style={styles.innerCircle} />}
          </View>
          <Text style={styles.radioText}>{label}</Text>
        </TouchableOpacity>
      );
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Date Wise</Text>
        <View style={styles.radioContainer}>
          <RadioButton id="single" label="Single date range" />
          <RadioButton id="multiple" label="Multiple date range" />
        </View>
        <View style={styles.fromToContainer}>
        <DateInput label="From" value={fromDate} onChange={handleFromDateChange} enabled={true} />
        <DateInput label="To" value={toDate} onChange={handleToDateChange} enabled={dateRange === 'multiple'} />
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      width: '100%'
    },
    title: {
      fontFamily: 'Poppins',
      fontWeight: '600',
      fontSize: 16,
      marginBottom: 6,
    },
    radioContainer: {
      flexDirection: 'row',
      marginVertical: 10,
    },
    radioButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 10,
      justifyContent: 'center'
    },
    outerCircle: {
      height: 18,
      width: 18,
      borderRadius: 9,
      borderWidth: 2,
      borderColor: '#B5B5B5',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
    },
    selectedOuterCircle: {
      borderColor: '#B5B5B5',
    },
    innerCircle: {
      height: 10.5,
      width: 10.5,
      borderRadius: 10.5 / 2,
      backgroundColor: '#1D9BF0',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center'
    },
    dateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#1D9BF0',
        padding: 10,
        marginVertical: 10,
        borderRadius: 4,
        width: '50%'
      },
      iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      calendarIcon: {
        marginRight: 10,
      },
      dateText: {
        // Style for the date text
      },
      label: {
        marginLeft: 10,
        // Style for the label text
      },
      radioText:{
        fontFamily: 'Poppins',
        fontSize: 12,
        fontWeight: '500'
      },
      fromText:{
        fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: 8
      },
      dateText:{
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 12
      },
      fromToContainer:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }
});

export default CustomDateSelector;
