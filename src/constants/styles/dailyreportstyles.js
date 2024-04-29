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
    dorContainer:{
      width: 234,
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#1D9BF0',
      borderRadius: 4,
      marginVertical: 10,
    },
    dorText:{
      fontFamily: 'Poppins',
      fontSize: 16,
      fontWeight: '500',
      color: '#FFFFFF'
    },
    rlContainer:{
      width: '90%',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginVertical: 10,
    },
    rlCircle:{
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#A4CD3C',
      marginRight: 5,
   
      
    },
    rlText:{
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 12,
      textAlign: 'center'
    }
  });

export default styles;