import { getRandomInteger } from '../utils/common.js';
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


const generateOffers = () => {
  const id = getRandomInteger(1, 4);
  const arr = [];

  const obj = {
    id: id,
    title: generateOfferTitle(),
    price: generateOfferPrice(),
  };

  arr.push(obj);


  return arr;
};


const generateOffer = (id) => ({
  type: generateOfferType(id),
  offers: generateOffers(id),
});


export const getOffersData = () => {
  const points = [];

  for (let i = 0; i < 10; i++) {
    points.push(generateOffer(i));
  }

  return points;
};

