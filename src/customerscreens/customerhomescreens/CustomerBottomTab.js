import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Import your screen components
import CustomerHome from './CustomerHome';
import PropertyScreenNavigator from '../../navigations/PropertyScreenNavigator';
import FavProperties from './FavProperties';
// ... other screen imports

const Tab = createBottomTabNavigator();

const BookingScreen = () => <View />;
const FavoritesScreen = () => <View />;
const ProfileScreen = () => <View />;
const SettingsScreen = () => <View />;

const screenOptions = ({ route }) => ({
  headerShown: false,
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;
    let label;

    switch (route.name) {
      case 'Home':
        iconName = 'home';
        label = 'Home';
        break;
      case 'properties':
        iconName = 'apartment';
        label = 'properties';
        break;
      case 'Favorites':
        iconName = 'favorite';
        label = 'Favorites';
        break;
      case 'Profile':
        iconName = 'person';
        label = 'Profile';
        break;
      case 'Settings':
        iconName = 'settings';
        label = 'Settings';
        break;
    }

    const iconColor = focused ? '#1D9BF0' : 'white';
    const backgroundColor = focused ? 'white' : 'transparent';
    const paddingHorizontal = focused ? 7 : 0; // Add padding when focused

    return (
    <View style={[styles.iconContainer, { backgroundColor, paddingHorizontal }]}>
      <MaterialIcons name={iconName} size={size} color={iconColor} />
      {focused && <Text style={[styles.tabLabel, { color: iconColor }]}>{label}</Text>}
    </View>
    );
  },
  tabBarActiveTintColor: '#1D9BF0',
  tabBarInactiveTintColor: 'white',
  tabBarStyle: {
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
    height: 60,
    backgroundColor: '#1D9BF0',
    borderTopWidth: 0, // Hide top border
    paddingHorizontal: 5,
  },
  tabBarShowLabel: false,
});

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={CustomerHome} />
      <Tab.Screen name="properties" component={PropertyScreenNavigator} />
      <Tab.Screen name="Favorites" component={FavProperties} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 85,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5, // Add some padding to the container itself
    borderRadius: 10, 
    margin: 10,// To round the corners// Add border when focused if needed
  },
  tabLabel: {
    fontSize: 10,
    marginLeft: 5,
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
  },
  // tabBar style was moved into screenOptions
});

export default BottomTabNavigator;
