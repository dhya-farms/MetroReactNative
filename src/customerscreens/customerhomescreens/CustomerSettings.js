import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions, StatusBar} 
from 'react-native';
import HeaderContainer from '../../components/HeaderContainer';
import LogOutModal from '../../modals/LogoutModal';
import LogOutConfirmModal from '../../modals/LogOutConfirmModel';
import styles from '../../constants/styles/customersettingsstyles';



const CustomerSettings = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [cmModalVisible, setCmModalVisible] = useState(false)
  const [modalTitle, setModalTitle] = useState(''); // New state for title
  const [confirmTitle, setConfirmTitle]= useState('')
  const [modalIcon, setModalIcon] = useState(null); // New state for icon

  const handleShowConfirmModal = (title) => {
    setConfirmTitle(title);
    setCmModalVisible(true);
  };

  // Open the logout modal
  const showLogoutModal = () => {
    setModalTitle('Are you sure you want to log out?');
    setModalIcon(null); // No icon for logout
    setModalVisible(true);
  };

  // Open the delete account modal
  const showDeleteModal = () => {
    setModalTitle('Are you sure you want to permanently delete your account?');
    setModalIcon(require('../../../assets/images/cross.png'));
    setModalVisible(true);
  };

  // This will be called when "Yes" is pressed on the logout modal
  const handleLogout = () => {
    handleShowConfirmModal("Logged Out Successfully");
    setModalVisible(false); 
    navigation.navigate("MBlogin");
  };
    
  const handleDeleteAccount = () => {
    handleShowConfirmModal("Your Account Has Been Deleted");
    setModalVisible(false); // Close the delete account modal
    navigation.navigate("MBlogin");
  };
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar/>
      <HeaderContainer title="Settings" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}
     />
      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.settingsButton} onPress={()=> navigation.navigate("Customer Support")}> 
            <Text style={styles.settingsText}>Support</Text>   
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton} onPress={()=> navigation.navigate("Customer Faq")}>
            <Text style={styles.settingsText}>FAQ's</Text>       
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton}> 
            <Text style={styles.settingsText}>Privacy policy</Text>   
        </TouchableOpacity>
        </View>
        <View style={styles.settingsBtnContainer}>
        <LogOutModal
          modalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          onYesPress={modalTitle.includes('log out') ? handleLogout : handleDeleteAccount}
          onNoPress={() => setModalVisible(false)}
          title={modalTitle}
          iconName={modalIcon}
        />
        {/* Confirm Modal */}
        <LogOutConfirmModal
          modalVisible={cmModalVisible}
          setModalVisible={setCmModalVisible}
          text={confirmTitle}
        />
          <TouchableOpacity style={styles.settingsbtn} onPress={showLogoutModal}>
              <Text style={styles.btnText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsbtn} onPress={showDeleteModal}>
              <Text style={styles.btnText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  );
};


export default CustomerSettings;