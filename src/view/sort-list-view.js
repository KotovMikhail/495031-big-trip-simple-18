import { createElement } from '../render.js';

const createTripSortTemplate = () => (`
  <ul class="trip-events__list"></ul>
`);

export default class SortListView {
  getTemplate() {
    return createTripSortTemplate();
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
