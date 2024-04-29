import React, { useState } from 'react';
import { View, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5'; 
import DateTimePicker from '@react-native-community/datetimepicker';

export const CustomDatePickerInput = ({ label, date, setDate }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    const renderDatePicker = () => {
        if (Platform.OS !== 'web') {
            return (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChange}
                    style={{ zIndex: 1000 }}
                />
            );
        } else {
            return (
                <input
                    type="date"
                    value={date.toISOString().split('T')[0]}
                    onChange={(e) => setDate(new Date(e.target.value))}
                    style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%' }}
                />
            );
        }
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput
                label={label}
                value={date.toISOString().split('T')[0]}
                editable={false}
                mode="outlined"
                outlineColor="#1D9BF0"
                style={styles.input}
                theme={{ colors: { primary: '#1D9BF0', underlineColor: 'transparent', onSurface: 'black'} }}
            />
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.iconContainer}>
                <Icon name="calendar-alt" size={20} color="#1D9BF0" />
            </TouchableOpacity>
            {showDatePicker && renderDatePicker()}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: 50, // Set the height
        backgroundColor: 'white', // Set the background color
        marginBottom: 20, // Add a bottom margin
    },
    iconContainer: {
        position: 'absolute', 
        right: 10
    },
});
