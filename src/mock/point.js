import { getRandomInteger } from '../utils.js';
import { POINTS_TYPE, DATE_FROM, DATE_TO, MIN_PRICE, MAX_PRICE } from './consts.js';
import { generatorIDs } from '../utils.js';


const generatePointType = () => {
  const randomIndex = getRandomInteger(0, POINTS_TYPE.length - 1);

  return POINTS_TYPE[randomIndex];
};

const generateDateFrom = () => {
  const randomIndex = getRandomInteger(0, DATE_FROM.length - 1);

  return DATE_FROM[randomIndex];
};

const generateDateTo = () => {
  const randomIndex = getRandomInteger(0, DATE_TO.length - 1);

  return DATE_TO[randomIndex];
};

const generateOffersArrID = () => {
  const arr = [];
  const arrLength = getRandomInteger(1, 10);

  for (let index = 0; index < arrLength; index++) {
    arr.push(getRandomInteger(1, 10));
  }

  return Array.from(new Set(arr));
};

const generateID = generatorIDs();


export const getPointData = () => (
  {
    id: generateID(),
    basePrice: getRandomInteger(MIN_PRICE, MAX_PRICE),
    dateFrom: generateDateFrom(),
    dateTo: generateDateTo(),
    destination: generateID(),
    offers: generateOffersArrID(),
    type: generatePointType(),
  }
);
