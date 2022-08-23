import { getDestinationData } from '../mock/destination.js';
import { MODEL_LENGTH } from '../mock/consts.js';

export default class DestinationModel {
  #destinations = Array.from({ length: MODEL_LENGTH }, getDestinationData);

  get destinations() {
    return this.#destinations;
  }
}
