
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { useEffect } from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import AdminBottomTab from './src/screens/adminscreens/AdminBottomTab';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
      <NavigationContainer>
      <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'vertical',
          }}
          initialRouteName="AdminBottomTab" // Default initial route
        >
      <Stack.Screen name= 'AdminBottomTab' component={AdminBottomTab}/>
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
   /*<PaperProvider>
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
    </PaperProvider>*/
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
