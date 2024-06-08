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
    filterText: {
      color: '#ffffff',
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
    loadingIndicator:{
      width: '100%', 
      justifyContent: 'center', 
      alignItems: 'center', 
      marginVertical: 20,
    },
    
  });

export default styles;