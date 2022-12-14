
import AbstractView from '../framework/view/abstract-view';
import { FilterType } from '../consts';

const ListEmptyText = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
};

const createListEmptyViewTemplate = (filterType) => {
  const text = ListEmptyText[filterType];

  return (`
      <p class="trip-events__msg">
        ${text}
      </p>
    `);
};

export default class ListEmptyView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createListEmptyViewTemplate(this.#filterType);
  }
}
