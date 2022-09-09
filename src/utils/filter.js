import {FilterType} from '../mock/consts.js';

const filter = {
  [FilterType.DAY]: (point) => point.some((item) => (item.dateFrom === '' && item.dateTo === '') ? 'disabled' : ''),
  [FilterType.EVENT]: () => 'disabled',
  [FilterType.TIME]: () => 'disabled',
  [FilterType.PRICE]: (point) => point.some((item) => (item.basePrice === '') ? 'disabled' : ''),
  [FilterType.OFFERS]: () => 'disabled',
};

export {filter};
