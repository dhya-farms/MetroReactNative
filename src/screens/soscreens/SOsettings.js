import React, { useState } from 'react';
import { View, Text, TouchableOpacity,  ScrollView, StyleSheet} 
from 'react-native';
import HeaderContainer from '../../components/HeaderContainer';
import LogOutModal from '../../modals/LogoutModal';
import LogOutConfirmModal from '../../modals/LogOutConfirmModel';
import { PRIMARY_COLOR } from '../../constants/constantstyles/colors';



const SOsettings = ({navigation}) => {
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
    setModalVisible(false); // Close the logout modal
    navigation.navigate("MBlogin");
  };
    
  const handleDeleteAccount = () => {
    handleShowConfirmModal("Your Account Has Been Deleted");
    setModalVisible(false); // Close the delete account modal
    navigation.navigate("MBlogin");
  };
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <HeaderContainer title="Settings" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}
     />
    <View style={{ flexGrow: 1 }}></View> 
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
          <TouchableOpacity style={[styles.settingsbtn, {backgroundColor: 'white', borderWidth: 2, borderColor: PRIMARY_COLOR}]} onPress={showDeleteModal}>
              <Text style={[styles.btnText, {color: PRIMARY_COLOR}]}>Delete Account</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 50,
  },
  settingsBtnContainer:{
    width: '90%',
    alignItems: 'center',
    marginTop: 40,
  },
  settingsbtn:{
    width: '60%',
    backgroundColor: '#1D9BF0',
    borderRadius: 5,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  btnText:{
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 12,
    color: 'white'
  }

  
});

export default SOsettings;