
import {createElement} from '../render.js';

const createLoadingMsgTemplate = () => (`
	<p class="trip-events__msg">Loading...</p>
`);

export default class LoadingMsgView {
  getTemplate() {
    return createLoadingMsgTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
