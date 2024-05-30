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
      backgroundColor: '#fff', 
    },
    plotHeader: {
      fontFamily: 'Poppins',
      fontWeight: '500',
      color: '#424242',
      fontSize: 14,
      marginBottom: 10,
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginBottom: 4,
      marginHorizontal: 10,
      flexWrap: 'wrap', // Align items to the start of the cross axis
    },
    infoLabel: {
      flex: 1,
      fontFamily: 'Poppins',
      fontWeight: '600',
      color: '#424242',
      fontSize: 12,
      marginRight: 10, // Give some space between the label and content
    },
    infoContent: {
      flex: 1, 
      fontFamily: 'Poppins',
      fontWeight: '400',
      color: '#424242',
      fontSize: 12,
    },
    smText:{
      fontFamily: 'Poppins',
      fontWeight: '500',
      color: '#1D9BF0',
      fontSize: 12,
      marginVertical: 5
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
      width: 30,
      height: 30,
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
      width: '95%', // Ensure the row takes full width
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
    approvedStatusItem:{
      borderColor: '#1D9BF0',
    },
    pendingStatusItem: {
      borderColor: '#FDF525', // Yellow for pending
    },
    rejectedStatusItem: {
      borderColor: 'red', // Red for rejected
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
    completedStatusCheck:{
      backgroundColor: '#80FF00'
    },
    approvedStatusCheck:{
      borderColor: '#1D9BF0',
    },
    pendingStatusCheck:{
      backgroundColor: '#FDF525'
    },
    rejectedStatusCheck:{
      backgroundColor: '#FF0000',
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
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: 4,
      marginHorizontal: 10,
      flexWrap: 'wrap', // Align items to the start of the cross axis
    },
    labelText: {
      flex: 0,  // Flex set to 0 to maintain width only to content
      minWidth: 100, // Minimum width for label
      fontFamily: 'Poppins',
      fontWeight: '400',
      color: '#424242',
      fontSize: 10,
      marginRight: 10, // Give some space between the label and content
    },
    colonText: {
      marginRight: 4,
    },
  
    valueText: {
      flex: 1, 
      fontFamily: 'Poppins',
      fontWeight: '600',
      color: '#424242',
      fontSize: 12, // Space after the colon before the value
    },
    documentItem: {
      width: '80%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 4,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc'
    },
    docDetailText:{
        flex: 1,
        fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: 10,
        marginVertical: 5,
    },
    balanceAmountContainer:{
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },

    
});

export default styles;