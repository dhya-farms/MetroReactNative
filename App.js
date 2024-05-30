import { StyleSheet, useColorScheme, StatusBar, View, Text } from 'react-native';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreenNavigator from './src/navigations/HomeScreenNavigator';
import LoginScreenNavigator from './src/navigations/LoginScreenNavigator';
import { PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider } from './src/contexts/useThemeContext';
import CustomerTabEntry from './src/customerscreens/customerhomescreens/CustomerTabEntry';
import AdminTabEntry from './src/screens/adminscreens/AdminTabEntry';
import SoTabEntry from './src/screens/soscreens/SoTabEntry';
import Toast from 'react-native-toast-message';


const Stack = createNativeStackNavigator();

const toastConfig = {
  success: ({ text1 }) => (
    <View style={styles.customToast}>
      <Text style={styles.customText}>{text1}</Text>
    </View>
  ),
  error: ({ text1 }) => (
    <View style={[styles.customToast, styles.errorToast]}>
      <Text style={styles.customText}>{text1}</Text>
    </View>
  )
};


export default function App() {
  const scheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);
  const [initialNavigationState, setInitialNavigationState] = useState({
    routeName: "Onboarding",
    params: {},
  });
  const [cusToken, setCusToken] = useState(null);
  const [cusUserId, setCusUserId] = useState(null);


  useEffect(() => {
    async function prepareApp() {
      try {
        // Pre-load fonts or any other assets here
        await Font.loadAsync({
          'Poppins': require('./assets/fonts/Poppins.ttf'),
          'HelveticaNeue': require('./assets/fonts/Helvetica.ttf'),
          'RobotoCondensed': require('./assets/fonts/RobotoCondensed.ttf'),
        });

        // Retrieve token, user ID, and role
        const [token, userId, role, soId] = await Promise.all([
          AsyncStorage.getItem('userToken'),
          AsyncStorage.getItem('userId'),
          AsyncStorage.getItem('role'),
          AsyncStorage.getItem('createdBy'),
        ]);

        setCusToken(token); // Corrected variable name
        setCusUserId(userId); // Corrected variable name


        console.log(`Retrieved values - Token: ${token}, UserId: ${userId}, Role: ${role}`);

        // Determine the initial route and parameters based on role
        let routeName = "Onboarding"; // Default to Onboarding
        let params = {}; // Initialize params object

        if (token && userId) {
          const roleNumber = parseInt(role, 10);
          switch (roleNumber) {
            case 1:
            case 2: 
              routeName = "AdminBottomTab";
              params = { screen: 'Admin home', params: { token, userId } };
              break;
            case 3: // SO
              routeName = "SoBottomTab";
              params = { screen: 'SO home', params: { token, userId } };
              break;
            case 4: // Customer
              routeName = "CustomerBottomTab";
              params = { screen: 'Home', params: { token, userId } };
              break;
            default:
              // Handle any default or error cases
              routeName = "CustomerBottomTab";
              params = { screen: 'Home', params: { token, userId, soId } };
          }
        }

        // Update state with determined route and params
        setInitialNavigationState({ routeName, params });
        
      } catch (e) {
        console.warn("Initialization error:", e);
      } finally {
        setIsReady(true);
      }
    }

    prepareApp();
  }, []);

  if (!isReady) {
    return null; // or a custom loading indicator
  }

  return (
    <ThemeProvider>
      <StatusBar
        backgroundColor={scheme === 'light' ? 'white' : 'black'}
        barStyle={scheme === 'light' ? 'dark-content' : 'light-content'}
      />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider>
                <NavigationContainer>
                  <Stack.Navigator
                    screenOptions={{
                      headerShown: false,
                      gestureEnabled: true,
                      gestureDirection: 'vertical',
                    }}
                    initialRouteName={initialNavigationState.routeName} // Default initial route
                  >
                    <Stack.Screen name='Onboarding' component={HomeScreenNavigator} />
                    <Stack.Screen name='LoginScreens' component={LoginScreenNavigator} />
                    <Stack.Screen name='CustomerBottomTab' component={CustomerTabEntry} initialParams={{ cusToken, cusUserId }} />
                    <Stack.Screen name='AdminBottomTab' component={AdminTabEntry} initialParams={{ cusToken, cusUserId }}/>
                    <Stack.Screen name='SoBottomTab' component={SoTabEntry} initialParams={{ cusToken, cusUserId }}/>
                  </Stack.Navigator>
                </NavigationContainer>
        </PaperProvider>
      </GestureHandlerRootView>
      <Toast config={toastConfig} />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customToast: {
    width: '90%',
    height: 74,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#1D9BF0' // success color
  },
  errorToast: {
    backgroundColor: 'red',
    borderColor: '#FF0000' // error color
  },
  customText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
    color: '#424242',
  }
});
