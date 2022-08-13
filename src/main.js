import TripControlsView from './view/trip-controls-view.js';
import {render} from './render.js';
import TripPresenter from './presenter/trip-presenter.js';


const header = document.querySelector('.page-header');
const tripControls = header.querySelector('.trip-controls');
const siteMainElement = document.querySelector('.page-main');
const siteMainCointainerElement = siteMainElement.querySelector('.page-body__container');

const tripPresenter = new TripPresenter();

render(new TripControlsView, tripControls);

tripPresenter.init(siteMainCointainerElement);
