import { getRandomInteger } from '../utils/common.js';
import { CITY_NAMES, DESCRIPTIONS, ID } from './consts.js';


const generateRandomCityName = () => {
  const randomIndex = getRandomInteger(0, CITY_NAMES.length - 1);

  return CITY_NAMES[randomIndex];
};

const generateImage = () => {
  const randomIndex = getRandomInteger(1, 5);
  const randomPicture = getRandomInteger((1, 200));

  const pictures = [];

  for (let i = 0; i < randomIndex; i++) {
    pictures.push(`http://picsum.photos/248/152?r=${randomPicture}`);

  }
  return pictures;

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
        src: generateImage(),
        description: generateDescription(),
      }
    ]
  }
);

export const getDestinationData = () => {
  const destinations = [];

  for (let i = 0; i < ID; i++) {
    destinations.push(generateDestinations(i));
  }

  return destinations;
};
