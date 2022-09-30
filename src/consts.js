import dayjs from 'dayjs';
import { getRandomInteger } from './utils/common.js';

const MIN_PRICE = 1000;
const MAX_PRICE = 10000;

const MIN_OFFER_PRICE = 30;
const MAX_OFFER_PRICE = 150;

const ID = 10;

const MODEL_LENGTH = 11;

const POINTS_TYPE = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const OFFERS_TITLE = [
  'Add luggage',
  'Switch to comfort class',
  'Add meal',
  'Choose seats',
  'Travel by train',
  'Flight',
  'Check-in',
  'Book tickets',
  'Lunch in city'
];

const DATE_FROM = [
  '2022-05-09T12:55:56.845Z',
  '2022-03-08T22:55:56.845Z',
  '2022-02-10T21:55:56.845Z',
  '2022-01-12T22:55:56.845Z',
  '2022-01-18T01:55:56.845Z',
  '2022-06-15T02:55:56.845Z',
  '2022-04-16T03:55:56.845Z',
  '2022-10-12T06:55:56.845Z',
  '2022-11-11T19:55:56.845Z'
];

const DATE_TO = [
  '2022-06-09T12:55:56.845Z',
  '2022-04-08T22:55:56.845Z',
  '2022-03-10T21:55:56.845Z',
  '2022-02-12T22:55:56.845Z',
  '2022-01-18T01:55:56.845Z',
  '2022-07-15T02:55:56.845Z',
  '2022-05-16T03:55:56.845Z',
  '2022-12-11T06:55:56.845Z',
  '2022-12-10T19:55:56.845Z'
];

const CITY_NAMES = [
  'Chamonix',
  'Geneva',
  'Amsterdam',
  'Moscow',
  'Adis-Abeba',
  'Liverpool',
  'Paris',
  'Vladivostok',
  'Saratov',
  'Washington',
];

const DESCRIPTIONS = [
  'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  'At consectetur consequatur corporis delectus ducimus et facere modi molestiae nam neque quae quaerat quibusdam temporibus, velit voluptates?',
  'Alias, delectus distinctio doloribus officiis recusandae sit totam velit voluptas?',
  'Consequatur dolore, ducimus quaerat quasi reprehenderit ut voluptas.',
  'Ab aliquid amet asperiores aspernatur blanditiis commodi, cupiditate doloribus ea enim facilis id illum incidunt inventore iure nam nisi placeat possimus quas repudiandae saepe sunt temporibus voluptate?',
  'Ad aperiam ex ipsa ipsum iure labore molestias necessitatibus sed soluta.',
  'Ad alias aliquam aliquid amet consequatur, doloremque dolores eius excepturi facere fuga harum impedit officia officiis perferendis provident quae quam ratione repellat reprehenderit repudiandae saepe sed, sequi tempore ut velit vero vitae, voluptatum!',
  'Ad, adipisci animi aspernatur dolore dolores enim, error est fugiat id maxime quis quos tempora vitae? Alias earum est facilis hic ipsa iusto omnis quae, quas. Accusamus accusantium consectetur corporis est ex facilis, ipsam, laudantium molestias nostrum officia, quia quisquam sit veniam.',
  'Ad, adipisci animi aspernatur dolore dolores enim, error est fugiat id maxime quis quos tempora vitae? Alias earum est facilis hic ipsa iusto omnis quae, quas. Accusamus accusantium consectetur corporis est ex facilis, ipsam, laudantium molestias nostrum officia, quia quisquam sit veniam.',
];


const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
};

const SortType = {
  DAY: 'day',
  PRICE: 'price',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const NewPoint = {
  dateFrom: dayjs().toISOString(),
  dateTo: dayjs().toISOString(),
  destination: 0,
  type: 'taxi',
  basePrice: getRandomInteger(MIN_PRICE, MAX_PRICE),
  offers: [],
};

const UrlData = {
  AUTHORIZATION: 'Basic 1S2sfS44xcl2sa2j',
  END_POINT: 'https://18.ecmascript.pages.academy/big-trip',
};

export {
  POINTS_TYPE,
  DATE_FROM,
  DATE_TO,
  MIN_PRICE,
  MAX_PRICE,
  MIN_OFFER_PRICE,
  MAX_OFFER_PRICE,
  OFFERS_TITLE, CITY_NAMES,
  DESCRIPTIONS,
  MODEL_LENGTH,
  ID,
  FilterType,
  Mode,
  SortType,
  UserAction,
  UpdateType,
  NewPoint,
  UrlData
};
