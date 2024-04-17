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
    marginTop: 20,
    width: '90%',
    zIndex: 1000
  },
  customTextinputContainer:{
    width: '100%',
    zIndex: 5000
    
  },
  input: {
    width: '100%',
    height: 50, // Set the height
    backgroundColor: 'white', // Set the background color
    marginBottom: 10, 
  },
  cnText:{
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 20,
    margin: 10,
    color: '#424242'
  },
  saveBtn:{
    marginVertical: 20,
    width: 135,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#1D9BF0',
    alignSelf: 'center'
  },
  saveText:{
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
    color: '#FFFFFF'
  },
  saveMessage: {
    color: 'green', // or 'red' based on the type of message
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
    paddingVertical: 8,
    alignSelf: 'center' // add some padding
    // ... any other styling you want for this message
  },
  
});


export default styles;