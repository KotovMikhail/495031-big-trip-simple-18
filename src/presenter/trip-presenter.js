
import FilterTripView from '../view/filter-trip-view.js';
import PointsListView from '../view/points-list-view.js';
import PointItemView from '../view/point-item-view.js';
import FormCreateView from '../view/form-create-view.js';
import FormEditView from '../view/form-edit-view.js';
import LoadingMsgView from '../view/loading-msg-view.js';
import ListEmptyViewView from '../view/list-empty-view.js';

import { render, RenderPosition } from '../render.js';

export default class TripPresenter {
  #tripMainContainer = null;
  #pointModel = null;
  #offerModel = null;
  #destinationModel = null;

  #filterTripComponent = new FilterTripView();
  #pointsListComponent = new PointsListView();
  #formCreatComponent = new FormCreateView();
  #formEditComponent = new FormEditView();
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

        const offers = this.offers.filter((item) =>
          this.points[i].offers.some((offerId) => offerId === item.id));

        const destinations = this.destinations.find((item) => item.id === this.points[i].destination);

        this.#renderPoint(this.points[i]);
      }
    }

    //render(this.#formCreateComponent, this.#pointsListComponent.element.firstElementChild, RenderPosition.AFTERBEGIN);
    //render(this.#formEditComponent, this.tripSortComponent.getElement().lastElementChild, RenderPosition.AFTERBEGIN);
  };

  #renderPoint = (point, offers, destinations) => {
    const pointItemComponent = new PointItemView(point);
    const formEditComponent = new FormEditView();
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
