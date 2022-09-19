import { getRandomInteger } from '../utils/common';
import { POINTS_TYPE, OFFERS_TITLE, MIN_OFFER_PRICE, MAX_OFFER_PRICE } from './consts.js';

const generateOfferType = (id) => {
  let type = null;

  type = POINTS_TYPE[id];

  return type;
};

const generateOfferTitle = () => {
  const randomIndex = getRandomInteger(0, OFFERS_TITLE.length - 1);

  return OFFERS_TITLE[randomIndex];
};

const generateOfferPrice = () => getRandomInteger(MIN_OFFER_PRICE, MAX_OFFER_PRICE);


const generateOffers = () => {
  const arr = [];

  for (let i = 0; i < 5; i++) {
    const obj = {
      id: i,
      title: generateOfferTitle(),
      price: generateOfferPrice(),
    };

    arr.push(obj);
  }

  return arr;
};


const generateOffersData = (id) => ({
  type: generateOfferType(id),
  offers: generateOffers(id),
});

export const getOffersData = () => {
  const arr = [];

  for (let i = 0; i < 10; i++) {
    arr.push(generateOffersData(i));
  }

  return arr;
};

const offersMock = getOffersData(OFFERS_TITLE.length);


export {offersMock};
