import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


const getSelectedOffers = (point, offers) => offers.filter((offer) => point.includes(offer.id));

const getPointsByOfferType = (point, offers) => offers.find((offer) => offer.type === point.type);

const getDestinations = (point, destinations) => destinations.find((destination) => destination.id === point.destination);

const humanizeDateToShortTime = (date) => dayjs(date).format('HH:mm');

const humanizeDateToShortDate = (date) => dayjs(date).format('MMM D');

const humanizeDateToDateWithTime = (date) => dayjs(date).format('YYYY-MM-DD HH:mm');

const checkDates = (dateFrom, dateTo) => {
  const dates = {
    dateFrom: dateFrom,
    dateTo: dateTo
  };

  if (!(dayjs(dateFrom).diff(dayjs(dateTo), 'minute'))) {
    return dates;
  }

  dates.dateFrom = dateTo;
  dates.dateTo = dateFrom;

  return dates;
};

export {
  getRandomInteger,
  humanizeDateToShortTime,
  humanizeDateToShortDate,
  getSelectedOffers,
  getPointsByOfferType,
  getDestinations,
  humanizeDateToDateWithTime,
  checkDates
};
