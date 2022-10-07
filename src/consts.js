import dayjs from 'dayjs';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

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
  destination: 1,
  type: 'taxi',
  basePrice: 1000,
  offers: [],
};

const UrlData = {
  AUTHORIZATION: 'Basic 2S24fS44xclxsa4i',
  END_POINT: 'https://18.ecmascript.pages.academy/big-trip',
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export {
  Method,
  FilterType,
  Mode,
  SortType,
  UserAction,
  UpdateType,
  NewPoint,
  UrlData,
  TimeLimit
};
