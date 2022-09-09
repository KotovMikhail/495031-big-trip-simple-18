import AbstractView from '../framework/view/abstract-view';
import { getUniqArray, capitalizeFirstLetter } from '../utils/common';


const createFormEventHeaderTemplate = (points, point, destinations, pointByOfferType, pointByDestinationName) => {

  const { type } = point;
  const { name } = pointByDestinationName;

  const createFormEditEventTypeListTemplate = () => {
    const pointTypes = getUniqArray(points);

    return pointTypes
      .map(
        (item) =>
          `<div class="event__type-item">
              <input id="event-type-${item.toLowerCase()}-${item.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item.toLowerCase()}">
              <label class="event__type-label  event__type-label--${item.toLowerCase()}" for="event-type-${item.toLowerCase()}-${item.id}">${capitalizeFirstLetter(item)}</label>
            </div>
          `
      )
      .join('');
  };

  const createFormCitiesListTemplate = () => {
    if (!destinations.length) {
      return '';
    }

    return destinations.map((item) => `<option value="${item.name}"></option>`).join('');
  };


  return (`
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${createFormEditEventTypeListTemplate(point)}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group event__field-group--destination">
      <label class="event__label event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input class="event__input event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${createFormCitiesListTemplate()}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">
      —
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        €
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="160">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header> 
`);
};

const createFormOffersItems = (points, point, destinations, pointByOfferType) => pointByOfferType.offers.map((offer) => {
  const checked = point.offers.includes(offer.id) ? 'checked' : '';
  const { id, title, price } = offer;

  const offerName = title.split(' ').splice(-1)[0];

  return (`<div class="event__offer-selector">
    <input class="event__offer-checkbox visually-hidden" id="event-offer-${offerName}-${id}" type="checkbox" name="event-offer-${offerName}" ${checked}>
    <label class="event__offer-label" for="event-offer-${offerName}-${id}">
      <span class="event__offer-title">${title}</span>
      +€&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`);
}).join('');


const createFormOffersListTemplate = (points, point, destinations, pointByOfferType) => {
  const isHasOffers = () => pointByOfferType.offers.length > 0;

  return (`
  ${isHasOffers() ?
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${createFormOffersItems(points, point, destinations, pointByOfferType)}
        </div>
      </section>` : ''
    }`
  );
};


const createFormDestinationTemplate = (pointByDestinationName) => {

  const { description } = pointByDestinationName;

  const createPhotos = () => {
    if (!pointByDestinationName.pictures.length) {
      return '';
    }

    return pointByDestinationName.pictures
      .map(
        (picture) => ` <img class="event__photo" src="${picture.src}" alt="Event photo">`
      )
      .join('');
  };

  return (`
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${createPhotos()}
      </div>
    </div>
  </section>
  
  `);
};

const createFormEditTemplate = (points, point, destinations, pointByOfferType, pointByDestinationName) => (`
  <form class="event event--edit" action="#" method="post">
    ${createFormEventHeaderTemplate(points, point, destinations, pointByOfferType, pointByDestinationName)}
    <section class="event__details">
      ${createFormOffersListTemplate(points, point, destinations, pointByOfferType, pointByDestinationName)}
      ${createFormDestinationTemplate(pointByDestinationName)}
      </section>
  </form>
`);

export default class FormEditView extends AbstractView {
  #points = null;
  #point = null;
  #destinations = null;
  #pointByOfferType = null;
  #pointByDestinationName = null;

  constructor(points, point, destinations, pointByOfferType, pointByDestinationName) {
    super();
    this.#points = points;
    this.#point = point;
    this.#destinations = destinations;
    this.#pointByOfferType = pointByOfferType;
    this.#pointByDestinationName = pointByDestinationName;
  }

  get template() {
    return createFormEditTemplate(this.#points, this.#point, this.#destinations, this.#pointByOfferType, this.#pointByDestinationName);
  }

  setFormEditSubmitHandler = (callback) => {
    this._callback.formEditSubmit = callback;
    this.element.addEventListener('submit', this.#formEditSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formEditSubmitHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formEditSubmitHandler);
  };

  #formEditSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formEditSubmit();
  };

}
