import { getRandomInteger } from '../utils.js';
import { POINTS_TYPE, DATE_FROM, DATE_TO, MIN_PRICE, MAX_PRICE } from './consts.js';

const generatePointType = () => {
  const randomIndex = getRandomInteger(0, POINTS_TYPE.length - 1);

  return POINTS_TYPE[randomIndex];
};

const generateDateFrom = () => {
  const randomIndex = getRandomInteger(0, DATE_FROM.length - 1);

  return DATE_FROM[randomIndex];
};

const generatedateFrom = () => {
  const randomIndex = getRandomInteger(0, DATE_TO.length - 1);

  return DATE_TO[randomIndex];
};

const generateOffersArrID = () => {
  const arr = [];
  const arrLength = getRandomInteger(1, 5);

  for (let index = 0; index < arrLength; index++) {
    arr.push(getRandomInteger(1, 5));
  }

  return Array.from(new Set(arr));
};


const generatePointsData = (id) => (
  {
    id: id,
    basePrice: getRandomInteger(MIN_PRICE, MAX_PRICE),
    dateFrom: generateDateFrom(),
    dateTo: generatedateFrom(),
    destination: id,
    offers: generateOffersArrID(),
    type: generatePointType(),
  }
);

export const getPointsData = () => {
  const points = [];

  for (let i = 0; i < 10; i++) {
    points.push(generatePointsData(i));
  }

  return points;
};
