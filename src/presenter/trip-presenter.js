import tripContainerView from '../view/trip-container-view.js';
import FilterTripView from '../view/filter-trip-view.js';
import SortListView from '../view/sort-list-view.js';
import SortItemView from '../view/sort-item-view.js';
import FormCreateView from '../view/form-create-view.js';
import FormEditView from '../view/form-edit-view.js';
import OffersEventView from '../view/offers-event-view.js';
import DestinationEventView from '../view/destinations-event-view.js';
import {RenderPosition} from '../render';

import { render } from '../render.js';

export default class TripPresenter {
  mainComponent = new tripContainerView();
  tripSortFilterComponent = new FilterTripView();
  tripSortComponent = new SortListView();
  sortItemComponent = new SortItemView();
  formCreateComponent = new FormCreateView();
  formEditComponent = new FormEditView();

  init = (tripMainContainer) => {
    this.tripMainContainer = tripMainContainer;

    render(this.mainComponent, this.tripMainContainer);
    render(this.tripSortFilterComponent, this.mainComponent.getElement(), RenderPosition.BEFOREEND);
    render(this.tripSortComponent, this.mainComponent.getElement(), RenderPosition.BEFOREEND);

    for (let i = 0; i < 3; i++) {
      render(new SortItemView(), this.tripSortComponent.getElement());
    }

    render(this.formCreateComponent, this.tripSortComponent.getElement().firstElementChild, RenderPosition.AFTERBEGIN);
    render(this.formEditComponent, this.tripSortComponent.getElement().lastElementChild, RenderPosition.AFTERBEGIN);

    render(new OffersEventView(), this.formCreateComponent.getElement().querySelector('.event__details'), RenderPosition.AFTERBEGIN);
    render(new DestinationEventView(), this.formCreateComponent.getElement().querySelector('.event__details'), RenderPosition.BEFOREEND);

    render(new OffersEventView(), this.formEditComponent.getElement().querySelector('.event__details'), RenderPosition.AFTERBEGIN);
    render(new DestinationEventView(), this.formEditComponent.getElement().querySelector('.event__details'), RenderPosition.BEFOREEND);

  };

}
