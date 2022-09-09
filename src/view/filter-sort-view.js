import AbstractView from '../framework/view/abstract-view';


const createFilterItemTemplate = (filters) => {
  const { name, disabled } = filters;

  const isDefaultFilterChecked = (name === 'day') ? 'checked' : '';
  const isDisabledFilter = disabled ? 'disabled' : '';

  return (`
        <div class="trip-sort__item trip-sort__item--${name}">
          <input id="sort-${name}" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-${name}" ${isDefaultFilterChecked} ${isDisabledFilter} >
          <label class="trip-sort__btn" for="sort-${name}" data-sort-type="${name}">${name}</label>
        </div>
        `
  );
};

const createFilterSortTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter))
    .join('');

  return (`
      <form class="trip-events__trip-sort trip-sort" action="#" method="get">
          ${filterItemsTemplate}
      </form>
`);

};

export default class FilterSortView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterSortTemplate(this.#filters);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    const tripSortBtn = evt.target.closest('.trip-sort__btn');

    if (!tripSortBtn) {
      return;
    }

    if (tripSortBtn.dataset.sortType === 'day' || tripSortBtn.dataset.sortType === 'price') {
      evt.preventDefault();
      this._callback.sortTypeChange(evt.target.dataset.sortType);
    }

  };

}
