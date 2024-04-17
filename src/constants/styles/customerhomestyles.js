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
        backgroundColor: 'white'
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
        fontSize: 20,
        fontWeight: '500',
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
      searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF', // Set to white or any other color you need
        borderRadius: 10,
        width: '90%', // Set the width of the input container
        marginBottom: 8, // Add space between input fields
        paddingHorizontal: 12, // Padding on the sides of the input container
        shadowColor: "#000",
        margin: 25,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Elevation for Android
        
      },
      searchIcon: {
        paddingLeft: 10,
        marginRight: 10,
      },
      searchInput: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
        borderRadius: 5,
        fontSize: 14,
        fontFamily: 'Poppins',
        fontWeight: '400',
      },
      categoryContainer: {
        width: '100%',
        padding: 20,
      },
      categoryButton: {
        backgroundColor: '#fff', // Background color for category button
        marginRight: 10, // Spacing between buttons
        borderRadius: 5, // Adjust border radius to match your design
        shadowColor: '#000',
        borderWidth: 1,
        borderColor: '#D9D9D9', // Shadow color
        shadowOffset: {
          width: 0,
          height: 1, // Vertical shadow
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2, // Elevation for Android
        justifyContent: 'center',
        alignItems: 'center',
        height: 40, // Height of the button
        paddingHorizontal: 10,
        marginLeft: 10,
      },
      categoryText: {
        color: '#000', // Text color
        fontSize: 16, // Text font size
      },
      bannerContainer: {
        width: 320,
        height: 209.52,
        overflow: 'hidden', // Ensure the image border radius is applied
        borderRadius: 10, 
        position: 'relative',// You can also apply the border radius here
      },
      bannerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10, // Make sure this is here, adjust value as needed
     },
     bannerTextContainer:{
      position: 'absolute', // Position the container absolutely
      bottom: 0, // Align it to the bottom of the bannerContainer
      left: 0, // Align it to the left of the bannerContainer
      right: 0, // Align it to the right of the bannerContainer
      padding: 10, // Add some padding
     },
     bannerText:{
      fontFamily: 'Poppins',
      fontWeight: '700',
      fontSize: 14,
      color: '#fff',
     },
     categoryButtonSelected: {
      backgroundColor: '#1D9BF0', // New background color for selected button
      // Other styles you want to apply when selected
      },
      categoryTextSelected: {
        color: '#FFFFFF', // New text color for selected text
        // Other styles you want to apply when selected
      },
      carouselContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
        // Add additional styling if necessary
      },
      image: {
        borderRadius: 10,
        resizeMode: 'cover'
      },
      mainPaginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      },
      paginationDot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        marginHorizontal: 5,
      },
      paginationDotActive: {
        backgroundColor: '#1D9BF0',
      },
      paginationDotInactive: {
        backgroundColor: '#C4C4C4',
      },
      updateContainer:{
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20,
        paddingHorizontal: 20,
      },
      updateText:{
        fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: 16,
      },
      seeAllText:{
        fontFamily: 'Poppins',
        fontWeight: '400',
        fontSize: 12,
        color: '#1D9BF0'
      },
      loadingIndicator:{
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginVertical: 20,
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