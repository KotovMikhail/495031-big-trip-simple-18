import { getOfferData } from '../mock/offer.js';
import { MODEL_LENGTH } from '../mock/consts.js';

export default class OfferModel {
  #offers = Array.from({ length: MODEL_LENGTH }, getOfferData);

  get offers() {
    return this.#offers;
  }
}
