import { StyleSheet } from "react-native";
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../constants/constantstyles/colors';

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
      backgroundColor: 'white'
    },
    customerInfoContainar:{
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 55,
        marginHorizontal: 10,
      },
      imgContainer:{
        margin: 10,
      },
      cusTextContainer:{
        flex: 1,
      },
      deleteContainer:{
        width: 23,
        height: 23,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#C4C4C4',
        borderRadius: 4,
      },
      nameText:{
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 20,
        marginBottom: 3,
      },
      numText:{
        fontFamily: 'Poppins',
        fontWeight: '400',
        fontSize: 14,
      },
      smIconsContainer:{
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 5,
      },
    separator: {
        height: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        alignSelf: 'center',
        width: '90%',
        marginVertical: 16,
    },
    progressContainer:{
      width: '95%',
      padding: 10,
      position: 'relative'
    },
    statusText:{
      fontFamily: 'Poppins',
      fontWeight: '400',
      fontSize: 14,
    },
    itemContainer: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginBottom: 20, // Adjust as needed for spacing
    },
    statusContainer:{
      flexDirection: 'row',
      alignItems: 'center',
      width: '95%',
      padding: 10,
    },
    button:{
      backgroundColor: '#1D9BF0',
      padding: 10,
      borderRadius: 4,
    },
    buttonText:{
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 10,
      color: 'white'
    },
    statusItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '90%', // Ensure the row takes full width
      padding: 10,
      borderWidth: 1,
      borderColor: '#1D9BF0',
      borderRadius: 6,
      marginRight: 8,
      // ... (your existing styles)
    },
    completedStatusItem: {
      borderColor: '#80FF00', // Green border color for completed status
    },
    completedStatusCheck:{
      backgroundColor: '#80FF00'
    },
    completedStatusTokenCheck:{
      backgroundColor: '#C4C4C4'
    },
    siteText: {
      fontFamily: 'Poppins',
      fontSize: 14,
      fontWeight: '400',
      marginRight: 10,
    },
    checkicon: {
      width: 32,
      height: 32,
      backgroundColor: '#1D9BF0',
      borderRadius: 16,
      justifyContent: 'center', // Center the icon vertically
      alignItems: 'center', // Center the icon horizontally
    },
    detailToggle: {
      fontFamily: 'Poppins',
      fontSize: 10,
      fontWeight: '500',
      marginLeft: 10,
      marginVertical: 10,
    },
    details: {
      fontFamily: 'Poppins',
      fontSize: 12,
      fontWeight: '600',
      marginBottom: 10,
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
    contextText: {
      fontFamily: 'Poppins'
    },
    labelText: {
      fontWeight: '400',
      fontSize: 10,
    },
    stepBtnContainer:{
      width: 116,
      height: 37,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      backgroundColor: PRIMARY_COLOR,
      marginVertical: 10,
    },
    stepBtnText:{
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 12,
      color: '#fff'
    },
    paymentInfoContainer:{
      width: '90%',
    },
    paymentText:{
      fontFamily: 'Poppins',
      fontWeight: '600',
      fontSize: 16,
      color: '#424242',
      marginBottom: 5,
    },
    npContainer:{
      width: '90%',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      marginVertical: 10,
    },
    npText:{
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 16,
      color: '#0000FF',
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
});

export default styles;