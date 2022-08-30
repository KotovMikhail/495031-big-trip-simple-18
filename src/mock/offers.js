import { getRandomInteger } from '../utils.js';
import { POINTS_TYPE, OFFERS_TITLE, MIN_OFFER_PRICE, MAX_OFFER_PRICE } from './consts.js';

const generateOfferType = () => {
  const randomIndex = getRandomInteger(0, POINTS_TYPE.length - 1);

  return POINTS_TYPE[randomIndex];
};

const generateOfferTitle = () => {
  const randomIndex = getRandomInteger(0, OFFERS_TITLE.length - 1);

  return OFFERS_TITLE[randomIndex];
};

const generateOfferPrice = () => getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE);


const generateOffers = (id) => {
  const randomIndex = getRandomInteger(0, OFFERS_TITLE.length - 1);

  const arr = [];

  for (let i = 0; i < randomIndex; i++) {
    const obj = {
      id: id,
      title: generateOfferTitle(),
      price: generateOfferPrice(),
    };

    arr.push(obj);
  }

  return arr;
};


const generateOffersData = (id) => ({
  type: generateOfferType(),
  offers: generateOffers(id),
});

export const getOffersData = () => {
  const points = [];

  for (let i = 0; i < 10; i++) {
    points.push(generateOffersData(i));
  }

  return points;
};

