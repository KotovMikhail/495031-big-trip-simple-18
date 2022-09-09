import { getOffersData } from '../mock/offers.js';

export default class OfferModel {
  #offers = getOffersData();

  get offers() {
    return this.#offers;
  }
}
