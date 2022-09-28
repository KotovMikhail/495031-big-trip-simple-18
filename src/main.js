import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';

import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

import { render, RenderPosition } from './framework/render.js';

import TripInfoView from './view/trip-info-view.js';
import NewEventBtnView from './view/new-event-btn-view.js';


const pageHeaderElement = document.querySelector('.page-header');
const tripMainElement = pageHeaderElement.querySelector('.trip-main');
const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const tripInfoComponent = new TripInfoView;
const newEventBtnComponent = new NewEventBtnView();

const tripPresenter = new TripPresenter(tripEventsElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripMainElement, filterModel, pointsModel);

const handleNewFormClose = () => {
  newEventBtnComponent.element.disabled = false;
};


const handleNewButtonClick = () => {
  tripPresenter.createPoint(handleNewFormClose);
  newEventBtnComponent.element.disabled = true;
};


render(tripInfoComponent, tripMainElement, RenderPosition.AFTERBEGIN);

newEventBtnComponent.setClickHandler(handleNewButtonClick);

filterPresenter.init();
render(newEventBtnComponent, tripMainElement);
tripPresenter.init();
