import React, { useState } from 'react';
import { View, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';

export const CustomTimePickerInput = ({ label, time, setTime }) => {
    const [showTimePicker, setShowTimePicker] = useState(false);

    // Corrected the parameter name to selectedTime for clarity
    const onChange = (event, selectedTime) => {
        if (selectedTime) {
            // Since we're dealing with time only, we don't need to adjust for time zones
            setTime(selectedTime);
        }
        setShowTimePicker(false);
    };

    const renderTimePicker = () => {
        if (Platform.OS !== 'web') {
            // This is for the mobile platform and uses the DateTimePicker module
            return (
                <DateTimePicker
                    value={time}
                    mode="time"
                    display="default"
                    onChange={onChange}
                    style={{ zIndex: 1000 }}
                />
            );
        } else {
            // This is for the web platform and uses a standard HTML input
            return (
                <input
                    type="time"
                    // We directly use the local time for the value here
                    value={`${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`}
                    onChange={(e) => {
                        // Parse the time in the local timezone
                        const [hours, minutes] = e.target.value.split(':').map(Number);
                        const newTime = new Date();
                        newTime.setHours(hours, minutes);
                        setTime(newTime); // Update the time state
                    }}       
                    style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%' }}
                />
            );
        }
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput
                label={label}
                // We directly use the local time for displaying the value here
                value={`${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`} 
                editable={false}
                mode="outlined"
                outlineColor="#1D9BF0"
                style={styles.input}
                theme={{ colors: { primary: '#1D9BF0', underlineColor: 'transparent', onSurface: 'black' } }}
            />
            <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.iconContainer}>
                <Icon name="clock" size={20} color="#1D9BF0" />
            </TouchableOpacity>
            {showTimePicker && renderTimePicker()}
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
        height: 50,
        backgroundColor: 'white',
        marginBottom: 20,
    },
    iconContainer: {
        position: 'absolute', 
        right: 10
    },
});

