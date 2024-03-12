import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Tab = ({ title, isActive, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.tab}>
    <Text style={[styles.tabText, isActive && styles.activeTabText]}>{title}</Text>
    {isActive && <View style={styles.activeTabIndicator} />}
  </TouchableOpacity>
);

export default function DetailsTab({ activeTab, setActiveTab }) {

  return (
    <View style={styles.tabsContainer}>
      {['Details', 'Progress'].map((tabTitle) => (
        <Tab
          key={tabTitle}
          title={tabTitle}
          isActive={activeTab === tabTitle}
          onPress={() => setActiveTab(tabTitle)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
    tabsContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: 10,
    },
    tab: {
      paddingVertical: 10,
      alignItems: 'center',
    },
    tabText: {
      fontFamily: 'Poppins',
      fontSize: 12,
      fontWeight: 500,
      color: '#A1A1A1',
      // Include other styles for your tab text such as fontFamily, fontSize, etc.
    },
    activeTabText: {
      color: '#1D9BF0',
    },
    activeTabIndicator: {
      marginTop: 2,
      height: 2,
      width: '100%',
      backgroundColor: '#1D9BF0',
    },
  });
  