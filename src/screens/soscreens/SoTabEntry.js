import React from 'react';
import SObottomTab from './SObottomTab';


const SoTabEntry = ({ route }) => {
  const { cusToken, cusUserId } = route.params;

  return (
          <SObottomTab />
  );
};

export default SoTabEntry;