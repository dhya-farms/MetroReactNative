import { View, Text}  from 'react-native';
import styles from '../constants/styles/propertydetailsstyles';

export const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
      <Text style={[styles.contextText, styles.labelText]}>{label}</Text>
      <Text style={[styles.contextText, styles.colonText]}>:</Text>
      <Text style={[styles.contextText, styles.valueText]}>{value}</Text>
    </View>
);