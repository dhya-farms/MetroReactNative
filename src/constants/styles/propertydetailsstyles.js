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
    slidingContainer:{
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cityConatiner:{
      marginVertical: 30,
      marginLeft: 40,
      width: '90%',
      alignItems: 'flex-start',
      justifyContent: 'flex-start'
    },
    cityText:{
      fontFamily: 'Poppins',
      fontSize: 18,
      fontWeight: '600',
    },
    cityAmount:{
      fontFamily: 'Poppins',
      fontSize: 16,
      fontWeight: '500',
    },
    separator: {
      height: 2,
      backgroundColor: '#ADADAD',
      width: '90%',
      marginVertical: 16,
    },
    plotContainer: {
      width: '90%',
    },
    plotHeader: {
      fontFamily: 'Poppins',
      fontWeight: '500',
      color: '#424242',
      fontSize: 14,
      marginBottom: 15,
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
      marginHorizontal: 10,
      alignItems: 'flex-start', // Align items to the start of the cross axis
    },
    infoLabel: {
      fontFamily: 'Poppins',
      fontWeight: '600',
      color: '#424242',
      fontSize: 12,
      minWidth: 100, // Set a minimum width for labels
      textAlign: 'left',
    },
    infoContent: {
      fontFamily: 'Poppins',
      fontWeight: '400',
      color: '#424242',
      fontSize: 12,
      textAlign: 'left',
      width: '100%'
    },
    amContainer:{
      width: '90%',
      marginVertical: 20,
    },
    amHeader:{
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 14,
      color: '#424242',
      marginVertical: 20,
    },
    amenitiesContainer:{
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    amenity: {
      alignItems: 'center',
      marginBottom: 20,
      width: '27%', // Set this to control the number of items per row
    },
    icon: {
      width: 35,
      height: 35,
      // Include other styling for your icons
    },
    text: {
      fontFamily: 'Poppins',
      fontWeight: '400',
      fontSize: 10,
      textAlign: 'center'
    },
    nbContainer:{
      width: '90%',
      marginVertical: 20,
    },
    nbHeader:{
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 14,
      color: '#424242',
      marginVertical: 20,
    },
    NearbyContainer:{
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    nearby: {
      alignItems: 'center',
      marginBottom: 20,
      width: '27%',
    },
    
    nbtext: {
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 10,
      color: '#424242',
      textAlign: 'center'
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
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5, // Add space between rows
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
});

export default styles;