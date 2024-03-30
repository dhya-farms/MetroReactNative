import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AdminPropertyNavigator from '../../navigations/AdminScreenNavigator';
import AdminHome from './AdminHome';
import AdminCustomerScreenNavigator from '../../navigations/AdminCustomerScreenNavigator';
import SoscreenNavigator from '../../navigations/SOscreenNavigator';
import AdminSettings from './AdminSettings';

const Tab = createBottomTabNavigator();


const CustomTabBarButton = ({ children, onPress, focused }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}
  >
    <View style={{
      width: 56,
      height: 56,
      alignItems: 'center',
      padding: 5,
      borderRadius: 28,
      backgroundColor: focused ? 'white' : '#30BCED', // Center button background color
    }}>
      {children}
    </View>
  </TouchableOpacity>
);

const AdminBottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#1D9BF0',
        tabBarInactiveTintColor: 'white',
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: '#1D9BF0', 
          justifyContent: 'space-around',// Tab bar background color
          height: 65,
        },
        tabBarLabelStyle: {
          fontFamily: 'Poppins',
          fontSize: 12,
          fontWeight: '500',
          color: '#1D9BF0',
          marginBottom: 5,
          // Lower the label position
        },
        
      }}
      initialRouteName="Home"
    >
      {/* Other tabs here */}
      <Tab.Screen
        name="Home"
        component={AdminHome}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={focused ? styles.container: null}>
              <Icon name="home" size={25} color={color} />
              {focused && (
                <Text style={{
                  fontFamily: 'Poppins',
                  fontSize: 12,
                  fontWeight: '500',
                  color: '#1D9BF0',
                  marginBottom: 5,
                }}>
                  Home
                </Text>
              )}
            </View>
          ),
          tabBarLabel: () => null, // This effectively removes the auto-generated label
        }}     
      />
      <Tab.Screen
        name="Sites"
        component={AdminPropertyNavigator}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={focused ? styles.container: null}>
              <Icon name="city" size={25} color={color} />
              {focused && (
                <Text style={{
                  fontFamily: 'Poppins',
                  fontSize: 12,
                  fontWeight: '500',
                  color: '#1D9BF0',
                  marginBottom: 5,
                }}>
                  Sites
                </Text>
              )}
            </View>
          ),
          tabBarLabel: () => null, // This effectively removes the auto-generated label
        }} 
      />
      <Tab.Screen
        name="Client"
        component={AdminCustomerScreenNavigator}
        options={{
          tabBarLabel: ({ focused }) => (
            focused ? <Text style={[styles.tabLabelFocused, {color: '#1D9BF0'}]}>Client</Text> : null
          ),
          tabBarIcon: ({ color }) => (
            <Icon name="user" size={18} color={color} />
          ),
          tabBarButton: (props) => (
            // Pass the focused state to your custom tab bar button
            <CustomTabBarButton {...props} focused={props.accessibilityState.selected} />
          ),
      
        }}
      />
      <Tab.Screen
        name="SO"
        component={SoscreenNavigator}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={focused ? styles.container: null}>
              <Icon name="users" size={25} color={color} />
              {focused && (
                <Text style={{
                  fontFamily: 'Poppins',
                  fontSize: 12,
                  fontWeight: '500',
                  color: '#1D9BF0',
                  marginBottom: 5,
                }}>
                  SO
                </Text>
              )}
            </View>
          ),
          tabBarLabel: () => null, // This effectively removes the auto-generated label
        }} 
      />
      <Tab.Screen
        name="Settings"
        component={AdminSettings}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View style={focused ? styles.container: null}>
              <Icon name="cog" size={25} color={color} />
              {focused && (
                <Text style={{
                  fontFamily: 'Poppins',
                  fontSize: 12,
                  fontWeight: '500',
                  color: '#1D9BF0',
                  marginBottom: 5,
                }}>
                  Settings
                </Text>
              )}
            </View>
          ),
          tabBarLabel: () => null, // This effectively removes the auto-generated label
        }} 
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container:{
    width: 52,
    height: 61,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  tabLabelFocused:{
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
    color: '#1D9BF0'
  },
  
});

export default AdminBottomTab;