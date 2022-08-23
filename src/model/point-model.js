import { getPointData } from '../mock/point.js';
import { MODEL_LENGTH } from '../mock/consts.js';

export default class PointModel {
  #points = Array.from({ length: MODEL_LENGTH }, getPointData);

  get points() {
    return this.#points;
  }
}
