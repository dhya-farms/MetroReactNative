import { StyleSheet } from "react-native";
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../constants/constantstyles/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,  // Use flex to take up the whole screen
    backgroundColor: 'white'
  },
  container: {
    width: '100%',  // Ensures the ScrollView takes the full width
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 50,
  },
    checkBoxTextContainer:{
      width: '90%',
      marginVertical: 10,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    checkbox: {
      width: 23,
      height: 23,
      borderWidth: 2,
      borderColor: '#1D9BF0',
      borderRadius: 6,
      marginRight: 15,
      color: 'white',
      justifyContent: 'center',
      alignItems: 'center'
    },
    checkboxSelected: {
      width: 23,
      height: 23,
      backgroundColor: '#1D9BF0',
      borderRadius: 6,
      marginRight: 15,
      color: 'white',
      justifyContent: 'center',
      alignItems: 'center'
    },
    checkboxLabel: {
      fontFamily: 'Poppins',
      fontWeight: '400',
      fontSize: 14,  
    },
    nextConatainer:{
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20,
    },
    nextButton:{
      width: 115,
      height: 37,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: PRIMARY_COLOR,
      borderRadius: 6,
    },
    nextText:{
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 14,
      color: 'white'
    },
    errorText: {
      color: 'red', // Error message color
      // Add more styles as needed
    },
    selectedOptionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // Add more styles as needed
    },
    docDetailsContainer:{
      width: '90%',
      
    },
    selectedOptionContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: PRIMARY_COLOR,
      borderRadius: 6,
      marginVertical: 10,
      padding: 10,
    },
    disabledContainer:{
      borderColor: SECONDARY_COLOR,
      opacity: 0.5,

    },
    docDetailText:{
      flex: 1,
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 14,
      marginVertical: 10,
    },
    disabledText:{
      color: SECONDARY_COLOR,
    },

    docTextContaner:{
      width: '90%',
      marginVertical: 10,
    },
    doctext:{
      fontFamily: 'Poppins',
      fontWeight: '600',
      fontSize: 16,
    },
    documentdetailsContainer:{
      width: '100%',
      padding: 20,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: PRIMARY_COLOR,
      borderRadius: 10,
    },
    docHeading:{
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 16,
      color: PRIMARY_COLOR
    },
    uploadContainer:{
      width: 26,
      height: 26,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: PRIMARY_COLOR,
      borderRadius: 4,
    },
    disabledUploadContainer:{
      borderColor: SECONDARY_COLOR,
      opacity: 0.5,
    },
    documentItem: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc'
  },
  
});

export default styles;