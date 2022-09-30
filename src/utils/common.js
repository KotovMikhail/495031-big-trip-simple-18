import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const firstLetterToLowerCase = (title) => title.split(' ').splice(-1)[0];

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const getSelectedOffers = (point, offers) => offers.filter((offer) => point.includes(offer.id));
const getPointByOfferType = (point, offers) => offers.find((offer) => offer.type === point.type);
const getDestinations = (point, destinations) => destinations.find((destination) => destination.id === point.destination);

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortByDay = (dateA, dateB) => {
  const weight = getWeightForNullDate(dateA.dateFrom, dateB.dateFrom);

  return weight ?? dayjs(dateA.dateFrom).diff(dayjs(dateB.dateFrom));
};

const compareBasePrice = (a, b) => b - a;

const sortByPrice = (basePriceA, basePriceB) => compareBasePrice(basePriceA.basePrice, basePriceB.basePrice);

export {
  capitalizeFirstLetter,
  firstLetterToLowerCase,
  getRandomInteger,
  getSelectedOffers,
  getPointByOfferType,
  getDestinations,
  sortByDay,
  sortByPrice
};
