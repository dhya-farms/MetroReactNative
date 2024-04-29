
import { StyleSheet } from "react-native";


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
      backgroundColor: '#C4C4C4',
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
      alignItems: 'center', 
      marginRight: 10,// Center the icon horizontally
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
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
      marginLeft: 20, // Add space between rows
    },
    contextText: {
      fontFamily: 'Poppins'
    },
    labelText: {
      fontWeight: '400',
      fontSize: 10,
    },
    colonText: {
      marginRight: 4, // Space after the colon before the value
      // Colon styles if any
    },
    valueText: {
      fontWeight: '600',
      fontSize: 12,
    },
    pcText:{
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 10,
    },
    completedStatusItem: {
      borderColor: '#80FF00', // Green border color for completed status
    },
  
  });

export default styles