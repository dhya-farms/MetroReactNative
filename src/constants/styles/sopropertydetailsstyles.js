import { StyleSheet } from "react-native";

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
      alignItems: 'center',
      justifyContent: 'center',
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
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginVertical: 20
    },
    LocationImage:{
      width: 320,
      height: 128,
      justifyContent: 'flex-start',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: '#D9D9D9',
      borderRadius: 15
    },
    plotContainer: {
      width: '90%',
      // Assuming a white background
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
      justifyContent: 'space-between',
      marginBottom: 4,
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
      justifyContent: 'space-between',
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

export default styles