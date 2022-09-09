import dayjs from 'dayjs';

const humanizeDateToShortTime = (date) => dayjs(date).format('HH:mm');

const humanizeDateToShortDate = (date) => dayjs(date).format('MMM D');

const humanizeDateToDateWithTime = (date) => dayjs(date).format('YYYY-MM-DDTHH:mm');

const humanizeDateToDate = (date) => dayjs(date).format('YYYY-MM-DD');

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
  humanizeDateToShortTime,
  humanizeDateToShortDate,
  humanizeDateToDateWithTime,
  humanizeDateToDate,
  checkDates
};
