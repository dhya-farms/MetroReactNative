import { StyleSheet } from "react-native";
import { PRIMARY_COLOR } from '../../constants/constantstyles/colors';
import { SECONDARY_COLOR } from "../../constants/constantstyles/colors";

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
    ldContainer:{
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 20,
    },
    ldButton:{
      backgroundColor: PRIMARY_COLOR,
      width: 137,
      height: 37,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    ldText:{
      fontFamily: 'Poppins',
      fontSize: 14,
      fontWeight: '500'
    },
    separator: {
      height: 1,
      marginTop: 20,
      backgroundColor: PRIMARY_COLOR,
      alignSelf: 'center',
      width: '90%',
      marginVertical: 3,
    },
    pmCheckBoxContainer:{
      width: '90%',
      marginVertical: 2,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
  
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
    checkboxLabel:{
      fontFamily: 'Poppins',
      fontWeight: '400',
      fontSize: 14,  
    },
    inputContainer:{
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginVertical: 30,
    },
    input: {
      flex: 1,
      height: 54, // Set the height
      backgroundColor: 'white', // Set the background color
      marginVertical: 2,
      marginRight: 10,
      borderColor: '#1D9BF0',
      borderRadius: 4,
      // Add a bottom margin
    },

    specialInput: {
      flex: 1,
      height: 30, // Set the height
      backgroundColor: 'white', // Set the background color
      marginVertical: 30,
      marginRight: 10,
      borderColor: '#1D9BF0',
      borderRadius: 4,
    },
  
    tiContainer:{
      width: '90%', 
      marginHorizontal: 10,
      marginVertical: 5,
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'center'
    },

    specialContainer: {
      width: '100%', 
      marginHorizontal: 5,
      marginVertical: 5,
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'center'
    },

    pmTextContainer:{
      width: '90%',
      marginVertical: 10,
    },
    pmText:{
      fontFamily: 'Poppins',
      fontSize: 18,
      fontWeight: '600',
    },
    inputFieldsContainer:{
      width: '90%', 
      marginHorizontal: 10,
      marginVertical: 5,
      alignItems: 'center', 
      justifyContent: 'center'
    },
    paymentEntriesContainer:{
      width: '90%',
      marginVertical: 20,
    },
    paymentEntryContainer:{
      width: '100%', 
      padding: 10, 
      borderColor: SECONDARY_COLOR, 
      borderWidth: 1, 
      borderRadius: 6,
      marginVertical: 20,
    },
    paymentEntryTitle:{
      fontFamily: 'Poppins',
      fontWeight: '600',
      fontSize: 16,
      color: '#424242',
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
    saveBtnContainer:{
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    saveBtn:{
      width: 115,
      height: 37,
      borderRadius: 4,
      backgroundColor: PRIMARY_COLOR,
      justifyContent: 'center',
      alignItems: 'center'
    },
    saveBtnText:{
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 14,
      color: '#fff'
    },
    dropdown: {
      borderRadius: 4,
      width: '100%',
    },
    header: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderColor: '#1D9BF0',
      borderWidth: 1,
      backgroundColor: '#FFF',
      paddingLeft: 10,
      borderRadius: 5
    },
    title: {
      fontFamily: 'Poppins',
      fontWeight: '400',
      fontSize: 12,
      textAlign: 'center'
    },
    icon: {
      fontSize: 16,
    },
    optionsContainer: {
      maxHeight: 200,
      borderWidth: 1,
      borderColor: '#C4C4C4',
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      // Set a maximum height for the dropdown options to scroll
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomColor: '#DDD',
      borderBottomWidth: 1,
      backgroundColor: '#FFF',
      padding: 5
      
     
    },
    tickIcon:{
      color: '#1D9BF0',
      marginRight: 5,
    },
    dropdownContainer:{
      width: 30,
      height: 30,
      backgroundColor: '#1D9BF0',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3
    },
    dropIcon:{
      width: 10,
      color: 'white'
    },
    optionText:{
      fontFamily: 'Poppins',
      fontWeight: '400',
      fontSize: 12,
      textAlign: 'center'
    }
  });

export default styles;