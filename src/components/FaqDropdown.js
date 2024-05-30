import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure to install react-native-vector-icons


if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FaqDropdown = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleExpand}>
        <View style={styles.selectionBox}>
        <Text style={styles.questionText}>{question}</Text>
        <Icon name={isOpen ? "minus" : "plus"} size={20} color="#1D9BF0" />
        </View>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.optionsContainer}>
          <Text style={styles.answerText}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '98%',
    marginVertical: 5,
  },
  selectionBox: {
    borderWidth: 2,
    borderColor: '#1D9BF0',
    borderRadius: 7,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    marginHorizontal: 7,
    marginVertical: 10,
  },
  questionText: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 14,
    color: '#000000',
    flexShrink: 1, 
  },
  optionsContainer: {
    borderWidth: 1,
    borderColor: '#1D9BF0',
    borderRadius: 7,
    padding: 15,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  option: {
    padding: 15,
  },
  answerText: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 12,
    color: '#000000'
  },
});

export default FaqDropdown;