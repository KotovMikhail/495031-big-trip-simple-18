import { render } from './framework/render';
import TripControlsView from './view/trip-controls-view.js';
import NewEventBtnView from './view/new-event-btn-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointModel from './model/point-model.js';

const pageHeaderElement = document.querySelector('.page-header');
const tripMainElement = pageHeaderElement.querySelector('.trip-main');
const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');

const pointModel = new PointModel();
const tripPresenter = new TripPresenter(tripEventsElement, pointModel);

render(new TripControlsView(), tripMainElement);
render(new NewEventBtnView(), tripMainElement);

tripPresenter.init();
