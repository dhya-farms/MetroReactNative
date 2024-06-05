import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';


const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
      <Text style={[styles.contextText, styles.labelText]}>{label}</Text>
      <Text style={[styles.contextText, styles.valueText]}>{value}</Text>
    </View>
  );


const ProfileHeader = ({ onEditPress, inputValues, type, aop }) => {
  
  const typeString = type.map(t => t.name).join(", ");
  const aopString = aop.map(a => a.name).join(", ");

  return (
    <View style={styles.headerContainer}>
      <View
        style={styles.linearGradient}
      >
        <View style={styles.avatarContainer}>
          <Image
            source={require('../../assets/images/gsoperson.jpg')} // Replace with your dummy image path
            style={styles.avatar}
          />
          <TouchableOpacity onPress={onEditPress} style={styles.editButton}>
            <Image
              source={require('../../assets/images/editcircle.png')} // Replace with your edit button image path
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.nameText}>{inputValues.name}</Text>
      </View>
      <View style={{marginTop: 60, width: '100%'}}>
        <InfoRow label="Email Id:" value= {inputValues.emailId} />
        <InfoRow label="Mobile:" value= {inputValues.mobileNo} />
        <InfoRow label="Address:" value={inputValues.address} />
        <InfoRow label="Occupation:" value={inputValues.occupation} />
        <InfoRow label="Budget:" value={inputValues.budget} />
        <InfoRow label="Type:" value={typeString} />
        <InfoRow label="Purpose:" value={aopString} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
  },
  linearGradient: {
    borderBottomLeftRadius: 99,
    borderBottomRightRadius: 99,
    width: '100%',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1D9BF0'
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 68,
    backgroundColor: 'white', // Placeholder for the image
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 3,
  },
  editIcon: {
    width: 39,
    height: 39,
  },
  nameText: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 20,
    color: '#424242',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 35,
    paddingHorizontal: 20,
  },
  labelText: {
    width: 90, // Set a fixed width for labels
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    fontWeight: '500',
    color: '#424242',
    marginRight: 30,
  },
  valueText: {
    flex: 1, // This will take up the rest of the space in the container
    fontFamily: 'Poppins',
    fontSize: 13,
    fontWeight: '400',
    color: '#424242',
    textAlign: 'left', // Align the text to the left
  },
});

export default ProfileHeader;