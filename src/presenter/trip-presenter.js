import { remove, render, RenderPosition } from '../framework/render.js';
import { generateFilterSort } from '../mock/filters.js';
import { sortByDay, sortByPrice } from '../utils/common.js';
import FilterSortView from '../view/filter-sort-view.js';
import PointsListView from '../view/points-list-view.js';
import ListEmptyViewView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import { SortType } from '../mock/consts.js';

export default class TripPresenter {
  #tripEventsElement = null;
  #pointModel = null;

  #filters = null;
  #pointsListComponent = new PointsListView();
  #listEmptyComponent = new ListEmptyViewView();
  #filterSortComponent = null;

  #points = [];
  #sourcePoints = [];

  #currentSortType = SortType.DEFAULT;

  #pointPresenter = new Map();

  constructor(tripEventsElement, pointModel) {
    this.#tripEventsElement = tripEventsElement;
    this.#pointModel = pointModel;
  }

  init = () => {
    this.#points = [...this.#pointModel.points];
    this.#sourcePoints = [...this.#pointModel.points];

    this.#renderFilterSort();
    this.#renderPointsContainer();
    this.#renderPointsList();
  };

  #renderEmptyList = () => {
    render(this.#listEmptyComponent, this.#tripEventsElement);
  };

  #renderPointsContainer = () => {
    render(this.#pointsListComponent, this.#tripEventsElement);
  };

  #sortPointsList = (sortType) => {
    switch (sortType) {
      case SortType.DAY:
        this.#points.sort(sortByDay);
        break;
      case SortType.PRICE:
        this.#points.sort(sortByPrice);
        break;
      default:
        this.#points = [...this.#sourcePoints];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {

    if (this.#currentSortType === sortType) {

      if (sortType === 'price') {
        return;
      }

      this.#points = [...this.#sourcePoints];
      this.#clearPointsList();
      this.#renderPointsList();

      return;
    }

    this.#sortPointsList(sortType);
    this.#clearPointsList();
    this.#renderPointsList();
  };

  #renderFilterSort = () => {
    this.#filters = generateFilterSort(this.#points);
    this.#filterSortComponent = new FilterSortView(this.#filters);

    render(this.#filterSortComponent, this.#tripEventsElement, RenderPosition.BEFOREEND);
    this.#filterSortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #clearPointsList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderPointItem = (point) => {
    const pointPresenter = new PointPresenter(this.#pointsListComponent, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPointsList = () => {
    if (!this.#points.length) {
      remove(this.#filterSortComponent);
      remove(this.#pointsListComponent);

      this.#renderEmptyList();
      return;
    }

    for (const point of this.#points) {
      this.#renderPointItem(point);
    }

  };
}
