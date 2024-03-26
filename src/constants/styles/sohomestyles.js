import { StyleSheet } from "react-native";
import { PRIMARY_COLOR } from '../../constants/constantstyles/colors';

const styles = StyleSheet.create({
    container: {
      width: '100%',
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
      paddingVertical: 15, // Adjust padding as needed
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
});

export default styles;