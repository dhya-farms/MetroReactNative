import {Linking} from 'react-native';

export const handleWhatsAppPress = (customerDetails) => {
    let whatsappUrl = `https://wa.me/${customerDetails.customer.mobile_no}`;
    console.log(whatsappUrl)
    Linking.openURL(whatsappUrl).catch(err => console.error('An error occurred', err));
  };

export  const handleCallPress = (customerDetails) => {
    const callLink = `tel:${customerDetails.customer.mobile_no}`;
    Linking.openURL(callLink);
  };

export  const handleMailPress = (customerDetails) => {
    let emailUrl = `mailto:${customerDetails.customer.email}`;
    Linking.openURL(emailUrl).catch(err => console.error('An error occurred', err));
};