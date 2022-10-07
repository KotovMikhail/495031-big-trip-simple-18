import dayjs from 'dayjs';

const makeFirstLetterToLowerCase = (title) => title.split(' ').splice(-1)[0];
const isDatesEqual = (dateA, dateB) => dayjs(dateA).isSame(dateB);

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
  makeFirstLetterToLowerCase,
  getSelectedOffers,
  getPointByOfferType,
  getDestinations,
  sortByDay,
  sortByPrice,
  isDatesEqual
};
