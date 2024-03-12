import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../customerscreens/loginscreens/HomePage';
import Home1 from '../customerscreens/loginscreens/Home1';
import Home2 from '../customerscreens/loginscreens/Home2';
import Home3 from '../customerscreens/loginscreens/Home3';

const HomeScreen = createNativeStackNavigator();

const HomeScreenNavigator = () => {
  return (
    <HomeScreen.Navigator screenOptions={{ headerShown: false }}>
      <HomeScreen.Screen name="Home" component={HomePage} />
      <HomeScreen.Screen name='Home1' component={Home1}/>
      <HomeScreen.Screen name="Home2" component={Home2} />
      <HomeScreen.Screen name="Home3" component={Home3} />
    </HomeScreen.Navigator>
  );
};

export default HomeScreenNavigator;