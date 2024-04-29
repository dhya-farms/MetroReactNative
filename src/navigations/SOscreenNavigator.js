import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SalesOfficerList from '../screens/adminscreens/SalesOfficer';
import SOApprovals from '../screens/adminscreens/SOapprovals';
import SalesOfficerDetails from '../screens/adminscreens/SalesOfficerDetails';
import SOManager from '../screens/adminscreens/SOManager';
import ProjectReport from '../screens/adminscreens/ProjectReport';
import ProjectReportBookings from '../screens/adminscreens/ProjectReportBookings';
import DailyReport from '../screens/adminscreens/DailyReport';
import DailyReportBookings from '../screens/adminscreens/DailyReportBookings';
import { SoUserProvider } from '../contexts/useSoData';

const Soscreen = createNativeStackNavigator();

const SoscreenNavigator = ({navigation}) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      // Prevent default behavior
      e.preventDefault();

      // Navigate to the first screen of the stack
      navigation.navigate('SO', {
        screen: 'So Manager',
      });
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <SoUserProvider>
    <Soscreen.Navigator screenOptions={{ headerShown: false }}>
      <Soscreen.Screen name='So Manager' component={SOManager}/>
      <Soscreen.Screen name="SO Officers List" component={SalesOfficerList} />
      <Soscreen.Screen name= "SO Officers Details" component={SalesOfficerDetails}/>
      <Soscreen.Screen name="SO Approvals" component={SOApprovals} />
      <Soscreen.Screen name="Daily Report" component={DailyReport} />
      <Soscreen.Screen name="Daily Report Bookings" component={DailyReportBookings} />
      <Soscreen.Screen name="Project Report" component={ProjectReport} />
      <Soscreen.Screen name="Project Report Bookings" component={ProjectReportBookings} />
    </Soscreen.Navigator>
    </SoUserProvider>
  );
};

export default SoscreenNavigator;