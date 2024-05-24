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
    headerContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
      paddingTop: 20, // Adjust padding as needed
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    headerTitle: {
      fontFamily: 'Poppins',
      fontSize: 18,
      fontWeight: '600',
    },
    filterButton: {
      // Define if you need specific styles for your button
    },
    bellIcon: {
      width: 34, // Adjust size as needed
      height: 34, // Adjust size as needed
    },
    filterText: {
      color: '#ffffff',
    },
    slidingContainer:{
      width: '100%',
    },
    cityConatiner:{
      marginVertical: 20,
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
    desContainer:{
      width: '90%',
      alignItems: 'flex-start',
      marginLeft: 10,
    },
    desHeader:{
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 14,
      marginBottom: 10,
    },
    desText:{
      fontFamily: 'Poppins',
      fontWeight: '400',
      fontSize: 12,
      marginVertical: 10,
      marginHorizontal: 10,
    },
    smText:{
      fontFamily: 'Poppins',
      fontWeight: '500',
      color: '#1D9BF0',
      fontSize: 12,
      marginVertical: 5
    },
    LocationImageContainer:{
      width: '95%',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20
    },
    LocationImage:{
      width: 320,
      height: 128,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#D9D9D9',
      borderRadius: 15
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
      resizeMode: 'cover'
      // Include other styling for your icons
    },
    text: {
      fontFamily: 'Poppins',
      fontWeight: '400',
      fontSize: 10,
    },
    gmContainer:{
      width: '90%',
    },
    gmHeader: {
      fontFamily: 'Poppins',
      fontWeight: '400',
      fontSize: 16,
      marginBottom: 10,
    },
    galleryContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    imageWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 25,
      width: '30%', 
    },
    image: {
      width: 83,
      height: 83,
      resizeMode: 'cover',
      borderRadius: 15
    },
  });

export default styles;