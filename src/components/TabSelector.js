import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TabSelector = ({ selectedTab, setSelectedTab }) => {
  

  const tabs = ['Today', 'Week', 'Month', 'Custom'];


  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            selectedTab === tab && styles.selectedTab,
          ]}
          onPress={() => setSelectedTab(tab)}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === tab && styles.selectedTabText,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#1D9BF0',
    overflow: 'hidden',
    marginVertical: 10, // This ensures that the borderRadius applies to the children
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: '#1D9BF0',

  },
  selectedTab: {
    backgroundColor: '#1D9BF0',
  },
  tabText: {
    color: '#1D9BF0',
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 14,
  },
  selectedTabText: {
    color: 'white',
  },
});

export default TabSelector;