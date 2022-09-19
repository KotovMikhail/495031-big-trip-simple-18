import { getRandomInteger } from '../utils/common';
import { CITY_NAMES, DESCRIPTIONS } from './consts.js';

const generateRandomCityName = () => {
  const randomIndex = getRandomInteger(0, CITY_NAMES.length - 1);

  return CITY_NAMES[randomIndex];
};

const generateDescription = () => {
  const randomIndex = getRandomInteger(0, DESCRIPTIONS.length - 1);

  return DESCRIPTIONS[randomIndex];
};

const generateDestinations = (id) => (
  {
    id: id,
    description: generateDescription(),
    name: generateRandomCityName(),
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 150)}`,
        description: generateDescription(),
      }
    ]
  }
);

const getDestinationData = (count) => {
  const arr = [];

  for (let i = 0; i < count; i++) {
    arr.push(generateDestinations(i));
  }

  return arr;
};

const destinationsMock = getDestinationData(CITY_NAMES.length);


export {destinationsMock};
