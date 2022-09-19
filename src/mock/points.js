import { getRandomInteger } from '../utils/common';
import { POINTS_TYPE, DATE_FROM, DATE_TO, MIN_PRICE, MAX_PRICE } from './consts.js';
import { nanoid } from 'nanoid';

const generatePointType = (id) => {
  let type = null;

  type = POINTS_TYPE[id];

  return type;
};

const generateDateFrom = () => {
  const randomIndex = getRandomInteger(0, DATE_FROM.length - 1);

  return DATE_FROM[randomIndex];
};

const generatedateFrom = () => {
  const randomIndex = getRandomInteger(0, DATE_TO.length - 1);

  return DATE_TO[randomIndex];
};

const generateOffers = () => {
  const arr = [];

  for (let i = 0; i < getRandomInteger(0, 3); i++) {
    arr.push(i);
  }

  return Array.from(new Set(arr));
};


const generatePointsData = (id) => (
  {
    id: nanoid(),
    basePrice: getRandomInteger(MIN_PRICE, MAX_PRICE),
    dateFrom: generateDateFrom(),
    dateTo: generatedateFrom(),
    destination: id,
    offers: generateOffers(),
    type: generatePointType(id),
  }
);

export const getPointsData = () => {
  const points = [];

  for (let i = 0; i < POINTS_TYPE.length; i++) {
    points.push(generatePointsData(i));
  }

  return points;
};
