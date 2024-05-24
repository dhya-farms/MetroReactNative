import { StyleSheet } from "react-native";
import { PRIMARY_COLOR } from '../../constants/constantstyles/colors';

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
      zIndex: 6000,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
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
      fontSize: 18,
      fontWeight: '600',
      color: '#424242',
      fontFamily: 'Poppins'
    },
    filterButton: {
      // Define if you need specific styles for your button
    },
    bellIcon: {
      width: 34, // Adjust size as needed
      height: 34, // Adjust size as needed
    },
    userContainer:{
      marginVertical: 20,
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: PRIMARY_COLOR,
      borderRadius: 9,
      padding: 20,
  
    },
    unText:{
      fontFamily: 'Poppins',
      fontWeight: '400',
      fontSize: 14,
      color: '#fff'
    },
    imageContainer:{
      width: 58,
      height: 68,
      borderRadius: 29,
    },
    userImage:{
      width: 58,
      height: 68,
      borderRadius: 29,
      resizeMode: 'cover'
    },
    separator: {
      height: 1,
      backgroundColor: '#C4C4C4',
      alignSelf: 'center',
      width: '90%',
      marginVertical: 16,
    },
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    loadingIndicator:{
      width: '100%', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '20%',
    },
    npContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    nopText: {
      fontSize: 14,
      color: '#757575',
      fontFamily: 'Poppins'
    },
});

export default styles;