import { getDestinationData } from '../mock/destinations.js';

export default class DestinationModel {
  #destinations = getDestinationData();

  get destinations() {
    return this.#destinations;
  }
}
