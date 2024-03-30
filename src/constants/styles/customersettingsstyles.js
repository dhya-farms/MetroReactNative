import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingBottom: 50,
      backgroundColor: 'white'
    },
    settingsContainer:{
      width: '90%',
      alignItems: 'center'
    },
    settingsButton:{
      width: '80%',
      paddingVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#1D9BF0',
      marginVertical: 30,
      borderRadius: 5
    },
    settingsText:{
      fontFamily: 'Poppins',
      fontSize: 12,
      fontWeight: '500',
      color: '#1D9BF0'
    },
    settingsBtnContainer:{
      width: '90%',
      alignItems: 'center',
      marginTop: 40,
    },
    settingsbtn:{
      width: '60%',
      backgroundColor: '#1D9BF0',
      borderRadius: 5,
      paddingVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 15,
    },
    btnText:{
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 12,
      color: 'white'
    }
      
  });


export default styles;