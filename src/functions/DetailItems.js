import { View, Text, TouchableOpacity} 
from 'react-native';

import styles from '../constants/styles/commonpropertydetailsstyles';

export const DetailItems = ({ details, phaseDetails, showAll, setShowAll }) => {
    
   const formatLabel = (key) => {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
   };

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
      setShowAll(!showAll); // Toggle the state to show/hide additional details
    };

    const excludeKeys = ['amenities', 'sq_ft_from', 'phase_number'];

    const sortedKeys = Object.keys(details).filter(key => !excludeKeys.includes(key)); // Exclude 'amenities'
    const initialKeys = sortedKeys.slice(0, 3); // First three entries
    const additionalKeys = sortedKeys.slice(3); // Remaining entries

    return (
      <View style={styles.plotContainer}>
      <Text style={styles.plotHeader}>Plot Information:</Text>
      {phaseDetails && (
      <>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>No of Plots:</Text>
          <Text style={styles.infoContent}>{phaseDetails.no_of_plots}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>{phaseDetails.area_size_unit.name_vernacular} From:</Text>
          <Text style={styles.infoContent}>from {formatSquareFeet(phaseDetails.area_size_from)}{phaseDetails.area_size_unit.name_vernacular}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Phase Number:</Text>
          <Text style={styles.infoContent}>{phaseDetails.phase_number}</Text>
        </View>
      </>
    )}
      {initialKeys.concat(showAll ? additionalKeys : []).map((key) => {
        const label = formatLabel(key);
        return (
          <View key={key} style={styles.infoContainer}>
            <Text style={styles.infoLabel}>{label}:</Text>
            <Text style={styles.infoContent}>{details[key].toString()}</Text>
          </View>
      );
    })}
    {sortedKeys.length > 3 && ( // Only show toggle if there are more than three items
        <TouchableOpacity onPress={handleToggleShowAll}>
        <Text style={styles.smText}>{showAll ? 'Show Less -' : 'Show More +'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
