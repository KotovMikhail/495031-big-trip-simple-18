import { getRandomInteger, generatorIDs } from '../utils.js';
import { POINTS_TYPE, OFFERS_TITLE, MIN_OFFER_PRICE, MAX_OFFER_PRICE } from './consts.js';

const generateID = generatorIDs();

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
  const randomIndex = getRandomInteger(0, OFFERS_TITLE.length - 1);

  const arr = [];

  for (let i = 0; i < randomIndex; i++) {
    const obj = {
      id: generateID(),
      title: generateOfferTitle(),
      price: generateOfferPrice(),
    };

    arr.push(obj);
  }

  return arr;
};


const getOfferData = () => ({
  type: generateOfferType(),
  offers: generateOffers(),
});

export { getOfferData };

