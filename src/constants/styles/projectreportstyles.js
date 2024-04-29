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
      barContainer:{
        alignItems: 'center',
        justifyContent: 'center',
      },
      prContainer:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      },
      dorContainer:{
        width: 234,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1D9BF0',
        borderRadius: 4,
        marginVertical: 15,
      },
      dorText:{
        fontFamily: 'Poppins',
        fontSize: 16,
        fontWeight: '500',
        color: '#FFFFFF'
      }
});

export default styles;