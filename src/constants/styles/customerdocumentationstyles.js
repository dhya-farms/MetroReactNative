import { StyleSheet } from "react-native";
import { PRIMARY_COLOR } from '../../constants/constantstyles/colors';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
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
    docDetailText:{
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 14,
    },
    docTextContaner:{
      width: '90%',
      marginVertical: 10,
    },
    doctext:{
      fontFamily: 'Poppins',
      fontWeight: '600',
      fontSize: 16,
    }
    
});

export default styles;