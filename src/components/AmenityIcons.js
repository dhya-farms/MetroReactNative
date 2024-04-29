import React from 'react';

const amenityIcons = {
  'play ground': require('../../assets/images/playground.png'),
  'swimming pool': require('../../assets/images/pool.png'),
  'market': require('../../assets/images/market.png'),
  'kids park': require('../../assets/images/kidspark.png'),
  'bus stand': require('../../assets/images/busstand.png'),
  'walking area': require('../../assets/images/walkingarea.png'),
  'school': require('../../assets/images/school.png'),
  'gym': require('../../assets/images/gym.png'),
  'parking': require('../../assets/images/parking.png'),
  'fitness center': require('../../assets/images/gym.png'),
  'rooftop terrace': require('../../assets/images/terrace.png')
};

const defaultIcon = require('../../assets/images/amenites.png');

export const getAmenityIcon = (amenityName) => {
  const lowerCaseAmenityName = amenityName.toLowerCase();
  return Object.keys(amenityIcons).reduce((icon, key) => {
    if (key === lowerCaseAmenityName) {
      return amenityIcons[key];
    }
    return icon;
  }, defaultIcon);
};
