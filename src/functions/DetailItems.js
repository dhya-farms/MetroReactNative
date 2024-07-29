import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../constants/styles/commonpropertydetailsstyles';

export const DetailItems = ({ phaseDetails, showAll, setShowAll }) => {
    
    function formatSquareFeet(sqFt) {
        // Convert to a float to remove any non-numeric characters
        const number = parseFloat(sqFt);
        // Check if the number is an integer
        if (number % 1 === 0) {
            return number.toString(); // Return as integer
        } else {
            return number.toFixed(2); // Keep two decimal places if needed
        }
    }

    const handleToggleShowAll = () => {
        setShowAll(!showAll); 
    };

    // This block can be adjusted or removed as needed depending on phaseDetails structure and UI needs
    return (
        <View style={styles.plotContainer}>
            <Text style={styles.plotHeader}>Plot Information:</Text>
            {phaseDetails.no_of_plots > 0 && (
                <>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoLabel}>No of Plots:</Text>
                        <Text style={styles.infoContent}>{phaseDetails.no_of_plots}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoLabel}>{phaseDetails.area_size_unit.name_vernacular} From:</Text>
                        <Text style={styles.infoContent}>from {formatSquareFeet(phaseDetails.area_size_from)} {phaseDetails.area_size_unit.name_vernacular}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoLabel}>Phase Number:</Text>
                        <Text style={styles.infoContent}>{phaseDetails.phase_number}</Text>
                    </View>
                </>
            )}
            {/* Conditionally show toggle if needed */}
            {showAll && ( // Adjust the condition based on your UI logic
                <TouchableOpacity onPress={handleToggleShowAll}>
                    <Text style={styles.smText}>{showAll ? 'Show Less -' : 'Show More +'}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

