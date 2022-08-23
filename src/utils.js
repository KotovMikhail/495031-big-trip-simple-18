import dayjs from 'dayjs';
import { MIN_ID, MAX_ID } from './mock/consts.js';


const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generatorIDs = () => {
  let i = 0;
  return function() {
    return i++;
  };
};


const humanizeDateToTime = (dueDate) => dayjs(dueDate).format('HH:mm');
const humanizeDateToShortDate = (dueDate) => dayjs(dueDate).format('MMM D');

export { getRandomInteger, humanizeDateToTime, humanizeDateToShortDate, generatorIDs };
