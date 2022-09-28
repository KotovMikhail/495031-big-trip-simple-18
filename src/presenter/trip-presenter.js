import { remove, render, RenderPosition } from '../framework/render.js';
import { sortByDay, sortByPrice } from '../utils/common.js';
import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import ListEmptyViewView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter';
import LoadingMsgView from '../view/loading-msg-view.js';
import { filter } from '../utils/filter.js';
import { SortType, UserAction, UpdateType, FilterType } from '../mock/consts.js';

export default class TripPresenter {
  #pointsModel = null;
  #filterModel = null;

  #tripEventsElement = null;
  #filterSortComponent = null;
  #listEmptyComponent = null;
  #isLoading = null;

  #pointsListComponent = new PointsListView();
  #loadingComponent = new LoadingMsgView();

  #pointPresenter = new Map();
  #newPointPresenter = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  constructor(tripEventsElement, pointsModel, filterModel) {
    this.#tripEventsElement = tripEventsElement;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter(this.#pointsListComponent, this.#handleViewAction);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);


    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortByDay);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }

    return this.#pointsModel.points;

  }

  init = () => {
    this.#renderTrip();
  };

  #handleViewAction = (actionType, updateType, update) => {
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {

    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)

    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearTrip({ resetSortType: true });
        this.#renderTrip();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderTrip();
        break;
    }
  };

  #renderEmptyList = () => {
    this.#listEmptyComponent = new ListEmptyViewView(this.#filterType);

    remove(this.#pointsListComponent);
    render(this.#listEmptyComponent, this.#tripEventsElement, RenderPosition.AFTERBEGIN);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#tripEventsElement, RenderPosition.AFTERBEGIN);
  };

  #renderFilterSort = () => {
    this.#filterSortComponent = new SortView(this.#currentSortType);
    this.#filterSortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#filterSortComponent, this.#tripEventsElement, RenderPosition.AFTERBEGIN);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearTrip();
    this.#renderTrip();
  };


  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  createPoint = (callback) => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(callback);
  };

  #renderPointItem = (point) => {
    const pointPresenter = new PointPresenter(this.#pointsListComponent, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPointsList = () => {
    for (const point of [...this.#pointsModel.points]) {
      this.#renderPointItem(point);
    }
  };

  #clearTrip = ({ resetSortType = false } = {}) => {

    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#filterSortComponent);
    remove(this.#loadingComponent);


    if (this.#listEmptyComponent) {
      remove(this.#listEmptyComponent);
    }


    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #renderTrip = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;
    const pointsCount = points.length;

    if (pointsCount === 0) {
      this.#renderEmptyList();
      return;
    }

    render(this.#pointsListComponent, this.#tripEventsElement);

    this.#renderFilterSort();
    this.#renderPointsList();
  };
}
