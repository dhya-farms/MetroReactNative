import { StyleSheet } from "react-native";
import { PRIMARY_COLOR } from '../../constants/constantstyles/colors';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
  
    contentContainer: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingBottom: 50,
    },
    plotContainer:{
      width: '80%',
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    inputContainer:{
      borderWidth: 1,
      borderColor: '#C4C4C4',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginVertical: 30,
    },
    input: {
      flex: 1,
      height: 34, // Set the height
      backgroundColor: 'white', // Set the background color
      marginVertical: 2,
      marginRight: 10,
      borderColor: '#1D9BF0',
      borderRadius: 4,
      // Add a bottom margin
    },
    tiContainer:{
      width: '90%', 
      marginHorizontal: 10,
      marginVertical: 10,
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'center'
    },
    radioButton: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
    },
    radioButtonSelected: {
      height: 12,
      width: 12,
      borderRadius: 6,
      backgroundColor: '#1D9BF0',
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
      fontSize: 12,
      fontWeight: '500'
    },
    separator: {
      height: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      alignSelf: 'center',
      width: '90%',
      marginVertical: 16,
     },
    addNewText:{
      fontFamily: 'Poppins',
      fontSize: 14,
      fontWeight: '500',
      color: PRIMARY_COLOR,
      textDecorationLine: 'underline',
      textDecorationColor: PRIMARY_COLOR
    },
    plotText:{
      fontFamily: 'Poppins',
      fontSize: 18,
      fontWeight: '600',
      marginVertical: 10,
      alignSelf: 'flex-start',
      marginLeft: 20,
    },
    buttonContainer: {
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-between', // Aligns the delete button to the left and the add button to the right
      alignItems: 'center', // Centers buttons vertically
    },
    deleteButton:{
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center'
    },
    placeholderButton: {
      // This style should mimic the deleteButton size without displaying anything
      opacity: 0,
      width: 24, // Make sure this matches your delete button width
      height: 24, // Make sure this matches your delete button height
    },
    cnbtnContainer:{
      width: '90%',
      justifyContent: 'space-around',
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    cnButton:{
      backgroundColor: PRIMARY_COLOR,
      width: 136,
      height: 37,
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      borderRadius: 5,
    },
    cnText:{
      fontFamily: 'Poppins',
      fontSize: 14,
      fontWeight: '500',
      color: 'white'
    },
    summaryContainer:{
      borderWidth: 1,
      borderColor: '#C4C4C4',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%',
      marginVertical: 30,
    },
    pnContainer:{
      width: '85%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    pnButton:{
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center'
    },
    paymentDetailsContainer:{
      borderWidth: 1,
      borderColor: PRIMARY_COLOR,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%',
      marginVertical: 30,
    },
    infoRowContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between', // Align items on opposite ends
      alignItems: 'center', // Center items vertically
      padding: 10,
      marginHorizontal: 10,
    },
    infoLabel: {
      fontFamily: 'Poppins',
      fontWeight: '400',
      fontSize: 14,
      color: '#424242',
      width: '45%', // Fixed width for labels
    },
    infoValue: {
      fontFamily: 'Poppins',
      fontWeight: '600',
      fontSize: 16,
      color: '#424242',
      textAlign: 'left', // Align text to the right
      width: '55%', // Remaining width for values
    },
    paymentSummaryContainer:{
      width: '90%'
    },
    doneBtnContainer:{
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20,
    },
    doneButton:{
      width: 135,
      height: 37,
      borderRadius: 5,
      backgroundColor: PRIMARY_COLOR,
      justifyContent: 'center',
      alignItems: 'center'
    },
    doneText:{
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 14,
      color: 'white'
    },
    errorMessage:{
      color: 'red'
    }
});

export default styles;