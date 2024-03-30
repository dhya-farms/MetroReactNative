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
  filterText: {
    color: '#ffffff',
  },
  imageContainer:{
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  personImage:{
    width: 124,
    height:124,
    borderRadius: 62
  },
  textInputContainer:{
    width: '90%'
  },
  input: {
    width: '100%',
    height: 50, // Set the height
    backgroundColor: 'white', // Set the background color
    marginBottom: 10, // Add a bottom margin
  },
  cnText:{
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 20,
    margin: 10,
    color: '#424242'
  }
  
});


export default styles;