import React from 'react';
import { ScrollView, StyleSheet,  StatusBar, View, Text} 
from 'react-native';
import SortHeader from '../../components/SortHeader';
import Carousel from '../../components/Carousel';
import HeaderContainer from '../../components/HeaderContainer';
import { useAdminProperties } from '../../contexts/useAdminProperties';




const AdminProperties = ({route, navigation}) => {
  const { adminProperties } = useAdminProperties();
  const routeProperties = route.params?.properties;
  console.log('route',routeProperties)
  const propertiesData = routeProperties || adminProperties

  const handleGeneralPropertyPress = (propertyId) => {
    navigation.navigate("Admin Properties Details", {params: {
      propertyId: propertyId,
      backScreen: "Properties"  // Indicating that the navigation originated from the Properties screen
    }});
  };

  
  return (
    <View style={styles.mainContainer}>
      <StatusBar/>
      <HeaderContainer title="Properties" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{ navigation.navigate("Home", {
        screen: "Admin Home",
      })}}/>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
     <SortHeader title="Properties"  isSortVisible={false} />
     {propertiesData.length > 0 ? (
        <Carousel
          data={propertiesData}
          onCardPress={handleGeneralPropertyPress}
          isHeartVisible={false}
          keyExtractor={(item) => `property-${item.id}`}
        />
      ) : (
      <View style={styles.npContainer}>
        <Text style={styles.nopText}>Loading Data...</Text>
      </View>
      )}
    </ScrollView>
    </View>
  );
};

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
  
});

export default AdminProperties;