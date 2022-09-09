import { getPointsData } from '../mock/points.js';

export default class PointModel {
  #points = getPointsData();

  get points() {
    return this.#points;
  }
}
