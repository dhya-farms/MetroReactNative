import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, Text} from 'react-native';
import SortHeader from '../../components/SortHeader';
import HeaderContainer from '../../components/HeaderContainer';
import ContactForm from '../../components/ContactForm';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../../constants/styles/addcustomerstyles';





const AddCustomerScreen = ({navigation}) => {
    const [showContactForm, setShowContactForm] = useState(true);
    const [customerName, setCustomerName] = useState('');
    const [customerMobile, setCustomerMobile] = useState('');
    const [showDoneButton, setShowDoneButton] = useState(false)

    const handleContinuePress = (name, mobileNumber) => {
        setCustomerName(name); // Update name
        setCustomerMobile(mobileNumber); // Update mobile number
        setShowContactForm(false); // Hide contact form and show addImgContainer
    };

    const handleImagePress = ()=>{
        setShowDoneButton(true)
    }

  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} >
      <HeaderContainer title="Add Customer" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}/>
     {showContactForm && <SortHeader title="Contact Form"  isSortVisible={false} />}
     {showContactForm && ( <View style={styles.cfContainer}>
        <ContactForm onContinuePress={handleContinuePress}/>
     </View>  
     )}
     {!showContactForm && (<View style={styles.addImgContainer}>
      <View style={styles.imageContainer}>
       <Image source={require('../../../assets/images/gsoperson.jpg')} style={styles.personImage} />
      </View>
      <TouchableOpacity style={styles.btnContainer} onPress={handleImagePress}>
        <Text style={styles.btnText}>Add image</Text>
      </TouchableOpacity>
      <View style={styles.textcontainer}>
        <Text style={styles.nameText}>{customerName}</Text>
        <Text style={styles.mbText}>{customerMobile}</Text>
      </View>
      {showDoneButton && (
      <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.doneButton} onPress={()=>{}}>
                <Text style={styles.doneButtonText}>done</Text>
            </TouchableOpacity>
       </View>
      )}
     </View> )}
    </ScrollView>
  );
};



export default AddCustomerScreen;