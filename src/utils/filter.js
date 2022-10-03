import { FilterType } from '../consts.js';
import dayjs from 'dayjs';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs(point.dateTo).isAfter(dayjs())),
};

export { filter };
