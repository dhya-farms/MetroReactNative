import { StyleSheet } from "react-native";
import { PRIMARY_COLOR } from '../../constants/constantstyles/colors';

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
    cfContainer:{
      width: '100%'
    },
    addImgContainer:{
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    imageContainer:{
      width: 150,
      height: 150,
      borderRadius: 150/2,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 70,
    },
    personImage:{
      width: '100%',
      height: '100%',
      borderRadius: 75,
      resizeMode: 'cover'    
    },
    btnContainer:{
      width: 135,
      height: 39,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: PRIMARY_COLOR,
      borderRadius: 5,
      marginVertical: 10,
    },
    btnText:{
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 14,
      color: '#fff'
    },
    textcontainer:{
      width: '100%',
      marginVertical: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    nameText:{
      fontFamily: 'Poppins',
      fontWeight: '600',
      fontSize: 20,
      margin: 5,
    },
    mbText:{
      fontFamily: 'Poppins',
      fontWeight: '400',
      fontSize: 14,
    },
    buttonContainer: {
      marginVertical: 50,
      flexDirection: 'row', // Align children in a row
      justifyContent: 'flex-end', // Align button to the end
      width: '80%', // Ensure the container takes full width
     },
  
      doneButton: {
      backgroundColor: "#1D9BF0",
      borderRadius: 5,
      padding: 10,
      paddingHorizontal: 28,
      elevation: 2,
      },
      doneButtonText: {
      color: "white",
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 14,
      },
  });

export default styles;