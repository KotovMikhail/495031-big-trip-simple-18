
import FilterTripView from '../view/filter-trip-view.js';
import PointsListView from '../view/points-list-view.js';
import PointItemView from '../view/point-item-view.js';
import FormEditView from '../view/form-edit-view.js';
import { getPointsByOfferType } from '../utils.js';
import ListEmptyViewView from '../view/list-empty-view.js';

import { render, RenderPosition } from '../render.js';

export default class TripPresenter {
  #tripMainContainer = null;
  #pointModel = null;
  #offerModel = null;
  #destinationModel = null;

  #filterTripComponent = new FilterTripView();
  #pointsListComponent = new PointsListView();
  #listEmptyComponent = new ListEmptyViewView();

  init = (tripEventsElement, pointModel, offerModel, destinationModel) => {
    this.#tripMainContainer = tripEventsElement;
    this.#pointModel = pointModel;
    this.#offerModel = offerModel;
    this.#destinationModel = destinationModel;

    this.points = [...this.#pointModel.points];
    this.offers = [...this.#offerModel.offers];
    this.destinations = [...this.#destinationModel.destinations];

    if (!this.points.length) {
      this.#tripMainContainer.append(this.#listEmptyComponent.element);
    } else {
      render(this.#pointsListComponent, this.#tripMainContainer);
      render(this.#filterTripComponent, this.#tripMainContainer, RenderPosition.AFTERBEGIN);

      for (let i = 0; i < this.points.length; i++) {
        const pointsByOfferType = getPointsByOfferType(this.points[i], this.offers);
        this.#renderPoint(this.points[i], this.offers[i], this.destinations, pointsByOfferType);
      }
    }

  };

  #renderPoint = (points, offers, destinations, pointsByOfferType) => {
    const pointItemComponent = new PointItemView(points, offers, destinations);
    const formEditComponent = new FormEditView(points, pointsByOfferType, destinations);
    const eventElement = pointItemComponent.element.querySelector('.event');
    const eventRollupBtnElement = formEditComponent.element.querySelector('.event__rollup-btn');

    const replacePointToForm = () => {
      pointItemComponent.element.replaceChild(eventElement, formEditComponent.element);
    };

    const replaceFormToPoint = () => {
      pointItemComponent.element.replaceChild(formEditComponent.element, eventElement);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replacePointToForm();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    eventRollupBtnElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      replacePointToForm();
      document.removeEventListener('keydown', onEscKeyDown);
    });


    pointItemComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.addEventListener('keydown', onEscKeyDown);
    });


    formEditComponent.element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      replacePointToForm();
      document.removeEventListener('keydown', onEscKeyDown);
    });


    render(pointItemComponent, this.#pointsListComponent.element);
  };
}
