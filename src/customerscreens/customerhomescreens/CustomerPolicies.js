import { StatusBar, StyleSheet, Text, View, ScrollView, Linking, TouchableOpacity} from 'react-native'
import React from 'react'
import HeaderContainer from '../../components/HeaderContainer'
import { PRIMARY_COLOR } from '../../constants/constantstyles/colors';

const CustomerPolicies = ({navigation}) => {
    const handleEmailPress = (email) => {
        Linking.openURL(`mailto:${email}`);
      };

      const policies = [
        {
          heading: "Data Security",
          description: "We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee its absolute security."
        },
        {
          heading: "Cookies and Tracking Technologies",
          description: "We may use cookies, web beacons, and other tracking technologies to enhance your experience and gather information about visitors and visits to our websites. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies."
        },
        {
          heading: "Third-Party Links",
          description: "Occasionally, at our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. We, therefore, have no responsibility or liability for the content and activities of these linked sites."
        },
        {
          heading: "Your Rights",
          description: "You have the right to access, correct, or delete your personal information. If you wish to exercise these rights, please contact us."
        },
        {
          heading: "Changes to Our Privacy Policy",
          description: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We encourage you to review our Privacy Policy periodically for any changes."
        },
      ];
    
  return (
    <View style={styles.mainContainer}>
     <StatusBar/>
      <HeaderContainer title="Privacy Policy" 
      ImageLeft={require('../../../assets/images/back arrow icon.png')}
      ImageRight={require('../../../assets/images/belliconblue.png')}
      onPress={()=>{navigation.goBack()}}/>
       <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.policyContainer}>
            <Text style={styles.headingText}>Introduction</Text>
            <View style={styles.descContainer}>
                <Text style={styles.descText}>Welcome to Metrocity Developer 's Privacy Policy. Your privacy is of utmost importance to us. 
                    This Privacy Policy outlines the types of information we collect from our users, 
                    how we use it, the circumstances under which we may share it with third parties, and how we keep it secure.</Text>
            </View>
            <Text style={styles.headingText}>Information Collection</Text>
            <View style={styles.descContainer}>
                <Text style={styles.descText}>We collect information to provide better services to all our users. The types of personal information we collect include:</Text>
                <Text style={[styles.descText, {fontSize: 12, marginVertical: 10,}]}>Personal Identification Information: Name, email address, phone number, etc.</Text>
                <Text style={[styles.descText, {fontSize: 12, marginVertical: 10,}]}>
                    Browsing Information: IP address, browser type, language, access times, referring website addresses, and other information about your 
                    interactions with our website.
                </Text>

            </View>
            <Text style={styles.headingText}>How We Use Your Information:</Text>
            <View style={styles.descContainer}>
                <Text style={styles.descText}>The information we collect is used in the following ways:</Text>
                <Text style={[styles.descText, {fontSize: 12, marginVertical: 5,}]}>To improve our website and services.</Text>
                <Text style={[styles.descText, {fontSize: 12, marginVertical: 5,}]}>To personalize your experience.</Text>
                <Text style={[styles.descText, {fontSize: 12, marginVertical: 5,}]}>To communicate with you about our services, including updates and customer support.</Text>
                <Text style={[styles.descText, {fontSize: 12, marginVertical: 5,}]}>To conduct research and analysis.</Text>
            </View>
            <Text style={styles.headingText}>Sharing Your Information:</Text>
            <View style={styles.descContainer}>
                <Text style={styles.descText}>We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information except in the following cases:</Text>
                <Text style={[styles.descText, {fontSize: 12, marginVertical: 8,}]}>For legal reasons, such as to comply with a subpoena or similar legal process.</Text>
                <Text style={[styles.descText, {fontSize: 12, marginVertical: 8,}]}>To trusted third parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.</Text>
            </View>
            {policies.map((policy, index) => (
            <View key={index} style={styles.policySection}>
              <Text style={styles.headingText}>{policy.heading}</Text>
              <View style={styles.descContainer}>
                <Text style={styles.descText}>{policy.description}</Text>
              </View>
            </View>
            ))}
            <Text style={styles.headingText}>Contact Us</Text>
            <View style={styles.descContainer}>
            <Text style={styles.descText}>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <TouchableOpacity onPress={() => handleEmailPress('customercare@metrocitydevelopers.in')}>
                <Text style={styles.emailText}>customercare@metrocitydevelopers.in</Text>
              </TouchableOpacity>
            </Text>
            </View>
        </View>
       </ScrollView>
    </View>
  )
}

export default CustomerPolicies

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,  
        backgroundColor: 'white'
      },
      container: {
        width: '100%',  // Ensures the ScrollView takes the full width
      },
      contentContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 50,
      },
      policyContainer:{
        width: '95%',
        marginVertical: 10,
      },
      headingText:{
        fontFamily: 'Poppins',
        fontSize: 18,
        fontWeight: '500',
        color: 'black'
      },
      descContainer:{
        width: '95%',
        marginLeft: '5%',
        marginVertical: 10,

      },
      descText:{
        fontSize: 14,
        color: '#757575',
        fontFamily: 'Poppins',
        fontWeight: '600',
        flexShrink: 1,
      },
      emailText:{
        fontSize: 15,
        color: PRIMARY_COLOR,
        fontFamily: 'Poppins',
        fontWeight: '400',
        flexShrink: 1,
      }

})