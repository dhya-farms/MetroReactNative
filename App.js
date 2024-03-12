
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { useEffect } from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreenNavigator from './src/navigations/HomeScreenNavigator';
import LoginScreenNavigator from './src/navigations/LoginScreenNavigator';
import CustomerHome from './src/customerscreens/customerhomescreens/CustomerHome';
import CustomerBottomTabNavigator from './src/customerscreens/customerhomescreens/CustomerBottomTab';
import CustomerProperties from './src/customerscreens/customerhomescreens/CustomerProperties';
import ShowProperties from './src/customerscreens/customerhomescreens/ShowProperties';
import SlidingCarousel from './src/components/SlidingCarousel';
import TabBar from './src/components/TabComponent';
import FavProperties from './src/customerscreens/customerhomescreens/FavProperties';
import MyPropertiesDetails from './src/customerscreens/customerhomescreens/MyPropertiesDetails';
import { Provider as PaperProvider } from 'react-native-paper';
import ImageCarousel from './src/components/ImageCaurosel';
import CustomerProfile from './src/customerscreens/customerhomescreens/CustomerProfile';

const Stack = createNativeStackNavigator();


export default function App() {

  useEffect(() => {
    async function prepareApp() {
      try {
        await Font.loadAsync({
          'Poppins': require('./assets/fonts/Poppins.ttf'),
          'HelveticaNeue': require('./assets/fonts/Helvetica.ttf'),
          'RobotoCondensed': require('./assets/fonts/RobotoCondensed.ttf'),
        });

      } catch (e) {
        console.warn(e);
      }
    }
    
    prepareApp();
  }, []); 

  return (
    <View>
    <Text>Hello, Expo!</Text>
    </View>
   /*
   <NavigationContainer>
    <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'vertical',
          }}
          initialRouteName="Onboarding" // Default initial route
        >
        <Stack.Screen name='Onboarding' component={HomeScreenNavigator}/>
        <Stack.Screen name='LoginScreens' component={LoginScreenNavigator}/>
        <Stack.Screen name= 'CustomerBottomTab' component={CustomerBottomTabNavigator}/>
      </Stack.Navigator>
    </NavigationContainer>
    */
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
