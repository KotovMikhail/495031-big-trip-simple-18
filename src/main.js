import TripControlsView from './view/trip-controls-view.js';
import {render} from './render.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointModel from './model/point-model.js';
import OfferModel from './model/offer-model.js';
import DestinationModel from './model/destination-model.js';

const pageHeaderElement = document.querySelector('.page-header');
const tripControlsElement = pageHeaderElement.querySelector('.trip-controls');

const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');

const pointModel = new PointModel();
const offerModel = new OfferModel();
const destinationModel = new DestinationModel();

const tripPresenter = new TripPresenter();

render(new TripControlsView, tripControlsElement);

tripPresenter.init(tripEventsElement, pointModel, offerModel, destinationModel);
