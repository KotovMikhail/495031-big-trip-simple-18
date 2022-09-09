import {filter} from '../utils/filter.js';

export const generateFilterSort = (point) => Object.entries(filter).map(
  ([filterName, filterDisabled]) => ({
    name: filterName,
    disabled: filterDisabled(point),
  }),
);
