
import {createElement} from '../render.js';

const createLoadingMsgTemplate = () => (`
  <p class="trip-events__msg">Loading...</p>
`);

export default class LoadingMsgView {
  #element = null;

  get template() {
    return createLoadingMsgTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
