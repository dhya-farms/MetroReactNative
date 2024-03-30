
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { useEffect } from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SObottomTab from './src/screens/soscreens/SObottomTab';
import HomeScreenNavigator from './src/navigations/HomeScreenNavigator';
import LoginScreenNavigator from './src/navigations/LoginScreenNavigator';
import CustomerBottomTab from './src/customerscreens/customerhomescreens/CustomerBottomTab';
import AdminBottomTab from './src/screens/adminscreens/AdminBottomTab';
import { PaperProvider } from 'react-native-paper';


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
     <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
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
            <Stack.Screen name= 'CustomerBottomTab' component={CustomerBottomTab}/>
            <Stack.Screen name= 'AdminBottomTab' component={AdminBottomTab}/>
            <Stack.Screen name= 'SoBottomTab' component={SObottomTab}/>
          </Stack.Navigator>
        </NavigationContainer>
    </PaperProvider>
    </GestureHandlerRootView>
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
