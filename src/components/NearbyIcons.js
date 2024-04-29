import React from 'react';


const nearbyIcons = {
    'mall': require('../../assets/images/mall.png'),
    'yogi': require('../../assets/images/yogi.png'), 
    'play ground': require('../../assets/images/playground.png'),
    'swimming pool': require('../../assets/images/pool.png'),
    'market': require('../../assets/images/market.png'),
    'kids park': require('../../assets/images/kidspark.png'),
    'bus stand': require('../../assets/images/busstand.png'),
    'walking area': require('../../assets/images/walkingarea.png'),
    'school': require('../../assets/images/school.png'),
    'gym': require('../../assets/images/gym.png'),
    'parking': require('../../assets/images/parking.png'),
    // ... add other amenities as needed
  };

  const defaultIcon = require('../../assets/images/amenites.png');

  export const getNearByIcon = (nearByName) => {
    const lowerCaseNearByName = nearByName.toLowerCase();
    return Object.keys(nearbyIcons).reduce((icon, key) => {
      if (key === lowerCaseNearByName) {
        return nearbyIcons[key];
      }
      return icon;
    }, defaultIcon);
  };
