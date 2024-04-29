import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, StatusBar} 
from 'react-native';
import SortHeader from '../../components/SortHeader';
import HeaderContainer from '../../components/HeaderContainer';
import SOcards from '../../components/SOcard';



const SalesOfficerList = ({route, navigation}) => {
  const [backscreen, setBackScreen] = useState('')

  const soUsers = route.params?.soUsers
  

  useEffect(() => {
  const nestedBackScreen = route.params?.params?.backScreen;
  const directBackScreen = route.params?.backScreen;
  const effectiveBackScreen = nestedBackScreen || directBackScreen;
  console.log("Effective Back Screen for use:", effectiveBackScreen);
    if (effectiveBackScreen) {
      console.log("Navigated from:", effectiveBackScreen);
      setBackScreen(effectiveBackScreen)
    } else {
      console.log("No Back Screen provided in route params.");
    }

  }, [backscreen]);

    
  const handleBack = () => {
    if (backscreen==="Home") {
      navigation.navigate("Home", {
        screen: "Admin Home",
      });
    
    } else if(backscreen==="SOManager"){
      navigation.navigate("SO", { 
        screen: "So Manager" ,
      })
      
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar/>
      <HeaderContainer title="Sales Officer List" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>navigation.goBack()}/>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={{zIndex: 2000, justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
      <SortHeader title="SO List"  />
      </View>
      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <SOcards data={soUsers} isHorizontal={false}  onCardPress={(SoId) => {
           navigation.navigate("SO", {
            screen: "SO Officers Details",
            params: { SoId: SoId, soUsers: soUsers, backScreen: 'SOList' },
          });
        }}/>
      </View>
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
  }
  
});

export default SalesOfficerList;