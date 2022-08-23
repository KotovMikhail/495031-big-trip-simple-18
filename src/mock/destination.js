import { getRandomInteger, generatorIDs } from '../utils.js';
import { CITY_NAMES, DESCRIPTIONS } from './consts.js';


const generateRandomCityName = () => {
  const randomIndex = getRandomInteger(0, CITY_NAMES.length - 1);

  return CITY_NAMES[randomIndex];
};

const generateDescription = () => {
  const randomIndex = getRandomInteger(0, DESCRIPTIONS.length - 1);

  return DESCRIPTIONS[randomIndex];
};

const generateImage = () => {
  const randomIndex = getRandomInteger(0, 200);

  return `http://picsum.photos/248/152?r=${randomIndex}`;
};

const generateID = generatorIDs();

const getDestinationData = () => (
  {
    id: generateID(),
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

export {getDestinationData};
